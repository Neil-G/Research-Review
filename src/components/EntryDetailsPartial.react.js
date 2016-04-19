import React, { Component } from 'react';
import Firebase from 'firebase';

// connecting firebase
const firebaseRef = new Firebase("https://engineerprogress.firebaseio.com/")
export const entriesRef = firebaseRef.child('entries')


export class EntryDetailsPartial extends Component {
	constructor(props){
    super(props)
  }


  closeForm(e){
  	e.preventDefault()
  }

  componentWillReceiveProps(nextProps){
  
  }

	render(){
    console.log('this.props in entry details modal', this.props)
    const { entryDetails } = this.props
    const entry = entryDetails
		return(
		<div className="show-border"
          style={{ 
            border: '1px solid gray'
            , boxSizing: 'border-box'
            // , padding: '12px 20px'
            , background: 'white'
            // , maxWidth: '960px'
            , width: '100%'
            , position: 'absolute'
            , top: '0px'
            , left: '0px'
            , height: '100%'
            // , bottom: '0px'
            , transition: 'all 1s'
            , transform: this.props.entryDetails ? 'translateY(0px)' : 'translateY(-200vh)' 
          }}>

        {/* TOP SECTION */}
          <div className="" style={{ position: 'absolute', top: '0px', height: '60px', left: '0', width: '100%', boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.4)' }}>
                {/* ENTRY TITLE */}
              <h5 style={{ margin: '4px auto 0', textAlign: 'center' }}>  <b >{ entry && entry.title }</b> </h5>
              {/* ENTRY SOURCE */}
                <p style={{ color: 'gray', marginBottom: '0', color: "#4A90e2", fontSize: '.8em', textAlign: 'center' }}> { entry && `${entry.source} ` } 
                  <span style={{ color: 'gray'}}> 
                   * {entry && entry.type} 
                   {/* EXPANDING SECTION */}
                  </span>  
                </p>

            {/* CLOSE BUTTON */}
            <button style={{ background: '#EF5350', border: 'none', color: 'white', position: 'absolute', top: '12px', left: '20px', float: 'left', width: '40px', padding: '0', borderRadius: '0'}} onClick={ this.props.closePartial }> x </button>

          </div>

        {/* MAIN SECTION */}
          <div className="" style={{ position: 'absolute', top: '62px', bottom: '0px', left: '0', right: '0', padding: '12px 20px 0', overflowY: 'scroll'}}>
            {/* Information Box */}
            <div style={{  paddingBottom: '0px', padding: '0 42px 6px 12px' }}>

                {/* ENTRY DESCRIPTION */}
              <h6 style={{ marginBottom: '0' }}> {entry && entry.description } </h6>

            </div>

              {/* Tags */}
            <div style={{ border: '0px solid tomato', padding: '0px 12px 6px 0px', marginBottom: '20px' }} >
              { entry && entry.tags && entry.tags.map( tag => {
                  return( 
                    <span key={tag} style={{ padding: '6px 12px', borderRadius: '1px', color: 'white', borderRadius: '100px', background: '#2e7d32', marginRight: '4px', fontSize: '0.7em' }}> {tag} </span>
                  )
                }) 
              }
            </div>

            {/* Terms */}
            <div className="">
              <table style={{ width: '100%', marginBottom: '0px'}}>
                <thead style={{ background: '#1565C0', color: 'white' }} > <tr><td> TERMS </td><td>  </td></tr> </thead> 
                <tbody>
                  { 
                    entry && entry.terms && entry.terms.sort().map( term => {
                      return(
                        
                          <tr key={term.name}>
                            <td style={{ width: '20px' }} ><b>{term.name}</b></td>  
                            <td style={{ paddingLeft: '0px' }}>{term.definition}</td>
                          </tr>
                        
                      )
                    }) 
                  }
                </tbody>
              </table>

               <table style={{ width: '100%'}}>
                  <thead style={{ background: '#1565C0', color: 'white' }}> <tr><td> POINTS </td><td>  </td></tr> </thead> 
                  <tbody>
                  { 
                    entry && entry.points && entry.points.map( (point, index) => <tr key={index}><td>{point}</td></tr> ) 
                  }
                  </tbody>
                </table>
              
            </div>
            
          </div>
        {/* MAIN SECTION END*/}
    
        </div>
		)
	}
}
