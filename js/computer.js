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
function winRow(array, marker) {
  var row1 = 0, row2 = 0, row3 = 0;
  var desiredPosition;
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
    else if(i < 6 && i >= 3 && array[i] === marker) {
      row2++;
      if(row2 > 1) {
        for(var j=3; j<6;j++) {
          if(array[j].length === 0) {
            desiredPosition = j;
          }
        }
      }
    }
    else if(i < 9 && i >= 6 && array[i] === marker) {
      row3++;
      if(row3 > 1) {
        for(var j=6; j<9;j++) {
          if(array[j].length === 0) {
            desiredPosition = j;
          }
        }
      }
    }
  }
  return desiredPosition;
}

function winCol(array, marker) {
  var col1 = 0, col2 = 0, col3 = 0;
  var desiredPosition;
  for(var i = 0; i<array.length;i++){
    if(i % 3 === 0 && array[i] === marker) {
      col1++;
      if(col1 > 1) {
        for(var j=0; j<9;j+=3) {
          if(array[j].length === 0) {
            desiredPosition = j;
          }
        }
      }
    }
    else if(i % 3 === 1 && array[i] === marker) {
      col2++;
      if(col2 > 1) {
        for(var j=1; j<9;j+=3) {
          if(array[j].length === 0) {
            desiredPosition = j;
          }
        }
      }
    }
    else if(i % 3 === 2 && array[i] === marker) {
      col3++;
      if(col3 > 1) {
        for(var j=2; j<9;j+=3) {
          if(array[j].length === 0) {
            desiredPosition = j;
          }
        }
      }
    }
  }
  return desiredPosition;
}

function winDiag(array, marker) {
  var desiredPosition;
    if(array[4] === marker) {
      if(array[4] === array[8] && array[0].length === 0) {
        desiredPosition = 0;
      }
      else if(array[4] === array[0] && array[8].length === 0) {
        desiredPosition = 8;
      }
      else if(array[4] === array[2] && array[6].length === 0) {
        desiredPosition = 6;
      }
      else if(array[4] === array[6] && array[2].length === 0) {
        desiredPosition = 2;
      }
    }
  return desiredPosition;
}

function takeMiddle(array) {
  var desiredPosition;
  if(array[4].length === 0) {
    desiredPosition = 4;
  }
  return desiredPosition;
}

function takeCorner(array) {
  var desiredPosition;
  var spotsTaken = "";
  array.forEach(function(spot) {
    spotsTaken+=spot;
  })
  if(array[4].length !== 0 && spotsTaken.length === 1)  {
    desiredPosition = 0;
  }
  return desiredPosition;
}


function hardComputer(array, computerMark, playerMark) {
  if(winRow(array, computerMark)|| winRow(array, computerMark) === 0) {
    return winRow(array, computerMark);
  }
  else if (winCol(array, computerMark) || winCol(array, computerMark) === 0) {
    return winCol(array, computerMark);
  }
  else if(winDiag(array, computerMark) || winDiag(array, computerMark) === 0) {
    return winDiag(array, computerMark);
  }
  else if(winRow(array, playerMark) || winRow(array, playerMark) === 0) {
    return winRow(array, playerMark);
  }
  else if (winCol(array, playerMark) || winCol(array, playerMark) === 0) {
    return winCol(array, playerMark);
  }
  else if(winDiag(array, playerMark) || winDiag(array, playerMark) === 0) {
    return winDiag(array, playerMark);
  }
  else if(takeMiddle(array)) {
    return takeMiddle(array);
  }
  else if(takeCorner(array) || takeCorner(array) ===  0) {
    return takeCorner(array);
  }
  else {
    return easyComputer();
  }
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
        var computerPosition = hardComputer(positions, "O", "X");
      }
      else {
        var computerPosition = easyComputer();
      }
      $('#square'+computerPosition).find('p').text(mark);
      $('#square'+computerPosition).find('p').hide();
      $('#square'+computerPosition).find('p').fadeIn(1000);
      $("#turn").text("It is " + displayTurn() + "\'s turn");
      positions[computerPosition] = mark;
      $("#square"+computerPosition).off("click");
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
    computer = false;
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
