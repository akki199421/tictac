/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
let grid = [];
const GRID_LENGTH = 4;
let turn = 'X';
let moves_made = 0;
let gameState = 'ongoing';
let winner = null;

function initializeGrid() {
    grid = [];
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function resetGrid(){
  
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
    gameState = "ongoing";
    winner = null;
    //flash message
    flashMessage('grid reset')
} 

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    if(gameState === "ongoing"){
        //only do the whole logic if game is ongoing
        var rowIdx = this.getAttribute("rowIdx");
        var colIdx = this.getAttribute("colIdx");
        //check if the move is valid
        if(grid[colIdx][rowIdx] === 0){  let newValue = 1;
            grid[colIdx][rowIdx] = newValue;
            moves_made++;
            renderMainGrid();
            addClickHandlers();
            if(!checkForWin(colIdx, rowIdx)){
                //if there was no winner or draw, then go to next move
                decideNextMove();
            }
        }
      
    }
    else{
        //it's either a draw or somebody has won
        if(confirm(`It was a ${gameState === "draw" ? 'draw' : `win for the ${winner}`}, do you wana try again?`)){
            resetGrid();
        }   
    }
}

function checkForWin(c, r){
    let colIdx = parseInt(c);
    let rowIdx = parseInt(r);
    //check if somebody has won or the game has been a draw
    if(colIdx === rowIdx){
        //it's a diagonal click
        let s = grid[0][0];
        let sCount = 1;
        for(let i = 1; i < GRID_LENGTH; i++){
            if(s && grid[i][i] === s){
                sCount++;
            }
            if(sCount === GRID_LENGTH){
                flashWin(s);
                return true;
            }    
        }
       
    }
     //for the second diag
    if((colIdx + rowIdx) === (GRID_LENGTH - 1)){

        let s = grid[0][GRID_LENGTH - 1];
        let sCount = 1;
        for(let i = 1, j = GRID_LENGTH - 2; i <GRID_LENGTH -1, j>=0; i++, j--){
            if(s && s === grid[i][j]){
                sCount++;
            }
            if(sCount === GRID_LENGTH){
                flashWin(s);
                return true;
            }   
        }
    }
    //for the columns and rows
    for(let i = 0; i < GRID_LENGTH; i++){
        let s1 = grid[i][0];
        let s2 =  grid[0][i];
        let s1Count = 1;
        let s2Count = 1;
        for(let j = 1; j<GRID_LENGTH; j++){
            if(s1 && s1 === grid[i][j])
                s1Count++;
            if(s2 && s2 === grid[j][i])
                s2Count++;
        }
        if(s1Count === GRID_LENGTH){
            flashWin(s1);
            return true;
        }
        if(s2Count === GRID_LENGTH){
            flashWin(s2)
            return true;
        }
    }
    if(moves_made === (GRID_LENGTH * GRID_LENGTH)){
        flashMessage("It's a draw", 'red');
        gameState = "draw";
        return true;
    }
    return false;
}


function flashWin(s){
   
        //somebody won
        if(s === 1){
            flashMessage('Player Won', 'green');
            winner = 'Player'
        }
        else if (s === 2) {
            flashMessage('Computer won', 'red')
            winner = 'Computer';
        }     
        gameState = "win"
}

function decideNextMove(){
    let turn = 'O';
    //predict next possible line points and use some sort of really clever algo
    //not now though

    
    //get all empty columns
    let empty = [];
    for(let i = 0; i < GRID_LENGTH; i++){
        for(let j = 0; j<GRID_LENGTH; j++){
            if(grid[i][j] === 0){
                empty.push([i,j])
            }
        }
    }
    let oCell = parseInt(Math.random() * empty.length);
    //mark the new cell
    grid[empty[oCell][0]][empty[oCell][1]] = 2;
    moves_made++;
    renderMainGrid();
    addClickHandlers();
    checkForWin(empty[oCell][0], empty[oCell][1])
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
    document.getElementById("reset").addEventListener("click", resetGrid, false)
}


function flashMessage(msg, type){
    let messageId = document.getElementById('flash');
    messageId.innerHTML = msg;
    let classes = [];
    classes.push('show');
    if(type === "red"){
        classes.push('red');
    }
    if(type === "green"){
        classes.push('green');
    }
    messageId.classList.add(...classes)
    
    setTimeout(function(e){
        messageId.classList.remove(...classes);
    }, 3000)
}

initializeGrid();
renderMainGrid();
addClickHandlers();

