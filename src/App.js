import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';

export class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
        entries: []
      , terms: []
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
    this.state.terms.push({ name: '', definition: ''});
    this.setState({ terms: this.state.terms });
  }

  addPoint(e){
    e.preventDefault();
    this.state.points.push(this.refs.point.value.trim());
    this.setState({ points: this.state.points });
  }

  addTag(e){
    e.preventDefault();
    this.state.tags.shift(this.refs.tag.value.trim());
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
      , terms: this.state.terms
      , points: this.state.points
      , tags: this.state.tags
    }
    this.ref.push(newEntry)    
  }

  render() {
    const { entries, terms, points, tags, createFormHidden } = this.state
    return (
      <div style={{ padding: '12px' }}>
        <h1> Engineer Progress </h1>
        <button onClick={this.setState.bind(this, {createFormHidden: !createFormHidden})}>
          { createFormHidden ? 'open' : 'close' } create form 
        </button>
        <form style={{ border: '1px solid gray', padding: '12px', maxWidth: '600px' }} hidden={createFormHidden}>
          <h2> Create New Entry </h2>

        {/* Source Input */}
          <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px' }}>
            <label style={{ position: 'absolute', left: '10px' }} >Source</label>
            <input type="text" style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
          </div>

        {/* Title Input */}
          <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px', borderTop: '0' }}>
            <label style={{ position: 'absolute', left: '10px' }} >Title</label>
            <input type="text" style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
          </div>

        {/* Description Input */}
          <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px', borderTop: '0' }}>
            <label style={{ position: 'absolute', left: '10px' }} >Description</label>
            <input type="text" style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
          </div>

        {/* Type Input */}
          <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px', borderTop: '0' }}>
            <label style={{ position: 'absolute', left: '10px' }} >Type</label>
            <input type="text" style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
          </div>
    
          

        {/* Terms Input */}
          <label style={{ display: "inline-block"}}> Terms </label>  
          <span onClick={this.addTerm}> + </span>
          {
            terms.map( term => {
              return(
                <div style={{ border: '1px solid gray', height: '100px', position: 'relative', overflow: 'hidden', marginBottom: '8px'}}> 
                  <input type="text" placeholder="name" value={term.name} style={{ width: '100%', borderRadius: '0', position: "absolute", height: '40px' }} />
                  {/* <span style={{ position: "absolute", top: "4px", left: "8px"}}> term: </span> */}
                  <span style={{ position: "absolute", top: "4px", right: "8px"}}> X </span> 
                  <input type="text" placeholder="definition" value={term.definition} style={{ width: '100%', position: "absolute", top: '40px', height: '60px', borderRadius: '0' }} />
                </div>
              );
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