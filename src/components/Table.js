import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AscLogo from './../resources/order-ascending.svg'
import DescLogo from './../resources/order-descending.svg'


class Table extends Component {
  constructor(props) {
    super(props);
    console.debug("Building table.");
    this.data = props.tableData;
    this.sortColumn = props.orderBy;
  }

  componentWillMount(){
    this.renameHeaders();
  }

  sortByColumn(orderColumn){
      console.debug("Column " + orderColumn.id + " sorted.");
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
      ReactDOM.render(<Table tableData={this.data} orderBy={this.sortColumn} filter={[]} />, document.getElementById('root'))
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
        console.log("order date")
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
          console.log("a");
          console.log(a);
          console.log("b");
          console.log(b);
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
            return 0;
          }
        });

      }

    }else{
      // Descending order, the rows array will be reversed
      dataBefore.rows.reverse();
    }
    return dataBefore;
  }

  renameHeaders(){
    console.debug("Renaming header.");
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
    console.debug("Rendering table.");
    const headersTags = this.headers.map((eachHeader)=>{
      let title = eachHeader.title;
      let orderIcon;

      if(typeof(this.sortColumn) !== 'undefined' && this.sortColumn.id === eachHeader.id){
      console.debug(" Order by " + this.sortColumn.id);
        if(this.sortColumn.orderAsc){
          orderIcon = <img src={AscLogo} alt="Ascending Order" />;
        }else{
          orderIcon = <img src={DescLogo} alt="Descending Order" />;
        }
      }
      return(
        <th key={eachHeader.id} id={eachHeader.id} onClick={() => this.sortByColumn(eachHeader)}>{title} {orderIcon}</th>
      )
    });

    const rows = this.data.rows.map((eachRow,index) =>
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
    );

    return (
      <table key="TableKey">
          <thead>
              <tr>
                {headersTags}
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
