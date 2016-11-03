// ----------------Business Logic ---------------
function Player(mark, turn) {
  this.mark = mark;
  this.turn = turn;
}

var playerX = new Player("X", true);
var playerO = new Player("O", false);
var positions = ["", "", "", "", "", "", "", "", "",];
var winningPatterns = [];

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
    winningPatterns.push(0,1,2);
    return positions[0] + " Wins!";
  }
  //checks to see if there is three in a row in row2
  else if(positions[3] === positions[4]
  && positions[3] === positions[5]
  && positions[3] !== "") {
    winningPatterns.push(3,4,5);
    return positions[3] + " Wins!";

  }
  //checks to see if there is three in a row in row3
  else if(positions[6] === positions[7]
  && positions[6] === positions[8]
  && positions[6] !== "") {
    winningPatterns.push(6,7,8);
    return positions[6] + " Wins!";
  }
  // Checks to see if there is three in a row in col1
  else if(positions[0] === positions[3]
  && positions[0] === positions[6]
  && positions[0] !== "") {
    winningPatterns.push(0,3,6);
    return positions[0] + " Wins!";
  }
  // Checks to see if there is three in a row in col2
  else if(positions[1] === positions[4]
  && positions[1] === positions[7]
  && positions[1] !== "") {
    winningPatterns.push(1,4,7);
    return positions[1] + " Wins!";
  }
  // Checks to see if there is three in a row in col3
  else if(positions[2] === positions[5]
  && positions[2] === positions[8]
  && positions[2] !== "") {
    winningPatterns.push(2,5,8);
    return positions[2] + " Wins!";
  }

  // Checks to see if there is three in a row in diagonally going left
  else if(positions[0] === positions[4]
  && positions[0] === positions[8]
  && positions[0] !== "") {
    winningPatterns.push(0,4,8);
    return positions[0] + " Wins!";
  }
  // Checks to see if there is three in a row in diagonally going right
  else if(positions[2] === positions[4]
  && positions[2] === positions[6]
  && positions[2] !== "") {
    winningPatterns.push(2,4,6);
    return positions[2] + " Wins!";
  }
  else if(draw(positions).length > 8) {
    return "Draw....";
  }
}

function draw(arrayPositions) {
  var string = "";
  arrayPositions.forEach(function(position){
    string+=position;
  });
  return string;
}

function easyComputer() {
  var desiredPosition = Math.floor(Math.random() * 8);
  while(positions[desiredPosition].length !== 0) {
    desiredPosition = Math.floor(Math.random() * 8);
  }
  return desiredPosition;
}


//Look through array and see if there are two or more in the same row
fakeGame = ["","x","x","","","","","",""];
console.log(winRow(fakeGame, "x"));
function winRow(array, marker) {
  var row1 = 0, row2 = 0, row3 = 0;
  var desiredPosition = 0;
  for(var i = 0; i<array.length;i++){
    if(i < 3 && array[i] === marker) {
      row1++;
      if(row1 > 1) {
        for(var j=0; j<3;j++) {
          if(array[j].length === 0) {
            desiredPosition = j;
          }
        }
      }
    }
  }
  return desiredPosition;
}

function hardComputer() {

}






// ------------------- User Logic ------------------
$(function() {
  var squares = ["square0", "square1", "square2", "square3", "square4", "square5", "square6", "square7", "square8"];
  $("#turn").text("It is " + displayTurn() + "\'s turn");
  squares.forEach(function(square) {
    var squareNumber = square.charAt(6);
    $("#" +  square).one("click", function() {
      var mark = playerTurn();
      $("#" +  square).find('p').text(mark);
      $('#'+square).find('p').hide();
      $('#'+square).find('p').fadeIn(1000);
      $("#turn").text("It is " + displayTurn() + "\'s turn");
      positions[squareNumber] = mark;
      console.log(checkWin());
      if(checkWin()) {
        squares.forEach(function(square) {
         $("#" +  square).off("click");
        });
        winningPatterns.forEach(function(pattern) {
          $('#square'+pattern).addClass('highlight');
        });
        $("#turn").text(checkWin());
        computer = false;
      }
    if(computer) {
      var mark = playerTurn();
      if(difficult) {
        var computerPosition = hardComputer();
      }
      else {
        var computerPosition = easyComputer();
      }
      $('#square'+computerPosition).find('p').text(mark);
      $('#square'+computerPosition).find('p').hide();
      $('#square'+computerPosition).find('p').fadeIn(1000);
      $("#turn").text("It is " + displayTurn() + "\'s turn");
      positions[computerPosition] = mark;
      if(checkWin()) {
        squares.forEach(function(square) {
         $("#" +  square).off("click");
        });
        winningPatterns.forEach(function(pattern) {
          $('#square'+pattern).addClass('highlight');
        });
        $("#turn").text(checkWin());
      }
    }
    });
  });

  $('#player1').click(function() {
    $('#difficulty').fadeIn(1000);
    $('#playerSelect').hide();
    computer = true;
  });
  $('#player2').click(function() {
    $('#board').fadeIn(1000);
    $('#playerSelect').hide();
  });
  $('#easy').click(function() {
    $('#board').fadeIn(1000);
    $('#welcome').hide();
    difficult = false;
  });
  $('#hard').click(function() {
    $('#board').fadeIn(1000);
    $('#welcome').hide();
    difficult = true;
  });
});
