const deleteImgSrc = require('../assets/images/delete_icon.png')
import React from 'react';

class FormElementDeleteRenderer extends React.Component {

	handleClick(event)
	{	
		var params = this.props.gridParams;
		params.event = event 
		this.props.gridParams.api.dispatchEvent('deleteFormItem', params);
		
		
	}

	render() {
   
    	return  (					   
				  <img className = 'deleteIconRollOver'src={deleteImgSrc} alt="Delete Item" onClick={this.handleClick.bind(this)} />						
					
				 );
  }

}

FormElementDeleteRenderer.propTypes = {
	gridParams:React.PropTypes.object
}




export default FormElementDeleteRenderer
