import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import { connect } from 'react-redux';
import { addEntry } from './actions';
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
    const { entries, onCreateEntryClick } = this.props
    return (
      <div style={{ padding: '12px' }}>
        <h1 style={{ display: 'inline-block' }}> Engineer Progress </h1>
        <button onClick={this.openCreateForm}>
          { formState ? 'open' : 'close' } create form 
        </button>
        
        
        <h2> Entries </h2>
          { entries.map( entry => <Entry entry={entry} key={entry.id} openEditForm={this.openEditForm}/> ) }
          <EntryCreateOrUpdateForm 
            closeForm={this.closeForm}
            formState={formState} 
            onCreateEntryClick={onCreateEntryClick} />
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
    onCreateEntryClick: entry => dispatch(addEntry(entry))
  }
}

export const AppContainer = connect(
  mapStateToProps, mapDispatchToProps
)(App)