import React, { Component, PropTypes } from 'react';
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
    const { formState } = this.state
    const { entries, onCreateEntryClick, onDeleteEntryClick, onEditEntryClick } = this.props
    return (
      <div className="full-screen">

        {/* HEADER */}
        <div className="header" style={{ paddingBottom: '4px', boxShadow: '0px 4px 9px 0px rgba(0,0,0,0.4)', background: 'papayawhip'}}>
          <h5 style={{ textAlign: 'center', marginBottom: '4px', color: '#4A90e2' }}> Research Review </h5>
          <span style={{ position: 'absolute', top: '2px', right: '2px', borderRadius: '100px', textAlign: 'center', cursor: 'pointer', fontSize: '0.6em' }} onClick={this.openCreateForm}> + ADD ENTRY </span>
          
        {/* SEARCH BAR */}
          <div className="" style={{ margin: 'auto', width: '80%', maxWidth: '400px', height: '30px' }}>
            <input type='text'  style={{ width: '100%', float: 'right', height: '100%', paddingLeft: '40px'}} />
          </div>
        </div>
        
        {/* BODY */}
        <div className="main-body" style={{ overflowY: 'scroll'}}>
          <div style={{ maxWidth: '600px', margin: 'auto' }} >
          { entries.map( entry => <Entry entry={entry} key={entry.id} openEditForm={this.openEditForm} showEntryDetails={this.showEntryDetails}  /> ) }
          </div>
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



App.propTypes ={
  entries: PropTypes.array,
  onCreateEntryClick: PropTypes.func
}


// connect component to store
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