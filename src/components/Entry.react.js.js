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
			<div className="entry"
        key={entry.createdAt} 
        style={{ marginBottom: '0px', boxSizing: 'box-border', position: 'relative', maxHeight: '600px', overflowY: 'hidden', borderBottom: '1px solid #BDBDBD', paddingBottom: '18px'}}>
        
      {/* Information Box */}
      <div style={{  paddingBottom: '0px', padding: '12px',}} >
        {/* ENTRY TITLE */}
          <h5 onClick={ this.setState.bind(this, { expanded: !this.state.expanded }) } style={{ marginBottom: '0', cursor: 'pointer' }}>  <b>{ entry.title }</b> </h5>

          {/* ENTRY DESCRIPTION */}
          <div style={{ fontSize: '1.3em' }} >{ entry.description }</div>

        {/* ENTRY SOURCE */}
          <p style={{ color: 'gray', marginBottom: '0', color: "#4A90e2", fontSize: '.8em' }}> { entry.source } <span style={{ color: 'gray'}} > * {entry.type} </span> </p>

        
      </div>
      


        {/* EDIT BUTTON */}
          <span style={{ position: 'absolute', top: '8px', right: '12px', cursor: 'pointer' }} onClick={ this.openEditForm.bind(this) }>
            Edit
          </span>

      {/* EXPAND BUTTON */}
       { 
        // <span style={{ position: 'absolute', top: '24px', right: '12px', cursor: 'pointer' }} onClick={ this.setState.bind(this, { expanded: !this.state.expanded }) }>
        //    {this.state.expanded ? " - Collapse" : "+ Expand"}
        //  </span>
       }
        

       {/* Tags */}
        <div style={{ border: '0px solid tomato', padding: '0px 12px 6px' }} >
          { entry.tags && entry.tags.map( tag => {
              return( 
                <span style={{ padding: '6px 12px', borderRadius: '1px', color: 'white', borderRadius: '100px', background: '#2e7d32', marginRight: '4px', fontSize: '0.7em' }}> {tag} </span>
              )
            }) 
          }
        </div>




        

  {/* EXPANDING SECTION */}
  <div hidden={!this.state.expanded} style={{ maxHeight: this.state.expanded ? 1000 : 0, overflow: 'hidden', transition: 'all 0.8s', padding: '12px' }} >    
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
          
        {/* Points */}
            <b style={{ color: '#0D47A1'}}>Points</b>

            <table>
              <tbody>
            { 
              entry.points && entry.points.map( point => <tr><td>{point}</td></tr> ) 
            }
              </tbody>
            </table>
          </div>
         {/* <hr style={{ margin: '9px auto 9px 0', textAlign: 'left', color:'#FF8A65' }}/> */}
        </div> 

      
      </div>
		);
	}
}