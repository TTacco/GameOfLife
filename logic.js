
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

            cell.setAttribute('data-cellrowpos', row);
            cell.setAttribute('data-cellcolpos', col);
            cell.setAttribute('data-cellisalive', false);
            cellArray[row][col] = cell;
        }
    }
}

var globalLivingCells = new Array();
var localDeadCells = new Array();
var setAliveQueue = new Array();

//interval = setInterval(time, 500);
function time(){
    checkAllLivingCells();   
}

var flip = true;
function checkAllLivingCells(){
    localDeadCells = new Array();
    setAliveQueue = new Array();

    
    //for each of these living cells, get nearby cells
        //skip cell if it is living
        //else, store in localDeadCells 

    globalLivingCells.forEach(checkAdjacentDeadCells);

    //Todo
    //for each localDeadCells, remove all repetitions
    localDeadCells = localDeadCells.filter((deadCell, index, self) =>
        index === self.findIndex((cell) => (cell === deadCell
    ))
)
    let randomColor = (flip)? "red" : "green";
    localDeadCells.forEach(deadCell => {deadCell.style.backgroundColor = randomColor});
    flip = !flip; 


    //for each localDeadCells, check nearby cells
        //if localDeadCells has >=3 living cells, place it in the "setalivequeue"


    
}

//Checks a living cells adjacent cells
var adjacentCoordinates = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
function checkAdjacentDeadCells(item){
    let cellRowPos = item.dataset.cellrowpos;
    let cellColPos = item.dataset.cellcolpos;
    
    adjacentCoordinates.forEach(coordinate => {    
        let [rowOffset, columnOffset] = coordinate;  
        
        let deltaRowPos = parseInt(cellRowPos) + rowOffset;
        let deltaColPos = parseInt(cellColPos) + columnOffset;

        if( deltaColPos >= maxCols ||
            deltaColPos <= 0 ||
            deltaRowPos >= maxRows ||
            deltaColPos <= 0 
        ) return;

        cell = cellArray[deltaRowPos][deltaColPos];
        console.log(`Row ${deltaRowPos} Col ${deltaColPos} IsAlive? ${cell.dataset.cellisalive}`)

        if(cell.dataset.cellisalive == "false") localDeadCells.push(cell);
        });

}

function cellClicked(event){
    //event.target.style.backgroundColor = "yellow";
    let cellRowPos = event.target.dataset.cellrowpos;
    let cellColPos = event.target.dataset.cellcolpos;

    let cell = cellArray[cellRowPos][cellColPos];

    console.log(`Positions are row: ${cellRowPos} col: ${cellColPos}`);
    cell.setAttribute('data-cellisalive', true)
    cell.style.backgroundColor = "black";

    globalLivingCells.push(cell);

    checkAllLivingCells();  
}


//Main Methods
drawBoard();

