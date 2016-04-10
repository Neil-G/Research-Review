import React, { Component } from 'react';

export class Entry extends Component {
	openEditForm(){
		this.props.openEditForm(this.props.entry)
	}

	render(){
		const { entry, openEditForm } = this.props
		return(
			<div 
        key={entry.createdAt} 
        style={{ boxSizing: 'box-border', border: '3px solid gray', padding: '12px', position: 'relative', maxWidth: '600px', maxHeight: '600px', overflowY: 'scroll' }}>
        <h1 style={{ float: 'left', display: 'inline-block', marginBottom: '0'}}>
          { entry.source } <span style={{ fontSize: '0.3em'}} > { entry.type } </span>
        </h1>

        <div style={{ float: 'right' }} onClick={ this.openEditForm.bind(this) }>
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
            entry.terms.map( term => <li>{term.name}<ul><li>{term.definition}</li></ul></li>) 
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
		);
	}
}