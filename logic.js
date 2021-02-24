//TODO: make this configurable as well as the CSS
var time = 0;
var maxRows = 40;
var maxCols = 40;
var cellArray = new Array(maxRows);
var cellData = new Object(); 

function drawBoard(){
    var body = document.getElementById("gridCanvas");

    for(row = 0; row < maxRows; row++){
        cellArray[row] = new Array(maxCols)

        for(col = 0; col < maxCols; col++){
            /*Create a new element and append them as a cell in the main grid canvas
              Also add a onclick event to allow the user to make a cell "alive"
              These essentially represents the small squares in the board
            */
            var cell = document.createElement("cell");
            cell.addEventListener("click", cellClicked);
            body.appendChild(cell);

            //Add a special data- attribute for cell info like position and status
            let cellProperties = {
                cellElement: cell,
                cellStyle: cell.style,
                cellColumnPosition: col,
                cellRowPosition: row,
                cellAlive: false,
            }

            //Set a data attribute that will store a "id" to the element
            //which will be used as a key for the cellData dictionary that contains
            //every cell's property in the board (better than using a 2d array imo)
            let cellKey = "row" + row + "col" + col;
            cell.setAttribute('data-cellid', cellKey);
            cellData[cellKey] = cellProperties;
        }
    }
}

function cellClicked(event){
    //event.target.style.backgroundColor = "yellow";
    let cellID = event.target.dataset.cellid;
    let cellProperties = cellData[cellID];
    console.log(cellProperties);

    cellProperties["cellStyle"].backgroundColor = (cellProperties["cellAlive"])? "white" : "orange";
    cellProperties["cellAlive"] = !cellProperties["cellAlive"];

}

//tick = setInterval(ticker, 100);
function ticker(){

}

drawBoard();

