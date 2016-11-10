import React from 'react';
import FormCreatorView from './formCreator/FormCreatorView.jsx';
import FormElementsListView from './formCreator/FormElementsListView.jsx';
import {Row} from 'react-bootstrap';

class App extends React.Component {

	addElement(formElement)
	{
		this.agGrid.addElement(formElement);
	}

	render(){
		return ( 	
				
			<div style= {{width:'100%'}}>				
				<FormCreatorView addFormElement = {this.addElement.bind(this)}/>
				<FormElementsListView ref={(grid) => this.agGrid = grid}/>
			</div>
				
				
		) 
	}	
}

export default App;