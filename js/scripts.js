// ----------------Business Logic ---------------
function Player(mark, turn) {
  this.mark = mark;
  this.turn = turn;
}

// Player.prototype.mark = function () {
//   return this.mark;
// };

var playerX = new Player("X", true);
var playerO = new Player("O", false);
var positions = ["", "", "", "", "", "", "", "", "",];

function playerTurn() {
  if(playerX.turn) {
    playerX.turn = false;
    playerO.turn = true;
    return playerX.mark;
  }
  else {
    playerX.turn = true;
    playerO.turn = false;
    return playerO.mark;
  }
}

function displayTurn() {
  if(playerX.turn) {
    return playerX.mark;
  }
  else {
    return playerO.mark;
  }
}

function checkWin() {
  //checks to see if there is three in a row in row1
  if(positions[0] === positions[1]
  && positions[0] === positions[2]
  && positions[0] !== ""){
    return positions[0] + " Wins!";
  }
  //checks to see if there is three in a row in row2
  else if(positions[3] === positions[4]
  && positions[3] === positions[5]
  && positions[3] !== "") {
    return positions[3] + " Wins!";
  }
  //checks to see if there is three in a row in row3
  else if(positions[6] === positions[7]
  && positions[6] === positions[8]
  && positions[6] !== "") {
    return positions[6] + " Wins!";
  }
  // Checks to see if there is three in a row in col1
  else if(positions[0] === positions[3]
  && positions[0] === positions[6]
  && positions[0] !== "") {
    return positions[0] + " Wins!";
  }
  // Checks to see if there is three in a row in col2
  else if(positions[1] === positions[4]
  && positions[1] === positions[7]
  && positions[1] !== "") {
    return positions[1] + " Wins!";
  }
  // Checks to see if there is three in a row in col3
  else if(positions[2] === positions[5]
  && positions[2] === positions[8]
  && positions[2] !== "") {
    return positions[2] + " Wins!";
  }

  // Checks to see if there is three in a row in diagonally going left
  else if(positions[0] === positions[4]
  && positions[0] === positions[8]
  && positions[0] !== "") {
    return positions[0] + " Wins!";
  }
  // Checks to see if there is three in a row in diagonally going right
  else if(positions[2] === positions[4]
  && positions[2] === positions[6]
  && positions[2] !== "") {
    return positions[2] + " Wins!";
  }
  else if(draw(positions).length > 8) {
    return "draw";
  }
}

function draw(arrayPositions) {
  var string = "";
  arrayPositions.forEach(function(position){
    string+=position;
  });
  return string;
}



// ------------------- User Logic ------------------
$(function() {
  var squares = ["square0", "square1", "square2", "square3", "square4", "square5", "square6", "square7", "square8"];
  $("#turn").text(displayTurn() + "\'s ")
  squares.forEach(function(square) {
    var squareNumber = square.charAt(6);
    $("#" +  square).one("click", function() {
      var mark = playerTurn();
      $("#" +  square).text(mark);
      $("#turn").text(displayTurn() + "\'s ");
      positions[squareNumber] = mark;
      console.log(checkWin());
      if(checkWin()) {
        squares.forEach(function(square) {
         $("#" +  square).off("click");
       });
     }
      console.log(positions);
      console.log(draw(positions));
    })
  });
})
