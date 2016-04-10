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
    this.state = { formHidden: true  }
  }  
  render() {
    // console.log("this.state.formHidden", this.state.formHidden)
    const { formHidden } = this.state
    const { entries, onCreateEntryClick } = this.props
    return (
      <div style={{ padding: '12px' }}>
        <h1 style={{ display: 'inline-block' }}> Engineer Progress </h1>
        <button onClick={this.setState.bind(this, {formHidden: !formHidden})}>
          { formHidden ? 'open' : 'close' } create form 
        </button>
        
        
        <h2> Entries </h2>
              { entries.map( entry => <Entry entry={entry} key={entry.id} /> ) }
              <EntryCreateOrUpdateForm formHidden={formHidden} onCreateEntryClick={onCreateEntryClick} />
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