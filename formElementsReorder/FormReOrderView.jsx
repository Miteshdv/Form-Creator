import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import update from 'immutability-helper';
import TruncatedLabel from '../customcomponents/TruncatedLabel.jsx'
import {SortableContainer, SortableElement , arrayMove} from 'react-sortable-hoc'

const SortableItem = SortableElement(({value}) => <div className="SortableItem">{value}</div>);

const SortableList = SortableContainer(({items}) => {
	return (
		<ul className="SortableList">
			{items.map(({fieldId,fieldName}, index) =>
                <SortableItem key={`item-${index}`} index={index} value={fieldName} style = {{zIndex: 10000}}/>

            )}
		</ul>
	);
});


class FormReOrderView extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = ({showModal:false,formElements:[]})		
	}

	showListOrder(formElements = [])
	{
		this.setState({formElements:formElements,showModal:true})
	}
	
	close() 
	{
	   this.setState({ showModal: false });
	}


	onSortEnd(indexMapper)
	{	
        this.setState({
            formElements: arrayMove(this.state.formElements, indexMapper.oldIndex, indexMapper.newIndex)
        });

        this.props.updateSorting(this.state.formElements)

	};

	

	render (){

		return (
					<Modal show={this.state.showModal} onHide={this.close.bind(this)} bsSize="small" aria-labelledby="contained-modal-title-sm">
			          <Modal.Header closeButton>
			            <Modal.Title>Form Re-Order</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            <SortableList items={this.state.formElements}   helperClass="SortableHelper"
			          onSortEnd={this.onSortEnd.bind(this)} />
			          
			          </Modal.Body>
			          <Modal.Footer>
			            <Button onClick={this.close.bind(this)}>Close</Button>
			          </Modal.Footer>
        			</Modal>

			)
	}

}

FormReOrderView.propTypes = {
	updateSorting:React.PropTypes.func	
}


export default FormReOrderView