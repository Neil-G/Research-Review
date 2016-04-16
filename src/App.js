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
      <div style={{ padding: '12px' }} className="container">
        <h2 style={{ display: 'inline-block' }}> 
          Engineer Progress <span onClick={this.openCreateForm} style={{ border: "1px solid #E0E0E0", padding: "2px 16px", cursor: "pointer", color: "#C8E6C9"}} > + </span>
        </h2>
        
        
          { entries.map( entry => <Entry entry={entry} key={entry.id} openEditForm={this.openEditForm}/> ) }
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