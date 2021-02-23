

function drawBoard(){
    var body = document.getElementById("gridbody");

    for(i = 0; i < 625; i++){
        var body = document.getElementById("gridbody");
        var cell = document.createElement("cell");
        cell.addEventListener("click", clickMe);
        body.appendChild(cell);
    }
}

function clickMe(event){
    console.log(event);
    event.target.style.backgroundColor = "red";
}

drawBoard();