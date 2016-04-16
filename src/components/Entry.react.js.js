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
        style={{ marginBottom: '20px', boxSizing: 'box-border', border: '3px solid gray', position: 'relative', maxHeight: '600px', overflowY: 'scroll', borderRadius: '4px' }}>
        
      {/* Information Box */}
      <div style={{ background: "#d8d8d8", border: '0px solid tomato', paddingBottom: '0px', padding: '12px',}} >
        {/* ENTRY SOURCE */}
          <h5 style={{ float: 'left', display: 'inline-block', marginBottom: '0' }}>  { entry.title } </h5>

        {/* ENTRY TITLE */}
          <p style={{ clear: 'both', marginBottom: '0' }}>{ entry.source } </p>

        {/* ENTRY DESCRIPTION */}
          <div style={{ color: "#4A90e2" }} >{ entry.description }</div>
      </div>
      


        {/* EDIT BUTTON */}
          <span style={{ position: 'absolute', top: '8px', right: '12px', cursor: 'pointer' }} onClick={ this.openEditForm.bind(this) }>
            Edit
          </span>

      {/* EXPAND BUTTON */}
       
        <span style={{ position: 'absolute', top: '24px', right: '12px', cursor: 'pointer' }} onClick={ this.setState.bind(this, { expanded: !this.state.expanded }) }>
          {this.state.expanded ? " - Collapse" : "+ Expand"}
        </span>
        





        

  {/* EXPANDING SECTION */}
  <div hidden={!this.state.expanded} style={{ maxHeight: this.state.expanded ? 1000 : 0, overflow: 'hidden', transition: 'all 0.8s', padding: '12px', border: '0px solid tomato'}} >    
      {/* Terms */}
        <div>
          <b style={{ color: '#0D47A1'}} >Terms</b> <br/> 
          <table>
            {/* <thead> <tr><td><b> term </b></td><td> definition </td></tr> </thead> */}
            <tbody>
              { 
                entry.terms && entry.terms.map( term => {
                  return(
                    
                      <tr>
                        <td><b>{term.name}</b></td>  
                        <td>{term.definition}</td>
                      </tr>
                    
                  )
                }) 
              }
            </tbody>
          </table>
          
        </div>
        <div>
          <ul>
          
        {/* Points */}
            <b style={{ color: '#0D47A1'}}>Points</b>
            { entry.points && entry.points.map( point => {
                return <li> {point}. </li>
              }) 
            }
            </ul>
          </div>
         {/* <hr style={{ margin: '9px auto 9px 0', textAlign: 'left', color:'#FF8A65' }}/> */}
        </div> 

      {/* Tags */}
        <div style={{ border: '0px solid tomato', padding: '18px 12px', background: "#d8d8d8"}} >
          { entry.tags && entry.tags.map( tag => {
              return( 
                <span style={{ border: '1px solid gray', padding: '6px 12px', background: '#FFCC80', borderRadius: '1px' }}> {tag} </span>
              )
            }) 
          }
        </div>
      </div>
		);
	}
}