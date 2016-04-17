import React, { Component } from 'react';
import Firebase from 'firebase';

// connecting firebase
const firebaseRef = new Firebase("https://engineerprogress.firebaseio.com/")
export const entriesRef = firebaseRef.child('entries')


export class EntryCreateOrUpdateForm extends Component {
	constructor(props){
    super(props)
    this.state = { 
        terms: []
      , points: []
      , tags: []
      , entryID: undefined
    }
    this.addPoint = this.addPoint.bind(this);
    this.addTag = this.addTag.bind(this);

    this.addTerm = this.addTerm.bind(this);
    this.updateTerm = this.updateTerm.bind(this)
    this.deleteTerm = this.deleteTerm.bind(this)

    this.createEntry = this.createEntry.bind(this)
    this.editEntry = this.editEntry.bind(this)
    this.deleteEntry = this.deleteEntry.bind(this)

    this.updatePointorTag = this.updatePointorTag.bind(this)
    this.deletePointorTag = this.deletePointorTag.bind(this)

    this.closeForm = this.closeForm.bind(this)
  }

  editEntry(e){
  	e.preventDefault();
  	const updatedEntry = {
        createdAt: this.props.formState.data.createdAt || Date.now()
      , source: this.refs['source-input'].value.trim()
      , title: this.refs['title-input'].value.trim()
      , description: this.refs['description-input'].value.trim()
      , type: this.refs['type-input'].value.trim()
      , terms: this.state.terms
      , points: this.state.points
      , tags: this.state.tags
    }
    console.log("updatedEntry", updatedEntry)
    console.log("this.props.formState.data.firebaseID", this.props.formState.data.firebaseID)
    entriesRef.child( this.props.formState.data.firebaseID ).update(updatedEntry)
    // this.props.onEditEntryClick(updatedEntry)
  }

  deleteEntry(e){
  	e.preventDefault();
    console.log("this.props.formState.data.firebaseID", this.props.formState.data.firebaseID)
    entriesRef.child( this.props.formState.data.firebaseID).remove()
  }

  updateTerm(e, key, index){
    e.preventDefault();
    this.state.terms[index][key] = e.target.value;
    this.setState({ terms: this.state.terms })
  }

  updatePointorTag(e, arrayName, index){
    e.preventDefault();
    this.state[arrayName][index] = e.target.value;
    this.setState({ tags: this.state.tags, points: this.state.points })
  }

  deletePointorTag(arrayName, index){
    this.state[arrayName].splice(index, 1)
    this.setState({ tags: this.state.tags, points: this.state.points })
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
        createdAt: Date.now()
      , source: this.refs['source-input'].value.trim()
      , title: this.refs['title-input'].value.trim()
      , description: this.refs['description-input'].value.trim()
      , type: this.refs['type-input'].value.trim()
      , terms: this.state.terms
      , points: this.state.points
      , tags: this.state.tags
    }
    entriesRef.push(newEntry)
    // this.props.onCreateEntryClick(newEntry)
  }

  closeForm(e){
  	e.preventDefault()
  	this.props.closeForm()
  }

  componentWillReceiveProps(nextProps){
  	if (nextProps.formState.data){
  		this.refs['source-input'].value = nextProps.formState.data.source
  		this.refs['title-input'].value = nextProps.formState.data.title
  		this.refs['description-input'].value = nextProps.formState.data.description
  		this.refs['type-input'].value = nextProps.formState.data.type

  		this.setState({
  				terms: nextProps.formState.data.terms || []
  			, points: nextProps.formState.data.points || []
  			, tags: nextProps.formState.data.tags || []
  			, entryID: nextProps.formState.data.createdAt
  		})
  	}
  }

	render(){
		const { terms, points, tags } = this.state
		const { formState, closeForm } = this.props
		return(
		<form 
          style={{ 
            border: '1px solid gray'
            , boxSizing: 'border-box'
            // , padding: '12px 20px'
            , background: 'white'
            , maxWidth: '960px'
            , width: '100%'
            , position: 'absolute'
            , top: '0px'
            , left: '0px'
            , height: '100%'
            // , bottom: '0px'
            , transition: 'all 1s'
            , transform: formState.state === "closed" ? 'translateY(-200vh)' : 'translateY(0px)'
          }}>

        {/* TOP SECTION */}
          <div className="" style={{ position: 'absolute', top: '0px', height: '60px', left: '0', width: '100%', boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.4)' }}>
            <h4 style={{ margin: '0', textAlign: 'center', marginTop: '8px'}} > { formState.state != "closed" && formState.state.toUpperCase() } </h4> 
            

        {/* CLOSE BUTTON */}
            <button style={{ background: '#EF5350', border: 'none', color: 'white', position: 'absolute', top: '12px', left: '20px', float: 'left', width: '80px', padding: '0', borderRadius: '0'}} onClick={ this.closeForm }> close </button>
           
        {/* SUBMIT BUTTON */}
            <button 
              style={{ background: 'green', border: 'none', color: 'white', position: 'absolute', top: '12px', left: '102px', width: '80px', padding: '0', borderRadius: '0'}} 
              onClick={ formState.state == 'create' ? this.createEntry : this.editEntry }> 
              submit 
            </button>
            
          </div>

        {/* MAIN SECTION */}
          <div className="" style={{ position: 'absolute', top: '62px', bottom: '0px', left: '0', right: '0', padding: '12px 20px 0', overflowY: 'scroll'}} >
          


         


        <div style={{ marginBottom: '20px'}} >
        {/* Source Input */}
          <p style={{ textAlign: 'center', marginBottom: '0px'}} > General Information </p>
            <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px', clear: "both" }}>
              <label style={{ position: 'absolute', left: '10px', color: '#4A90e2' }}>Source</label>
              <input 
                type="text" 
                ref="source-input"
                style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
            </div>

          {/* Title Input */}
            <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px', borderTop: '0' }}>
              <label style={{ position: 'absolute', left: '10px', color: '#4A90e2'  }} >Title</label>
              <input 
                type="text"
                ref="title-input" 
                style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
            </div>

  {/* Description Input */}
            <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px', borderTop: '0' }}>
              <label style={{ position: 'absolute', left: '10px', color: '#4A90e2'  }} >Description</label>
              <input
                ref="description-input" 
                type="text" 
                style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
            </div>

  {/* Type Input */}
            <div style={{ border: '1px solid gray', width: '100%', position: 'relative', height: '80px', borderTop: '0' }}>
              <label style={{ position: 'absolute', left: '10px', color: '#4A90e2'  }}>Type</label>
              <input 
                ref="type-input"
                type="text" 
                style={{ width: '100%', height: '100%', borderRadius: '0', marginBottom: '0' }} />
            </div>
          </div>
    
          

{/* Terms Input */}
          <p style={{ textAlign: 'center', marginBottom: '0px' }}> Terms <span onClick={this.addTerm}> + </span></p>  
          
          {
            terms && terms.map( (term, index) => {
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
          <p style={{ textAlign: 'center', marginBottom: '0px' }}> Points <span onClick={this.addPoint}> + </span> </p>
          
          <ul>
          
          {
            points && points.map( (point, index) => {
              return(
              <div style={{ position: 'relative'}} > 
{/* Points Input */}
                <textarea 
                  style={{ width: "100%", position: "relative", height: '100%', maxWidth: "100%" }}
                  onChange={e => this.updatePointorTag(e, 'points', index) }
                  value={point}
                />
                <span 
                  onClick={ () => this.deletePointorTag('points', index) }
                  style={{ position: 'absolute', top: '0px', right: '8px'}}
                > 
                X 
                </span>
              </div> 
              )

            })
          }
          </ul>


{/* Tags Input */}
          <p style={{ textAlign: 'center', marginBottom: '0px' }}> Tags </p>
          <div style={{ display: 'block', margin: 'auto', maxWidth: '360px', width: '60%'}} className="">
            <input type="text" ref="add-tag-input" style={{ width: '260px', boxSizing: 'border-box', margin: '0', borderRadius: '0'}} /> 
            <button onClick={this.addTag} style={{ boxSizing: 'border-box', margin: '0', width: '98px', padding: '0px', borderRadius: '0'}} >add tag</button>
          </div>
          <div style={{ marginBottom: '12px', textAlign: 'center', paddingTop: '12px'}}  >
          {
            tags && tags.map( (tag, index) => {
              return( 
                <span 
                  key={tag}
                  onClick={() => this.deletePointorTag('tags', index)} 
                  style={{ padding: '6px 18px', border: "1px solid gray", borderRadius: '100', marginRight: '4px', marginBottom: '4px'}}> 
                  {tag} 
                </span>);
            })
          }
          </div>
          
          { this.props.formState.data &&  <button style={{ width: "100%", color: 'white', background: 'tomato' }} onClick={ this.deleteEntry }> delete entry </button>}
           </div>
        </form>
		)
	}
}
