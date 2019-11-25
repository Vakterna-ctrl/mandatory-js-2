function Player(letter, myTurn){
  this.letter = letter;
  this.myTurn = myTurn;
  this.occupiedSquare = [];
  this.won = false
}
let winPattern = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
let endtext;
let player = new Player("X", true);
let opponent = new Player("O", false);
let square = document.querySelectorAll(".square");
let end = document.querySelector(".end");
let startButton = document.querySelector(".startButton");
let start = document.querySelector(".start")

startButton.addEventListener('click',function(){
  start.style.display = "none"
  gameOn(player,opponent);
});
function gameOn(player,opponent){
for(let sq of square){
 sq.addEventListener('click',function(){
  if(sq.textContent === ""){
    if(player.myTurn === true){
      sq.textContent = player.letter;
      player.myTurn = false;
      opponent.myTurn = true;
      player.occupiedSquare.push(sq.id*1)
      winner(player);
    }else{
      sq.textContent = opponent.letter;
      player.myTurn = true;
      opponent.myTurn = false;
      opponent.occupiedSquare.push(sq.id*1)
      winner(opponent);
    }
}
tie(player,opponent);
})
}
}
function tie(player,opponent){
  if(player.occupiedSquare.length + opponent.occupiedSquare.length === 9 && player.won === false && opponent.won === false){
    end.style.display = "block";
    endtext = document.createElement('p');
    endtext.textContent = "It's a tie";
    end.appendChild(endtext);
  }
}
function winner(player){
  if(player.occupiedSquare.length >= 3){
  for (var i = 0; i < winPattern.length; i++) {
    const found = winPattern[i].every(element => player.occupiedSquare.indexOf(element) >= 0);
    if(found === true){
      end.style.display = "block";
      endtext = document.createElement('p');
      endtext.textContent = player.letter + " has won the game";
      player.won = true;
      end.appendChild(endtext);
    }
  }
}
}
let restartButton = document.querySelector('.restart')
restartButton.addEventListener('click',function(e){
  e.preventDefault();
  for(let sq of square){
  sq.textContent ="";
}
  player.won = false;
  opponent.won = false;
  player.occupiedSquare =[];
  opponent.occupiedSquare =[];
  end.style.display = "none";
  end.removeChild(endtext);
})
