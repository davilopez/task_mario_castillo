# Front-end coding challenge

The coding challenge consists of a small React.js application which shall be extended by you.

The next sections describe the three tasks and give some general hints.
At the end you can leave any comments about design decisions, instructions or general feedback.

## Task 1

Your task is to extend the component `src/components/Table` to render a table with a dynamically defined column schema.

The schema and the content for the table are provided in a JSON structure.

Example:

```json
{
    "columns": [
        { "id": "myFirstValue", "title": "Column One" },
        { "id": "mySecondValue", "title": "Column Two" }
    ],
    "rows": [
        { "myFirstValue": "Row One", "mySecondValue": 1 },
        { "myFirstValue": "Row Two", "mySecondValue": 2 }
    ]
}
```

The table rendered based on the example structure would look like this:

| Column One | Column Two |
| ---------- | ---------- |
| Row One    | 1          |
| Row Two    | 2          |

The `columns` property is an array which defines the number and order of table columns.
Each column object has two properties:

-   `id` - Defines the name of the row objects property to show as the content of the cell
-   `title` - Defines the column header title

The `rows` property is an array which contains one JSON object per row.
The property keys match the names referenced by the columns `id` values.
The property values shall be shown in the table cells.

For the coding challenge, the file `src/data.json` should be used and its content should be rendered in the table.
The application (`src/App.js`) already loads the data and provides it to the `Table` component.

The table should look like this:
![screen](/resources/table.png)

The sorting icons are in the `/resources` folder. The font in the screen is the [OpenSans](https://fonts.google.com/specimen/Open+Sans).

## Task 2

As the second task the `Table` component shall be extended to offer sorting capabilities.
It should be possible to sort the table by columns.
Once the user clicks on a column header, the table is sorted by that respective column.

-   First click on a column header sorts the table by this column in ascending order
-   Any additional click on the same column header toggles the sorting order to descending and back to ascending
-   A click on a different column header resets the sorting order to ascending and sorts the table by the newly selected column
-   The table indicates which column is currently sorted and the sorting order by showing the corresponding icon in the header

## Task 3

Add a second row in the header with an input field. The input will be used to filter content of the column.
Only rows that match the filter string for this column should be displayed.

## General hints

-   The application was bootstrapped using [Create React App](https://github.com/facebook/create-react-app)
-   Yarn is used for dependency management
-   Run `yarn` to install all dependencies
-   Start the development server with `yarn start`
-   Run tests with `yarn test`
 -  Jest is already available as a test framework
-   Don't add any additional libraries
-   Don't change the `./src/data.json` file
-   If anything is unclear don't hesitate to contact us

## Design decisions and feedback

As I'm not allowed to add any additional library, I will be able to check only if the table is rendered. Also to perform this tasks I would suggest to use any standard library such as ag-Grid to ease the process.

Due to connectivity issues I couldn't commit changes until Sunday late.

Note: I have experience using Jasmine instead of JEST, and I'm also experienced using NPM and not Yarn. However this is a minor issue for me, most of the work is based in React and not on setting up the project.
