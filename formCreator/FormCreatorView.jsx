import React from 'react';
import { Button , Form , FormGroup ,FormControl ,ControlLabel , Col ,Row ,Label , Grid} from 'react-bootstrap';
import update from 'immutability-helper';

class FormCreatorView extends React.Component {
	

	constructor(props)
	{
		super(props)
		this.state = {formElementObj:{fieldName:'',fieldType:'input',fieldMapping:'',fieldGrouping:''}}
	}


	onClickAddFormElementBtn()
	{

		this.props.addFormElement(Object.assign({},this.state.formElementObj))
		this.clearInputFields();
		
	}

	clearInputFields()
	{
		var formObj = update(this.state.formElementObj,{fieldName:{$set:''},fieldType:{$set:'input'},fieldMapping:{$set:''},fieldGrouping:{$set:''}})		
		this.setState({formElementObj:formObj})	
	}

	onElementValueChange(event)
	{	
		
		var formObj = update(this.state.formElementObj,{[event._targetInst._currentElement.props.id.replace('InputId','')]:{$set:event.target.value}})		
		this.setState({formElementObj:formObj})	
	}

	render ()
	{
		return (	
				
				<div className="panel defaultPanelOverride panel-default creatorPanelStyle" >
				  <div className="panel-heading boldHeader">Create Form</div>
				  <div className="panel-body">
				  	<Form className="defaultMargin" inline>
				  	 <Grid style= {{width:'100%',marignLeft:'0px'}}>
					  <Row className="show-grid" style = {{marginTop:"15px"}}>
					   <Col sm={4} md={4} className = "vcenter">
					    <FormGroup controlId="fieldNameInputId" className="defaultMargin" style = {{float:'left'}}>
					     <ControlLabel className="defaultMargin">Field Name</ControlLabel>					     
					     <FormControl type="text" ref={(input) => this.fieldNameInputId = input}
					     			  onChange = {this.onElementValueChange.bind(this)}	
					     			  value = {this.state.formElementObj.fieldName}						     			  			     			  
					     			  className = "setPosition"
					     			  />					     
					    </FormGroup>
					    </Col>
					    <Col sm={4} md={4} className = "vcenter">
						    <FormGroup controlId="fieldTypeInputId" className="defaultMargin" style = {{float:'left'}}>					     
						      <ControlLabel className="defaultMargin">Field Type</ControlLabel>
						      <FormControl componentClass="select"  value = {this.state.formElementObj.fieldType} ref={(select) => this.fieldTypeInputId = select} onChange = {this.onElementValueChange.bind(this)}
						      				className = "setPosition"
						      				>
						      	<option value="input">Text</option>
	        					<option value="select">Select</option>
	        					<option value="checkbox">CheckBox</option>	        										
						      </FormControl>					     
						    </FormGroup>
					    </Col>
					    <Col sm={4} md={4} className = "vcenter">
					    	 <FormGroup controlId="fieldMappingInputId" className="defaultMargin" style = {{float:'left'}}>
							    <ControlLabel className="defaultMargin">Field Mapping</ControlLabel>					     
							    <FormControl type="text" ref={(input) => this.fieldMappingInputId = input} onChange = {this.onElementValueChange.bind(this)}
							     			 value = {this.state.formElementObj.fieldMapping}
							     			  className = "setPosition"
							     			 />	
						    </FormGroup>
					    </Col>
					    </Row>
					    <Row className="show-grid" style = {{marginTop:"15px"}}>
						    <Col sm={4} md={4} className = "vcenter">
						     <FormGroup controlId="fieldGroupingInputId" className="defaultMargin" style = {{float:'left'}}>
							     <ControlLabel className="defaultMargin truncate">Radio Button Field Grouping</ControlLabel>					     
							     <FormControl type="text" ref={(input) => this.fieldGroupingInputId = input} onChange = {this.onElementValueChange.bind(this)}
							     			  value = {this.state.formElementObj.fieldGrouping}							     			 
							     			   className = "setPosition"
							     			  />	
							  </FormGroup>	
							 </Col>
							 <Col sm={4} md={4} className = "vcenter" style = {{float:"right",margin:"4px"}}>
						      <Button type ="button" onClick ={this.onClickAddFormElementBtn.bind(this)}>
							      Add Form Item
							  </Button>
							 </Col>
					    </Row>
					  </Grid>
					 </Form>				  	
				  </div>
				</div>					 
			
		)
	}
	
}

FormCreatorView.propTypes = {
	addFormElement:React.PropTypes.func
}
export default FormCreatorView;