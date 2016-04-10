import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';

export class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
        entries: []
      , vocabulary: []
      , points: []
      , tags: []
      , createFormHidden: true
    }
    this.onCreateEntry = this.onCreateEntry.bind(this);
    this.addTerm = this.addTerm.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.addTag = this.addTag.bind(this);
  }

  componentWillMount(){
    this.ref = new firebase("https://engineerprogress.firebaseio.com/entries");
    this.ref.on('value', dataSnapshot => {
      let entries = [];
      dataSnapshot.forEach( childSnapShot => {
        let entry = childSnapShot.val()
        entry.id = childSnapShot.key()
        entries.push(entry)
      })
      this.setState({ entries: entries })
    });
  }

  componentWillUnmount() {
    this.ref.off();
  }

  addTerm(e){
    e.preventDefault();
    this.state.vocabulary.push(this.refs.term.value.trim());
    this.setState({ vocabulary: this.state.vocabulary });
  }

  addPoint(e){
    e.preventDefault();
    this.state.points.push(this.refs.point.value.trim());
    this.setState({ points: this.state.points });
  }

  addTag(e){
    e.preventDefault();
    this.state.tags.push(this.refs.tag.value.trim());
    this.setState({ tags: this.state.tags });
  }


  onCreateEntry(e){
    e.preventDefault();
    let newEntry = {
        date: Date.now()
      , type: this.refs.type.value.trim()
      , source: this.refs.source.value.trim()
      , title: this.refs.title.value.trim()
      , description: this.refs.description.value.trim()
      , vocabulary: this.state.vocabulary
      , points: this.state.points
      , tags: this.state.tags
    }
    this.ref.push(newEntry)    
  }

  render() {
    const { entries, vocabulary, points, tags, createFormHidden } = this.state
    return (
      <div style={{ padding: '12px' }}>
        <h1> Engineer Progress </h1>
        <button onClick={this.setState.bind(this, {createFormHidden: !createFormHidden})}>
          { createFormHidden ? 'open' : 'close' } create form 
        </button>
        <form style={{ border: '1px solid gray', padding: '12px' }} hidden={createFormHidden}>
          <h2> Create New Entry </h2>
          <label> date </label>
          <input type="date" ref="date" />
    
          <label> type </label>
          <input type="text" ref="type" />

          <label> source </label>
          <input type="text" ref="source" />

          <label> title </label>
          <input type="text" ref="title" />

          <label> description </label>
          <input type="text" ref="description" />

          <label> vocabulary </label>
          <input type="text" ref="term" />
          <button onClick={this.addTerm}> add term </button>
          {
            vocabulary.map( term => {
              return <span key={term} style={{ padding: '6px'}}> {term} </span>;
            })
          }

          <label> points </label>
          <textarea ref="point" />
          <button onClick={this.addPoint}> add point </button>
          <ul>
          {
            points.map( point => {
              return <li> {point} </li>
            })
          }
          </ul>

          <label> tags </label>
          <input type="text" ref="tag" />
          <button onClick={this.addTag}> add tag </button>
          {
            tags.map( tag => {
              return <span key={tag} style={{ padding: '6px'}}> {tag} </span>;
            })
          }



          <button onClick={this.onCreateEntry}> create new entry </button>
        </form>
        <h2> Entries </h2>
              { entries.map( entry => {
                  return(
                    <div 
                      key={entry.id} 
                      style={{ border: '1px solid gray', padding: '4px', position: 'relative' }}>
                      <div style={{ float: 'left'}}>
                        { moment(entry.date).format("MMM Do YY") }
                      </div>

                      <div style={{ clear: 'both', float: 'left' }}>
                        type: { entry.type }
                      </div>

                      <div style={{ clear: 'both', textDecoration: 'underline' }}>{ entry.source }: { entry.title }</div>
                      <div>{ entry.description }</div>
                      <div>
                        <b>terms</b>: <br/> { entry.vocabulary.join(', ') }
                      </div>
                      <div>
                        <ul>
                        <b>points</b>:
                        { entry.points.map( point => {
                            return <li> {point}. </li>
                          }) 
                        }
                        </ul>
                      </div>
                      <div>
                        tags:
                        { entry.tags.map( tag => {
                            return <span> {tag} </span>
                          }) 
                        }
                      </div>
                    </div>
                  )
                })
              }
      </div>
    );
  }
}