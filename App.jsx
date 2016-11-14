import React from 'react';
import FormCreatorView from './formCreator/FormCreatorView.jsx';
import FormElementsListView from './formCreator/FormElementsListView.jsx';
import {Row} from 'react-bootstrap';

class App extends React.Component {

	addElement(formElement)
	{
		this.agGrid.addElement(formElement);
	}

	editFormElement(selectedItem)
	{	
		this.formCreatorView.editFormElement(selectedItem);
	}

	updateFormElement(formElement)
	{
		this.agGrid.updateFormElement(formElement);
	}

	clearFormElement()
	{
		this.formCreatorView.clearFormElementOnDelete();
	}

	render(){
		return ( 	
				
			<div style= {{width:'100%'}}>				
				<FormCreatorView ref={(form) => this.formCreatorView = form} addFormElement = {this.addElement.bind(this)} updateFormElement = {this.updateFormElement.bind(this)}/>
				<FormElementsListView ref={(grid) => this.agGrid = grid} editFormElement = {this.editFormElement.bind(this)} clearFormSelection = {this.clearFormElement.bind(this)}/>
			</div>
				
				
		) 
	}	
}

export default App;