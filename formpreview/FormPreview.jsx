import React from 'react';
import {Modal, Button , Form , FormGroup ,FormControl ,ControlLabel , Col ,Row ,Label ,Radio ,Checkbox ,Grid} from  'react-bootstrap';
import update from 'immutability-helper';
import '../assets/styles/AppStyle.css'
import TruncatedLabel from '../customcomponents/TruncatedLabel.jsx'


class FormPreview extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = ({showModal:false,formElements:[]})		
	}

	showPreview(formElements = [])
	{
		this.setState({showModal:true})
		this.createElements(formElements)
	}

	close() 
	{
	   this.setState({ showModal: false });
	}

	createElements(formElements = [])
	{	
		var elements = []		
		var gridElements = [];
		var rowElements = [];
		var colCounter = 0;
		var rowCounter = 0;

		for(var f = 0;f<formElements.length;f++)
		{	
			

			var formElement = null;
			
			switch (formElements[f].fieldType)
			{
				
				 case 'checkbox':
					formElement = <div key = {f} className="checkbox" style = {{float:'left'}}>							  		
							  		<TruncatedLabel value = {formElements[f].fieldName} />
							  		<input type="checkbox" style = {{marginLeft:"4px"}}/>
								 </div>
				 break;				
				default :

					if(!formElements[f].group && !formElements[f].leaf)
					{
						formElement= <FormGroup  key = {f}  className="defaultMargin " style = {{float:'left'}}>								     				     
								     	<TruncatedLabel  className="defaultMargin" value = {formElements[f].fieldName} />
								     	<FormControl componentClass={formElements[f].fieldType} style = {{width:'100px'}}
								     	 />					     
							    	 </FormGroup>
					}
					else
					{	
						if(formElements[f].group)
						{
							//ADD RADIO BUTTON GROUP
							var labels = [];
							
							for(var r = 0 ;r < formElements[f].children.length ;r++)
							{		
									var labelElement = <div key = {f + '-'+r} style = {{marginLeft:"8px",float:'left'}}>															
															<label className = "truncate autoWidth">{formElements[f].children[r].fieldName} </label>
															<input type="radio" name={formElements[f].fieldGrouping} style = {{marginLeft:"4px"}}/>
														</div>
														
									labels.push(labelElement)
									
							}

							formElement = <div key = {f} className="radio" style = {{float:'left'}}>
											<TruncatedLabel value = {formElements[f].fieldName} style = {{marginTop:"2px"}}/>
									  		{labels}
										  </div>
							}
						
					}
					
				break;

			}

			
			
			if(colCounter > 2)
			{			
				rowElements =[];				
				colCounter = 0 ;
				rowCounter++;				

			}

			rowElements.push(<Col key = {rowCounter+' '+colCounter} sm={3} md={3} className = "vcenter">{formElement}</Col>)
			gridElements[rowCounter] = <Row style = {{margin:"8px",marginTop:"15px"}} key = {rowCounter} className="show-grid">{rowElements}</Row>;		
			colCounter++
			
		}
		

   		this.setState({formElements:gridElements})
	}


	render (){

		return (
					<Modal show={this.state.showModal} onHide={this.close.bind(this)} dialogClassName="custom-modal">
			          <Modal.Header closeButton>
			            <Modal.Title>Form Preview</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			          	<Form className="defaultMargin" inline>
			          		<Grid style= {{width:'100%',marignLeft:'0px'}}>
			          			{this.state.formElements}
			          		</Grid>
			          		 
			          	</Form>
			          
			          </Modal.Body>
			          <Modal.Footer>
			            <Button onClick={this.close.bind(this)}>Close</Button>
			          </Modal.Footer>
        			</Modal>

			)
	}



}

export default FormPreview