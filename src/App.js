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

        {/* Source Input */}
          <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px' }}>
            <label style={{ position: 'absolute', left: '10px' }} >Source</label>
            <input type="text" style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
          </div>

        {/* Title Input */}
          <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px', top: '-2' }}>
            <label style={{ position: 'absolute', left: '10px' }} >Title</label>
            <input type="text" style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
          </div>
    
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
                    // Entry Preview 
                    <div 
                      key={entry.id} 
                      style={{ border: '3px solid gray', padding: '12px', position: 'relative', maxWidth: '600px', maxHeight: '600px', overflowY: 'scroll' }}>
                      <h1 style={{ float: 'left', display: 'inline-block', marginBottom: '0'}}>
                        { entry.source } <span style={{ fontSize: '0.3em'}} > { entry.type } </span>
                      </h1>

                      <div style={{ float: 'right' }} >
                        Edit
                      </div>


                      <h4 style={{ clear: 'both' }}>{ entry.title }</h4>
                      <div>{ entry.description }</div>

                <div hidden={false} style={{ maxHeight: 1000, overflow: 'hidden', transition: 'all 0.8s'}} >    
                    {/* Terms */}
                      <div>
                        <b>Terms</b> <br/> 
                        <ul>
                        { 
                          entry.vocabulary.map( term => <li>{term}<ul><li>definition</li></ul></li>) 
                        }
                        </ul>
                      </div>
                      <div>
                        <ul>
                        
                    {/* Points */}
                        <b>Points</b>
                        { entry.points.map( point => {
                            return <li> {point}. </li>
                          }) 
                        }
                        </ul>
                      </div>
                </div>      
                    {/* Tags */}
                      <div>
                        { entry.tags.map( tag => {
                            return <span style={{ border: '1px solid gray', borderRadius: '100px', padding: '6px'}}> {tag} </span>
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