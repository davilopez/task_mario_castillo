import React from 'react';
import ReactDOM from 'react-dom';
import { act } from "react-dom/test-utils";

import App from './App';
import Table from './components/Table';
import tableData from './data'


let container;

beforeEach(() => {
  container = document.createElement('div');

  container.setAttribute("id", "root");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Task 1', () => {
  it('Renders in table rows based on provided columns.', () => {
    // Render App component
    act(() => {
      ReactDOM.render(<App />, container);
    });
    // There should be only 1 table element
    const table = container.querySelector('table');
    expect(typeof(table)).toEqual("object");

    const thead = table.tHead;
    // The number of th tags should be equal to number of columns
    expect(thead.rows[0].cells.length).toEqual(tableData.columns.length);

    // The table should have exact amount of rows
    const tbody = table.getElementsByTagName("tbody")[0];
    const trows = tbody.getElementsByTagName("tr");
    expect(trows.length).toEqual(tableData.rows.length);

  });
});

describe('Task 2', () => {
  it('Clicking on headers sort table data.', () => {
    // Render App component
    act(() => {
      ReactDOM.render(<App />, container);
    });
    // There should be only 1 table element
    let table = container.querySelector('table');

    const thead = table.tHead;
    thead.rows[0].cells[1];
    const movieHeader = thead.rows[0].cells[1];
    expect(movieHeader.innerHTML.trim()).toBe("Movie");

    let tbody = table.getElementsByTagName("tbody")[0];
    let trows = tbody.getElementsByTagName("tr")[0]; // Get first row
    let tcell = tbody.getElementsByTagName("td")[1]; // Get Movie column
    expect(tcell.innerHTML.trim()).toEqual("Iron Man"); // First movie name in the list is Iron Man

    // Perform click on "Movie" header
    act(() => {
      movieHeader.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    table = container.querySelector('table');
    // The table should have exact amount of rows
    tbody = table.getElementsByTagName("tbody")[0];
    trows = tbody.getElementsByTagName("tr")[0]; // Get first row
    tcell = tbody.getElementsByTagName("td")[1]; // Get Movie column
    expect(tcell.innerHTML.trim()).toEqual("Ant-Man"); // First movie name after sorting by name is Ant-Man

  });
});


describe('Task 3', () => {
  it('Fill Movie filter field to filter the table data.', () => {
    // Render App component
    act(() => {
      ReactDOM.render(<App />, container);
    });
    // There should be only 1 table element
    let table = container.querySelector('table');

    const thead = table.tHead;
    thead.rows[0].cells[1];
    const movieHeader = thead.rows[0].cells[1];
    expect(movieHeader.innerHTML.trim()).toBe("Movie");

    let tbody = table.getElementsByTagName("tbody")[0];
    let trows = tbody.getElementsByTagName("tr")[0]; // Get first row
    let tcell = tbody.getElementsByTagName("td")[1]; // Get Movie column
    expect(tcell.innerHTML.trim()).toEqual("Iron Man"); // First movie name in the list is Iron Man

    // Perform click on "Movie" header
    act(() => {
      movieHeader.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    table = container.querySelector('table');
    // The table should have exact amount of rows
    tbody = table.getElementsByTagName("tbody")[0];
    trows = tbody.getElementsByTagName("tr")[0]; // Get first row
    tcell = tbody.getElementsByTagName("td")[1]; // Get Movie column
    expect(tcell.innerHTML.trim()).toEqual("Ant-Man"); // First movie name after sorting by name is Ant-Man

  });
});
