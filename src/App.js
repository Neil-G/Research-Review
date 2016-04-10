import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import { connect } from 'react-redux';
import { addEntry } from './actions';

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
    this.addPoint = this.addPoint.bind(this);
    this.addTag = this.addTag.bind(this);

    this.addTerm = this.addTerm.bind(this);
    this.updateTerm = this.updateTerm.bind(this)
    this.deleteTerm = this.deleteTerm.bind(this)

    this.createEntry = this.createEntry.bind(this)
  }

  // componentWillMount(){
  //   this.ref = new firebase("https://engineerprogress.firebaseio.com/entries");
  //   this.ref.on('value', dataSnapshot => {
  //     let entries = [];
  //     dataSnapshot.forEach( childSnapShot => {
  //       let entry = childSnapShot.val()
  //       entry.id = childSnapShot.key()
  //       entries.push(entry)
  //     })
  //     this.setState({ entries: entries })
  //   });
  // }

  // componentWillUnmount() {
  //   this.ref.off();
  // }

  updateTerm(e, key, index){
    e.preventDefault();
    this.state.terms[index][key] = e.target.value;
    this.setState({ terms: this.state.terms })
  }

  addTerm(e){
    e.preventDefault();
    this.state.terms.unshift({ name: '', definition: ''});
    this.setState({ terms: this.state.terms });
  }

  deleteTerm(e, index){
    e.preventDefault();
    this.state.terms.splice(index, 1)
    this.setState({ terms: this.state.terms })
  }

  addPoint(e){
    e.preventDefault();
    this.state.points.unshift('');
    this.setState({ points: this.state.points });
  }

  addTag(e){
    e.preventDefault();
    this.state.tags.unshift(this.refs["add-tag-input"].value.trim());
    this.setState({ tags: this.state.tags });
    this.refs["add-tag-input"].value = "";
  }

  createEntry(e){
    e.preventDefault();
    const newEntry = {
        source: this.refs['source-input'].value.trim()
      , title: this.refs['title-input'].value.trim()
      , description: this.refs['description-input'].value.trim()
      , type: this.refs['type-input'].value.trim()
      , terms: this.state.terms
      , points: this.state.points
      , tags: this.state.tags
    }
    console.log("newEntry", newEntry)
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
    console.log("this.props", this.props)
    const { entries, terms, points, tags, createFormHidden } = this.state
    return (
      <div style={{ padding: '12px' }}>
        <h1 style={{ display: 'inline-block' }}> Engineer Progress </h1>
        <button onClick={this.setState.bind(this, {createFormHidden: !createFormHidden})}>
          { createFormHidden ? 'open' : 'close' } create form 
        </button>
        
        <form 
          style={{ 
            border: '1px solid gray'
            , boxSizing: 'border-box'
            , padding: '12px'
            , background: 'white'
            , maxWidth: '600px'
            , width: '96%'
            , position: 'fixed'
            , top: '80px'
            , bottom: '4px'
            , left: '8px'
            , overflowY: 'scroll'
            , transition: 'all 1s'
            , transform: createFormHidden ? 'translateX(-700px)' : 'translateX(0px)'
          }}>
          
          <h2 style={{ display: 'inline-block', float: 'left'}} > Create New Entry </h2> 
          <button style={{ float: 'right'}} > close </button>

        {/* Source Input */}
          <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px', clear: "both" }}>
            <label style={{ position: 'absolute', left: '10px' }} >Source</label>
            <input 
              type="text" 
              ref="source-input"
              style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
          </div>

        {/* Title Input */}
          <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px', borderTop: '0' }}>
            <label style={{ position: 'absolute', left: '10px' }} >Title</label>
            <input 
              type="text"
              ref="title-input" 
              style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
          </div>

        {/* Description Input */}
          <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px', borderTop: '0' }}>
            <label style={{ position: 'absolute', left: '10px' }} >Description</label>
            <input
              ref="description-input" 
              type="text" 
              style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
          </div>

        {/* Type Input */}
          <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px', borderTop: '0' }}>
            <label style={{ position: 'absolute', left: '10px' }} >Type</label>
            <input 
              ref="type-input"
              type="text" 
              style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
          </div>
    
          

        {/* Terms Input */}
          <label style={{ display: "inline-block"}}> Terms </label>  
          <span onClick={this.addTerm}> + </span>
          {
            terms.map( (term, index) => {
              return(
                <div style={{ border: '1px solid gray', height: '100px', position: 'relative', overflow: 'hidden', marginBottom: '8px'}}> 

                  <input 
                    type="text" 
                    placeholder="name" 
                    value={terms[index].name}
                    onChange={e => this.updateTerm(e, 'name', index)} 
                    style={{ width: '100%', borderRadius: '0', position: "absolute", height: '40px' }} 
                  />
                  <span 
                    style={{ position: "absolute", top: "4px", right: "8px"}}
                    onClick={e => this.deleteTerm(e, index)}
                  > 
                    X 
                  </span> 
                  <input 
                    type="text" 
                    placeholder="definition" 
                    value={terms[index].definition} 
                    onChange={e => this.updateTerm(e, 'definition', index)} 
                    style={{ width: '100%', position: "absolute", top: '40px', height: '60px', borderRadius: '0' }} 
                  />
                </div>
              );
            })
          }

          <br/>
          <label style={{ display: "inline-block"}}> Points </label>
          <span onClick={this.addPoint}> + </span>
          <ul>
          {
            points.map( point => {
              return(
              <div style={{ position: 'relative'}} > 
                <textarea style={{ width: "100%", position: "relative", height: '100%', maxWidth: "100%" }}/>
                <span style={{ position: 'absolute', top: '0px', right: '8px'}}> X </span>
              </div> 
              )

            })
          }
          </ul>


          <label> Tags </label>
          <input type="text" ref="add-tag-input"/> 
          <span onClick={this.addTag}> + </span>
          <div style={{ marginBottom: '12px'}}  >
          {
            tags.map( tag => {
              return <span key={tag} style={{ padding: '6px 18px', border: "1px solid gray", borderRadius: '100', marginRight: '4px', marginBottom: '4px'}}> {tag} </span>;
            })
          }
          </div>
          <button style={{ width: "100%" }} onClick={ this.createEntry }> create new entry </button>
          
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
                            return( 
                              <span style={{ border: '1px solid gray', borderRadius: '100px', padding: '6px' }}> {tag} </span>
                            )
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