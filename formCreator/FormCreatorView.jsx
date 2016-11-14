import React from 'react';
import { Button , Form , FormGroup ,FormControl ,ControlLabel , Col ,Row ,Label , Grid} from 'react-bootstrap';
import update from 'immutability-helper';

class FormCreatorView extends React.Component {
	

	constructor(props)
	{
		super(props)
		this.state = {formElementObj:{fieldName:'',fieldType:'input',fieldGrouping:''},buttonState:{addBtnEnable:true,updateBtnEnable:false,clearBtnEnable:false},disableGrpInput:false}
	}


	editFormElement(element)
	{
		
		var updateBtnState = update(this.state.buttonState,{addBtnEnable:{$set:false},updateBtnEnable:{$set:true},clearBtnEnable:{$set:true}})		
		var formObj = update(this.state.formElementObj,{fieldId:{$set:element.fieldId},fieldName:{$set:element.fieldName},fieldType:{$set:element.fieldType},fieldGrouping:{$set:element.fieldGrouping == undefined?'-':element.fieldGrouping}})
		
		this.setState({formElementObj:formObj,buttonState:updateBtnState,disableGrpInput:true})	
	}

	onClickAddFormElementBtn()
	{
		this.props.addFormElement(Object.assign({},this.state.formElementObj))
		this.clearInputFields();
	}

	clearFormElementOnDelete()
	{
		this.onClickClearFormElementBtn()
	}

	onClickUpdateFormElementBtn()
	{	
		this.props.updateFormElement(Object.assign({},this.state.formElementObj))
		this.onClickClearFormElementBtn();
	}

	onClickClearFormElementBtn()
	{	
		var updateBtnState = update(this.state.buttonState,{addBtnEnable:{$set:true},updateBtnEnable:{$set:false},clearBtnEnable:{$set:false}})
		this.setState({buttonState:updateBtnState,disableGrpInput:false})
		this.clearInputFields();
	}

	clearInputFields()
	{
		var formObj = update(this.state.formElementObj,{fieldName:{$set:''},fieldType:{$set:'input'},fieldGrouping:{$set:''}})		
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
						      				className = "setPosition" style = {{width:'200px'}}
						      				>
						      	<option value="input">Text</option>
	        					<option value="select">Select</option>
	        					<option value="checkbox">CheckBox</option>	        										
						      </FormControl>					     
						    </FormGroup>
					    </Col>
					    <Col sm={4} md={4} className = "vcenter">
						     <FormGroup controlId="fieldGroupingInputId" className="defaultMargin" style = {{float:'left'}}>
							     <ControlLabel className="defaultMargin truncate">Radio Button Field Grouping</ControlLabel>					     
							     <FormControl type="text" ref={(input) => this.fieldGroupingInputId = input} onChange = {this.onElementValueChange.bind(this)}
							     			  value = {this.state.formElementObj.fieldGrouping}							     			 
							     			  className = "setPosition"
							     			  onChange = {this.onElementValueChange.bind(this)}	
							     			  disabled = {this.state.disableGrpInput}
							     			  />	
							  </FormGroup>	
							 </Col>
					   </Row>
					   <Row className="show-grid" style = {{marginTop:"15px"}}>
						    
						 <Col sm={8} md={8} className = "vcenter" style = {{float:"right",margin:"4px"}}>
						 <Button type ="button"  ref={(button) => this.updateFormBtn = button}  onClick ={this.onClickUpdateFormElementBtn.bind(this)} disabled = {!this.state.buttonState.updateBtnEnable}>
							   Update Form Item
						  </Button>
						  <Button type ="button" ref={(button) => this.clearFormBtn = button}  onClick ={this.onClickClearFormElementBtn.bind(this)} disabled = {!this.state.buttonState.clearBtnEnable} style = {{marginLeft:"4px"}}>
							   Clear Form Item
						  </Button>
						  <Button type ="button" ref={(button) => this.addFormBtn = button}  onClick ={this.onClickAddFormElementBtn.bind(this)} disabled = {!this.state.buttonState.addBtnEnable} style = {{marginLeft:"4px"}}>
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
	addFormElement:React.PropTypes.func,
	editFormElement:React.PropTypes.func,
	updateFormElement:React.PropTypes.func

}
export default FormCreatorView;