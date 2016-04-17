import React, { Component } from 'react';

export class Entry extends Component {
  constructor(props){
    super(props)
    this.state = { expanded: false }
  }
	openEditForm(){
		this.props.openEditForm(this.props.entry)
	}
  showEntryDetails(){
    this.props.showEntryDetails()
  }

	render(){
		const { entry, openEditForm } = this.props
    console.log("entry", entry)
		return(
			<div className="entry"
        key={entry.createdAt} 
        style={{ marginBottom: '0px', boxSizing: 'border-box', position: 'relative', maxHeight: '600px', overflowY: 'hidden', borderBottom: '1px solid #BDBDBD', paddingTop: '18px', paddingBottom: '16px' }}>
        
      {/* Information Box */}
      <div style={{  paddingBottom: '0px', padding: '0 42px 6px 12px' }}>
        {/* ENTRY TITLE */}
          <h5 style={{ marginBottom: '0' }}>  <b style={{  cursor: 'pointer' }} onClick={ this.showEntryDetails.bind(this) }>{ entry.title }</b> </h5>

          {/* ENTRY DESCRIPTION */}
          <h6 style={{ marginBottom: '0' }}> {entry.description } </h6>

        {/* ENTRY SOURCE */}
          <p style={{ color: 'gray', marginBottom: '0', color: "#4A90e2", fontSize: '.8em' }}> { `${entry.source} ` } 
            <span style={{ color: 'gray'}}> 
             * {entry.type} * <span style={{ cursor: 'pointer' }} onClick={ this.setState.bind(this, { expanded: !this.state.expanded }) }> ({entry.terms && entry.terms.length || 0}/{entry.points && entry.points.length || 0}) </span>
             {/* EXPANDING SECTION */}
              <span hidden={!this.state.expanded} style={{ maxHeight: this.state.expanded ? 1000 : 0, overflow: 'hidden', transition: 'all 0.8s', padding: ' 0 12px', color: 'gray', paddingBottom: '6px', paddingLeft: '0px' }}>
               { '* ' }   
               { 
                  entry.terms && entry.terms.map( term => term.name).join(' * ')
                }   
              </span> 
            </span>  
          </p>
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




        

  

      
      </div>
		);
	}
}