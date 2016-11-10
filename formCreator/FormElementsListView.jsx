import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import '../assets/styles/ag-grid.css';
import '../assets/styles/theme-bootstrap.css';
import '../assets/styles/theme-fresh.css';
import 'babel-polyfill';
import update from 'immutability-helper';
import { Row,Button ,Col} from 'react-bootstrap';
import FormPreview from '../formpreview/FormPreview.jsx'

class FormElementsListView extends React.Component {

   constructor(props)
	{
		super(props)
		this.state = {gridData:[]}
	}


   addElement(formElement)
   {
   		this.formElementGrid.api.collapseAll();
   		 var groupData = false
   		 var groupDataMatched = false
   		 var rows = this.formElementGrid.api.getModel();
		if(formElement.fieldGrouping.length > 0)
		{	
			
			groupData = true
			for(var g = 0;g < rows.rowsToDisplay.length;g++)
			{
				if(rows.rowsToDisplay[g].data.fieldGrouping == formElement.fieldGrouping )
				{	
					groupDataMatched = true
					rows.rowsToDisplay[g].data.children.push({fieldName:formElement.fieldName,fieldType:'Radio',fieldMapping:formElement.fieldMapping,leaf:true})
					
				}
			}
			
		}
		else
		{	
			rows.rowsToDisplay.push({data:{fieldName:formElement.fieldName,fieldType:formElement.fieldType,fieldMapping:formElement.fieldMapping}})
		}

		if(groupData && !groupDataMatched)
		{
			formElement.group = true;
			formElement.children = [];
			rows.rowsToDisplay.push({data:{group:true,children:[],fieldGrouping:formElement.fieldGrouping,fieldName:formElement.fieldName}})
		}

		
		var newArray = this.pluck(rows.rowsToDisplay,'data')	
		
		//UPDATE STATE AS WELL		
		this.setState({gridData:newArray}); 
		
   	
   }

	headerCellRendererFunc(params) 
	{
		var eHeader = "<span style = 'font-weight:bold;'>"+params.colDef.headerName+"</span>"
		return eHeader;
	}

	launchFormPreview()
	{
		var formElementsData = this.pluck(this.formElementGrid.api.getModel().rowsToDisplay,'data')
		this.formPreview.showPreview(formElementsData)
	}

	pluck(array, key) {

		var newArray = [];
		for(var a = 0 ;a < array.length ;a ++)
		{
			if(!array[a][key].leaf)
			{
				newArray.push(array[a][key])
			}
		}

	   return newArray;
	}

	innerCellRenderer(params) {

		
        return params.data.fieldName;
    }

  	render (){

  		var columns = [{headerName:'Field Name',field:'fieldName', cellRendererParams: {
			                innerRenderer: this.innerCellRenderer.bind(this)
			            },
  						cellClass: 'agGridCellWidth',cellRenderer: 'group'},{headerName:'Field Type',field:'fieldType',cellClass: 'agGridCellWidth'},{headerName:'Field Mapping',field:'fieldMapping',cellClass: 'agGridCellWidth'}]
   		
  

  		return (

			<div className="ag-fresh" style = {{width:"42.5%",height:"250px"}}>
				<AgGridReact
				    // column definitions and row data are immutable, the grid
				    // will update when these lists change
				    columnDefs={columns}
				    rowData={this.state.gridData}
				    headerCellRenderer = {this.headerCellRendererFunc.bind(this)}
				    ref={(grid) => this.formElementGrid = grid}
				    rememberGroupStateWhenNewData="true"
				    // or provide props the old way with no binding
				    rowSelection="multiple"
				    enableSorting="true"
				    enableFilter="true"
				    rowHeight="22"
				    style = {{width:"100%",height:"220px"}}
				    getNodeChildDetails = {function(element) {
												            if (element.group && element.children.length >0) {
												                return {
												                    group: true,
												                    children: element.children,
												                    expanded: element.open
												                };
												            } else {
												                return null;
												            }
											        }}
			       
				/>

				<div className="row defaultOverride" style = {{marginTop:'5px'}}>
					<div className = "col-*-*">
						<Button type ="button" style = {{marginRight:'5px'}}>
						      Re-Order
					   </Button>
					   <Button type ="button" onClick ={this.launchFormPreview.bind(this)}>
						      Preview
					  </Button>
					 </div>
				</div>
				 
				<FormPreview  ref={(form) => this.formPreview = form} style = {{width:"75%"}}/>
			</div>	
		)

  	}

}

FormElementsListView.propTypes = {
	addElement:React.PropTypes.func
}


export default FormElementsListView;