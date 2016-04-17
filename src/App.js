import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import { connect } from 'react-redux';
import { addEntry, deleteEntry, editEntry } from './actions';
import { EntryCreateOrUpdateForm } from './components/EntryCreateOrUpdateForm.react.js'
import { Entry } from './components/Entry.react.js'
import { EntryDetailsPartial } from './components/EntryDetailsPartial.react.js'


export class App extends Component {
  constructor(props){
    super(props)
    this.state = { formState: {state: 'closed', data: undefined}, entryDetails: undefined }
    this.openCreateForm = () => this.setState({ formState: {state: 'create', data: undefined} })
    this.openEditForm = (entry) => this.setState({ formState: {state: 'edit', data: entry} })
    this.closeForm = () => this.setState({ formState: {state: 'closed', data: undefined} })
    this.showEntryDetails = (entry) => this.setState({ entryDetails: entry })
    this.closeEntryDetails = () => this.setState({ entryDetails: undefined })
  }  
  render() {
    // console.log("this.state.formState", this.state.formState)
    const { formState } = this.state
    const { entries, onCreateEntryClick, onDeleteEntryClick, onEditEntryClick } = this.props
    return (
      <div style={{ padding: '12px' }} className="container" className=" full-screen">

        {/* HEADER */}
        <div className="header" style={{ paddingBottom: '4px', boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.4)'}}>
          <h5 style={{ textAlign: 'center', marginBottom: '4px', color: '#4A90e2' }}> Research Review </h5>
          <span style={{ position: 'absolute', top: '0px', right: '8px'}} onClick={this.openCreateForm}> + </span>
          
        {/* SEARCH BAR */}
          <div className="" style={{ margin: 'auto', width: '80%', maxWidth: '400px', height: '30px' }}>
            <input type='text'  style={{ width: '100%', float: 'right', height: '100%', paddingLeft: '40px'}} />
          </div>
        </div>
        
        {/* BODY */}
        <div className="main-body" style={{ overflowY: 'scroll'}} >
          { entries.map( entry => <Entry entry={entry} key={entry.id} openEditForm={this.openEditForm} showEntryDetails={this.showEntryDetails}  /> ) }
          
        </div>

          <EntryDetailsPartial entryDetails={this.state.entryDetails} closePartial={this.closeEntryDetails} />

          <EntryCreateOrUpdateForm 
            closeForm={this.closeForm}
            formState={formState} 
            onDeleteEntryClick={onDeleteEntryClick}
            onCreateEntryClick={onCreateEntryClick}
            onEditEntryClick={onEditEntryClick} />
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