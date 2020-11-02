import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AscLogo from './../resources/order-ascending.svg'
import DescLogo from './../resources/order-descending.svg'


class Table extends Component {
  constructor(props) {
    super(props);
    this.data = props.tableData;
    this.sortColumn = props.orderBy;
    this.filter = props.filter;
    if(typeof(this.filter) === 'undefined'){
      this.filter = [];
      this.filter.index = -1;
      this.filter.filterValue = "";
    }
  }

  componentWillMount(){
    this.renameHeaders();
  }

  sortByColumn(orderColumn){
      if(typeof(this.sortColumn) ===  'undefined'){
        // First click on any header
        this.sortColumn = orderColumn;
      }else if(this.sortColumn.index !== orderColumn.index){
        // First click on other header
        this.sortColumn.orderAsc = true;
        this.sortColumn = orderColumn;
      }else{
        // Repeated click on header
        orderColumn.orderAsc = !orderColumn.orderAsc;

      }
      this.sortData(this.data,this.sortColumn);
      ReactDOM.render(<Table tableData={this.data} orderBy={this.sortColumn} filter={this.filter} />, document.getElementById('root'))
  }

  sortData(dataBefore,orderColumn){

    if(orderColumn.orderAsc){
      // Ascending order
      if(orderColumn.index !== 2){
        // Sorting method for numbers and strings leaving undefined values at the end
        dataBefore.rows.sort(function (a, b) {
          if(typeof a[orderColumn.id] === 'undefined')
            return -1;
          if (a[orderColumn.id] > b[orderColumn.id]) {
            return 1;
          }
          if (a[orderColumn.id] < b[orderColumn.id]) {
            return -1;
          }
          return 0;
        });
      }else {
        // Sorting Release Date column
        dataBefore.rows.sort(function (a, b) {
          if(typeof a[orderColumn.id] === 'undefined')
            return -1;
          if(typeof b[orderColumn.id] === 'undefined')
            return 1;

          if(a[orderColumn.id] === 'Unknown'){
            return -1;
          }
          if(b[orderColumn.id] === 'Unknown') {
            return 1;
          }

          let dateA = a[orderColumn.id];
          let dateB = b[orderColumn.id];

          // Create Date object based on A and B strings when possible
          if(a[orderColumn.id].match( /\d{2}-\d{2}-\d{4}/ )){
            dateA = new Date(a[orderColumn.id].replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
          }

          if(b[orderColumn.id].match( /\d{2}-\d{2}-\d{4}/ )){
            dateB = new Date(b[orderColumn.id].replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
          }

          if(typeof(dateA) !== 'undefined' && typeof(dateB) !== 'undefined'){
            if (dateA > dateB) {
              return 1;
            }
            if (dateA < dateB) {
              return -1;
            }
          }

          return 0;
        });

      }

    }else{
      // Descending order, the rows array will be reversed
      dataBefore.rows.reverse();
    }
    return dataBefore;
  }

  handleFilterUpdate(fieldInput,orderColumn) {
    console.log("Filtrando");
    this.filter.index = orderColumn;
    this.filter.filterValue = fieldInput.target.value;

    ReactDOM.render(<Table tableData={this.data} orderBy={this.sortColumn} filter={this.filter} />, document.getElementById('root'))
  }

  renameHeaders(){
    // This method will be executed when each header is clicked
    this.headers = this.data.columns.map((eachHeader,headerIndex)=>{
      if(eachHeader.id === "number"){
        eachHeader.title = "#"
      }
      if(eachHeader.id === "productionBudget" || eachHeader.id === "worldwideBoxOffice"){
          if(eachHeader.title.indexOf('(') === -1){
            let customTitle = eachHeader.title.slice(0, eachHeader.title.length-4) + "(" +eachHeader.title.slice( eachHeader.title.length-4) + ")" ;
            eachHeader.title = customTitle;
          }
      }
      eachHeader.index = headerIndex;
      eachHeader.orderAsc = true;
      return eachHeader;
    });
  }

  render() {
    const headersTags = this.headers.map((eachHeader)=>{
      let title = eachHeader.title;
      let orderIcon;

      if(typeof(this.sortColumn) !== 'undefined' && this.sortColumn.id === eachHeader.id){
        if(this.sortColumn.orderAsc){
          orderIcon = <img src={AscLogo} alt="Ascending Order" />;
        }else{
          orderIcon = <img src={DescLogo} alt="Descending Order" />;
        }
      }
      return(
        <th key={'Sort' + eachHeader.id} id={eachHeader.id} onClick={() => this.sortByColumn(eachHeader)}>{title} {orderIcon}</th>
      )
    });

    const headersFilters = this.headers.map((eachHeader,eachHeaderIndex)=>{
      let customFilterFieldValue = "";
      if(eachHeaderIndex === this.filter.index)
        customFilterFieldValue = this.filter.filterValue;
      return(
        <th key={'Filter'+eachHeader.id}><input name={'Filter'+eachHeader.id} onChange={e => this.handleFilterUpdate(e,eachHeader.index)}
        onBlur={(e) => {
          e.target.value = "";
          this.filter = [];
        }}  value={customFilterFieldValue}
        /></th>
      )
    });

    const rows = this.data.rows.map((eachRow,index) => {

      if(typeof(this.filter) !== 'undefined' && this.filter.index >= 0){
        if(eachRow[this.headers[this.filter.index].id].toString().indexOf(this.filter.filterValue) > -1){
          return(
            <tr key={index}>
              {this.headers.map((eachHeader,headerIndex)=>{
                let rowContent = eachRow[eachHeader.id];
                let amountCell = '';
                if(headerIndex === 2){ // This equals 2 is to find the 'release date' column
                  rowContent = (eachRow[eachHeader.id].match( /\d{2}-\d{2}-\d{4}/ ))?eachRow[eachHeader.id].replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"):eachRow[eachHeader.id];
                }if(headerIndex > 2){ // This greater than 2 is to find last two columns which will be formatted and will be aligned to the right through the class amountCell
                  rowContent = (typeof eachRow[eachHeader.id] === 'number')?new Intl.NumberFormat("en-EN").format(eachRow[eachHeader.id]):0;
                  amountCell = ' amountCell';
                }
                return(
                  <td key={headerIndex + '-' + index} className={'eachCell' + amountCell}>{rowContent}</td>
                )
              })}
            </tr>
          )
        }else return;
      }else{
        return(
          <tr key={index}>
            {this.headers.map((eachHeader,headerIndex)=>{
              let rowContent = eachRow[eachHeader.id];
              let amountCell = '';
              if(headerIndex === 2){ // This equals 2 is to find the 'release date' column
                rowContent = (eachRow[eachHeader.id].match( /\d{2}-\d{2}-\d{4}/ ))?eachRow[eachHeader.id].replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"):eachRow[eachHeader.id];
              }if(headerIndex > 2){ // This greater than 2 is to find last two columns which will be formatted and will be aligned to the right through the class amountCell
                rowContent = (typeof eachRow[eachHeader.id] === 'number')?new Intl.NumberFormat("en-EN").format(eachRow[eachHeader.id]):0;
                amountCell = ' amountCell';
              }
              return(
                <td key={headerIndex + '-' + index} className={'eachCell' + amountCell}>{rowContent}</td>
              )
            })}
          </tr>
        )
      }

    });

    return (
      <table key="TableKey">
          <thead>
              <tr>
                {headersTags}
              </tr>
              <tr>
                {headersFilters}
              </tr>
          </thead>
          <tbody>
              {rows}
          </tbody>
      </table>
    )
  }
}



export default Table
