var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var spacePressed = false;
var body;
var stopBomb = 0;
var timeout = 0;
var countBomb = 0;





function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}
	if (event.keyCode == 32) {

		spacePressed = 'space';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop + 3;

		var element = document.elementFromPoint(player.offsetLeft, newTop + 32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop - 3;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft - 3;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft + 3;

		var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}

	if (event.keyCode == 32) {
		spacePressed = true;
		setTimeout(shootArrow, 500);
	}
}


function clickStart() {
	var instructions = 'Left Arrow Key = Move Left Right Arrow Key = Move Right Up Arrow Key = Move Up Down Arrow Key = Move Down Space Key = Fire Arrow'

	alert(instructions);

	document.getElementsByClassName('gameover')[0].style.display = 'none';
	document.getElementsByClassName('playagin')[0].style.display = 'none';

	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);

	var start = document.getElementsByClassName('start')[0];
	start.style.display = 'none';

	var num = 4;
	for (var i = 0; i < num; i++) {
		showSpaceships();
	}
	stopBomb = setInterval(arrangeSpaceships, 3000);

}

function showSpaceships() {
	var spaceships = document.createElement('div');
	spaceships.classList = 'alien';
	body.appendChild(spaceships);
}

function arrangeSpaceships() {
	var aliens = document.getElementsByClassName('alien');
	for (var i = 0; i < aliens.length; i++) {
		var randomNum = Math.ceil(Math.random() * 100);
		aliens[i].style.top = 0;
		aliens[i].style.left = randomNum + 'vw';

		
		var bomb = document.createElement('div');
		bomb.classList = 'bomb';
		bomb.style.left = randomNum + 1.7 + 'vw';
		bomb.style.top = '93px';
		document.body.appendChild(bomb);
		countBomb++;
		document.getElementById('score').innerHTML = "Bomb-Count: " + countBomb;
		

		dropBomb(bomb);

	}
}

function dropBomb(bomb) {
	// document.getElementById('score').innerHTML = "Bomb-Count: " + countBomb;
	// var highScore = document.getElementsByClassName('score');
	// highScore.innerHTML = "Bomb-Count:" + countBomb; 
	var speed = Math.floor(Math.random() * 10)
	var sky = document.getElementsByClassName('sky')[0];
	var bombExplodes = Math.ceil(Math.random() * (window.innerHeight - sky.offsetHeight) + sky.offsetHeight);

	var bombLeft = bomb.offsetLeft;

	"// https://newbedev.com/javascript-range-between-two-numbers-code-example#:~:text=javascript%20range%20between%20two%20numbers%20code%20example%20Example,10%29%3B%20%2F%2F%20%5B5%2C%206%2C%207%2C%208%2C%209%2C%2010%5D"
	
	function range(beginning, end) {
		return Array.from({ length: end - beginning+ 1 }, (_, i) => beginning + i)
	}
	
	var wideRange = range(bombLeft - 20, bombLeft + 20);

	setInterval(function () {
		console.log('still shooting');
		var top = bomb.offsetTop;
		var position = document.elementFromPoint(bomb.offsetLeft, top + 1);
		// var position = document.elementFromPoint(bomb.offsetLeft, top + 1);
		
		bomb.style.top = top + 1 + 'px';
		
		if (position != null) {
			if (position.classList.contains('boundary')) {
				bomb.classList = 'explosion';
				bomb.style.top = top + 0 +  'px';

				var lives = document.getElementsByTagName('li');
				if (lives.length >= 1) {
					lives[0].remove();
				}

				if (lives.length < 1) {
					playerDies();
					// console.log('Console')
				}

				setTimeout(function () {
					bomb.remove();
				}, 1000)
			}
		}

		var arrowCrash = document.getElementsByClassName('arrow');
		console.log('crash');
		for(let i = 0; i < arrowCrash.length; i++) {
			var topOfArrow = arrowCrash[i].offsetTop;
			var leftOfArrow = arrowCrash[i].offsetLeft;
			if(top >= topOfArrow && wideRange.includes(leftOfArrow)) {
				bomb.remove();
				arrowCrash[i].remove();
				
			}
		}

		if (bombExplodes <= top) {
			bomb.classList = 'explosion';
			bomb.style.top = top + 0+  'px';
			setTimeout(function () {
				bomb.remove();
			}, 1000)
			// setTimeout(function() {
			// 	if(bomb.parentNode != null){
			// 		bomb.parentNode.removeChild(bomb);
			// 	}

			// }, 1000)
		}
	}, speed);
}
function playerDies() {
	
	document.getElementsByClassName('gameover')[0].style.display = '';
	document.getElementsByClassName('playagin')[0].style.display = '';

	var player = document.getElementById('player');
	// var start = document.getElementsByClassName('start')[0];

	document.removeEventListener('keyup', keyup);
	document.removeEventListener('keydown', keydown);
	clearInterval(timeout);
	clearInterval(stopBomb);

	player.classList = 'character stand dead';

	for (let i = 0; i < 3; i++) {
		var dead = document.createElement('div');
		gameOver(dead);
	}

	
	document.getElementsByClassName('playagin')[0].addEventListener('click', clickStart);
	document.getElementsByClassName('gameover')[0].addEventListener('click', gameOver);
}

function gameOver() {
	var spaceships = document.getElementsByClassName('alien');
	for (let i = 0; i < spaceships.length; i++) {
		spaceships[i].remove();
		console.log("Alien cleared")
	}
	var explosions = document.getElementsByClassName('explosion');
	for (let i = 0; i < explosions.length; i++) {
		explosions[i].remove();
		console.log("Explo cleared")
	}
	var bombs = document.getElementsByClassName('bomb');
	for (let i = 0; i < bombs.length; i++) {
		bombs[i].remove();
		console.log("BOMB cleared")
	}

}

function newGamelives(){
	

	var health = document.getElementsByClassName('health')[0];

	for (let i = 0; i < 3; i++) {
		var life = document.createElement('li');
		health.append(life);
	}

}
	
	
function score(){
	var score = document.createElement('div');
	score.classList = 'score';
	score.style.position = 'absolute';
	score.style.alignItems = 'center'
	score.style.justifyContent = 'center'
	score.style.top = 20 + '%';
	score.style.left = 37 + '%';
	score.style.width = 25 + 'vw';
	score.style.height  = 10 + 'vw';
	score.style.borderRadius = 20 + 'px';
	score.style.backgroundColor = 'blue';
	score.style.color = 'white';
	score.style.fontSize = 20 + 'px';
	score.style.fontWeight = 50 + 'px';
	score.style.paddingTop = 90 + 'px';
	score.style.paddingLeft = 25 + 'px';
	

	document.getElementsByClassName('gameover')[0].style.display = 'none';
	document.getElementsByClassName('playagin')[0].style.display = 'none';
	document.getElementById('score').style.display = 'none';
	
	console.log('highscore')
	body.appendChild(score);

	// var username = prompt("Please input your name to get a high score");

	showHighscore();
}



function showHighscore(){
	var highScore = localStorage.getItem('highscore');
	if(highScore || countBomb > parseInt(highScore)){
		localStorage.setItem('highscore', countBomb);
	}
	var username = prompt ('Please enter a username');

	if (username != null){
		document.getElementsByClassName('score')[0].innerHTML = username + ' Thanks For playing Kill Bill !!!' + ' your high score is '  + countBomb * 100;
	}
}

function shootArrow() {
	var arrow = document.createElement('div');
	var player = document.getElementById('player');

	arrow.classList = 'arrow up';
	arrow.style.top = player.offsetTop + 'px';
	arrow.style.left = player.offsetLeft + 'px';
	body.appendChild(arrow);
	player.classList = 'character stand up fire';

	var top = arrow.offsetTop;
	setInterval(function () {
		arrow.style.top = top-- + 'px';
	}, 5);

	// setInterval(function () {
	// 	var top = arrow.offsetTop;
	// 	var position = document.elementFromPoint(arrow.offsetLeft, top + 1);

	// 	arrow.style.top = top + 1 + 'px';

	// }
	
}




function myLoadFunction() {
	var start = document.getElementsByClassName('start')[0];
	start.addEventListener('click', clickStart);
	// timeout = setInterval(move, 10);
	// document.addEventListener('keydown', keydown);
	// document.addEventListener('keyup', keyup);
	body = document.getElementsByTagName('body')[0];


	document.getElementsByClassName('gameover')[0].style.display = 'none';
	document.getElementsByClassName('playagin')[0].style.display = 'none';

	document.getElementsByClassName('playagin')[0].addEventListener('click', newGamelives);
	document.getElementsByClassName('gameover')[0].addEventListener('click', score);
}



document.addEventListener('DOMContentLoaded', myLoadFunction);