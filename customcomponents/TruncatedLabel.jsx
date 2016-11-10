import React from 'react';

class TruncatedLabel extends React.Component {

	truncate( label )
	{	
		
	    var isTooLong = label.length > 14,
        s_ = isTooLong ? label.substr(0,13) : label;        
	    return  isTooLong ? s_ + '...' : s_;
	};


	render()
	{	
		var truncatedStr = this.truncate(this.props.value)

		return ( <label style = {{marginRight:"4px",float:'left', width:"110px"}}>{truncatedStr}</label> )
	}
}

TruncatedLabel.propTypes = {
	value:React.PropTypes.string
}


export default TruncatedLabel