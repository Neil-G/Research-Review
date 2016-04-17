import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import { connect } from 'react-redux';
import { addEntry, deleteEntry, editEntry } from './actions';
import { EntryCreateOrUpdateForm } from './components/EntryCreateOrUpdateForm.react.js'
import { Entry } from './components/Entry.react.js'

export class App extends Component {
  constructor(props){
    super(props)
    this.state = { formState: {state: 'closed', data: undefined} }
    this.openCreateForm = () => this.setState({ formState: {state: 'create', data: undefined} })
    this.openEditForm = (entry) => this.setState({ formState: {state: 'edit', data: entry} })
    this.closeForm = () => this.setState({ formState: {state: 'closed', data: undefined} })
  }  
  render() {
    // console.log("this.state.formState", this.state.formState)
    const { formState } = this.state
    const { entries, onCreateEntryClick, onDeleteEntryClick, onEditEntryClick } = this.props
    return (
      <div style={{ padding: '12px' }} className="container" className="show-border full-screen">

        {/* HEADER */}
        <div className="show-border header" style={{ paddingBottom: '4px'}}>
          <h5 style={{ textAlign: 'center', marginBottom: '4px', color: '#4A90e2' }}> Research Review </h5>
          <span style={{ position: 'absolute', top: '0px', right: '8px'}} onClick={this.openCreateForm}> + </span>
          
        {/* SEARCH BAR */}
          <div className="" style={{ margin: 'auto', width: '80%', maxWidth: '400px', height: '30px' }}>
            <input type='text'  style={{ width: '100%', float: 'right', height: '100%', paddingLeft: '40px'}} />
          </div>
        </div>
        
        {/* BODY */}
        <div className="show-border main-body">
          { entries.map( entry => <Entry entry={entry} key={entry.id} openEditForm={this.openEditForm}/> ) }
          <EntryCreateOrUpdateForm 
            closeForm={this.closeForm}
            formState={formState} 
            onDeleteEntryClick={onDeleteEntryClick}
            onCreateEntryClick={onCreateEntryClick}
            onEditEntryClick={onEditEntryClick} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateEntryClick: entry => dispatch(addEntry(entry)),
    onEditEntryClick: entry => dispatch(editEntry(entry)),
    onDeleteEntryClick: entryID => dispatch(deleteEntry(entryID))
  }
}

export const AppContainer = connect(
  mapStateToProps, mapDispatchToProps
)(App)