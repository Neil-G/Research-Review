import React, { Component } from 'react';

export class Entry extends Component {
  constructor(props){
    super(props)
    this.state = { expanded: false }
  }
	openEditForm(){
		this.props.openEditForm(this.props.entry)
	}

	render(){
		const { entry, openEditForm } = this.props
    console.log("entry", entry)
		return(
			<div 
        key={entry.createdAt} 
        style={{ background: "#d8d8d8", marginBottom: '20px', boxSizing: 'box-border', border: '3px solid gray', padding: '12px', position: 'relative', maxHeight: '600px', overflowY: 'scroll' }}>
        <h1 style={{ float: 'left', display: 'inline-block', marginBottom: '0'}}>
          { entry.source } <span style={{ fontSize: '0.3em'}} > { entry.type } </span>
        </h1>

        <button style={{ float: 'right' }} onClick={ this.openEditForm.bind(this) }>
          Edit
        </button>
        <button style={{ float: 'right' }} onClick={ this.setState.bind(this, { expanded: !this.state.expanded }) }>
          {this.state.expanded ? "Collapse" : "Expand"}
        </button>


        <h4 style={{ clear: 'both' }}>{ entry.title }</h4>
        <div>{ entry.description }</div>

  <div style={{ maxHeight: this.state.expanded ? 1000 : 0, overflow: 'hidden', transition: 'all 0.8s'}} >    
      {/* Terms */}
        <div>
          <b>Terms</b> <br/> 
          
          { 
            entry.terms && entry.terms.map( term => {
              return(
                <p>
                  <span style={{ textDecoration: "underline" }}>{term.name}</span>  <br/>
                  {term.definition}
                </p>
              )
            }) 
          }
          
        </div>
        <div>
          <ul>
          
      {/* Points */}
          <b>Points</b>
          { entry.points && entry.points.map( point => {
              return <li> {point}. </li>
            }) 
          }
          </ul>
        </div>
  </div>      
      {/* Tags */}
        <div>
          { entry.tags && entry.tags.map( tag => {
              return( 
                <span style={{ border: '1px solid gray', borderRadius: '100px', padding: '6px' }}> {tag} </span>
              )
            }) 
          }
        </div>
      </div>
		);
	}
}