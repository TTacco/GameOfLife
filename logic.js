//TODO: make this configurable as well as the CSS
var time = 0;
var maxRows = 40;
var maxCols = 40;
var cellArray = new Array(maxRows);
var cellData = new Object(); 
var gameSpeed = 1500;

var setAliveQueue = []; //Queue of cells to be set to "alive" at the end of the iteration
var setDeadQueue = []; //Ditto but to set for dead

var globalLivingCells = new Set(); //All living cells in the current iteration
var localDeadCellsSet = new Set(); //All the dead cells nearby living cells in the current iteration

function changeGameSpeed(newGameSpeed){
    gameSpeed = newGameSpeed;
}

function startIteration(){
    setAliveQueue.splice(0, setAliveQueue.length); //clear the array queue
    setDeadQueue.splice(0, setDeadQueue.length);
    localDeadCellsSet.clear(); 

    /*
    RULE 1 - Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    RULE 2 - Any live cell with two or three live neighbours lives on to the next generation.
    RULE 3 - Any live cell with more than three live neighbours dies, as if by overpopulation.
    */
    //for each of these living cells, get nearby dead cells and perform rule 1-3

    globalLivingCells.forEach(livingCell => {
        let nearbyLiveCellCounter = 0
        let adjacentCells = getAdjacentCells(livingCell)      
        
        adjacentCells.forEach(adjCell => {
            if(adjCell.dataset.cellisalive == "true") nearbyLiveCellCounter++;
            else if(!localDeadCellsSet.has(adjCell)) localDeadCellsSet.add(adjCell);
        })

        if(nearbyLiveCellCounter < 2 || nearbyLiveCellCounter > 3) setDeadQueue.push(livingCell); 
    });


    //RULE 4 - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    localDeadCellsSet.forEach(deadCell => {
        let nearbyLiveCellCounter = 0;
        let adjacentCells = getAdjacentCells(deadCell)  

        adjacentCells.forEach(adjCell => {  
            if(adjCell.dataset.cellisalive == "true") nearbyLiveCellCounter++;   
        });

        if(nearbyLiveCellCounter >= 3) setAliveQueue.push(deadCell);
    });

    setAliveQueue.forEach(cell => {
        cell.setAttribute('data-cellisalive', true)
        cell.style.backgroundColor = "black";
        globalLivingCells.add(cell);
    });

    setDeadQueue.forEach(cell => {
        cell.setAttribute('data-cellisalive', false)
        cell.style.backgroundColor = "white";
    });

    setTimeout(startIteration, gameSpeed); 
}

//Retrieves all adjacent cells of a given cell
var adjacentCoordinates = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
function getAdjacentCells(cell){
    let cellRowPos = cell.dataset.cellrowpos;
    let cellColPos = cell.dataset.cellcolpos;

    let adjacentCells = [];  
    
    adjacentCoordinates.forEach(coordinate => {    
        let [rowOffset, columnOffset] = coordinate;  
        
        let deltaRowPos = parseInt(cellRowPos) + rowOffset;
        let deltaColPos = parseInt(cellColPos) + columnOffset;

        if( deltaColPos >= maxCols ||
            deltaColPos <= 0 ||
            deltaRowPos >= maxRows ||
            deltaRowPos <= 0 
        ) return;

        adjCell = cellArray[deltaRowPos][deltaColPos];
        //console.log(`Row ${deltaRowPos} Col ${deltaColPos} IsAlive? ${adjCell.dataset.cellisalive}`)
        
       adjacentCells.push(adjCell);
    });

    return adjacentCells;
}

function cellClicked(event){
    //event.target.style.backgroundColor = "yellow";
    let cellRowPos = event.target.dataset.cellrowpos;
    let cellColPos = event.target.dataset.cellcolpos;

    let clickedCell = cellArray[cellRowPos][cellColPos];

    //console.log(`Positions are row: ${cellRowPos} col: ${cellColPos}`);
    clickedCell.setAttribute('data-cellisalive', true)
    clickedCell.style.backgroundColor = "black";

    globalLivingCells.add(clickedCell); 
}

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

    setTimeout(startIteration, gameSpeed)
}

//Main Methods
drawBoard();

