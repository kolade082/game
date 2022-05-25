var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var spacePressed = false;
var body;

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
	if(event.keyCode == 32) {
		
		spacePressed = 'space';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop+3;

		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
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
		var newTop = positionTop-3;

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
		var newLeft = positionLeft-3;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft+3;
		
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
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

	if(event.keyCode == 32) {
		spacePressed = true;
		setTimeout(shootArrow, 500);
	} 
}

var stopBomb = 0;

function clickStart() {
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
	for(var i = 0; i < aliens.length; i++) {
		var randomNum = Math.ceil(Math.random()*100);
		aliens[i].style.top = 0;
		aliens[i].style.left = randomNum + 'vw';

		var bomb = document.createElement('div');
		bomb.classList = 'bomb';
		bomb.style.left = randomNum+1.7 + 'vw';
		bomb.style.top = '93px';
		document.body.appendChild(bomb);

		dropBomb(bomb);

	}
}
function dropBomb(bomb) {
	var top = bomb.offsetTop;
	var speed = Math.ceil(Math.random()*10)

	setInterval(function(){
		var sky = document.getElementsByClassName('sky')[0];
		var player = document.getElementById('player');
		var bombExplodes = Math.ceil(Math.random() * 700) + 517;
		if(top > sky.offsetHeight){
			bomb.classList ='explosion';
			var position = document.elementFromPoint(player.offsetLeft, player.offsetTop);

			if (position.classList.contains('explosion')){
		
				playerDies ();
			}

			setTimeout(function() {
				if(bomb.parentNode != null){
					bomb.parentNode.removeChild(bomb);
				}
				
			}, 1000)
		}
		else{
			bomb.style.top = top++ + 'px';
		}
	}, speed);
}
var timeout = 0;
function playerDies(){
	var player = document.getElementById('player');
	var start = document.getElementsByClassName('start')[0];


	document.removeEventListener('keyup', keyup);
	document.removeEventListener('keydown', keydown);
	clearInterval(timeout);
	clearInterval(stopBomb);

	player.classList = 'character stand dead';
	start.style.display = 'block';
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
	setInterval(function() {
		arrow.style.top = top-- + 'px';
	}, 5);
}




function myLoadFunction() {
	var start = document.getElementsByClassName('start')[0];
	start.addEventListener('click', clickStart);
	// timeout = setInterval(move, 10);
	// document.addEventListener('keydown', keydown);
	// document.addEventListener('keyup', keyup);
	body = document.getElementsByTagName('body')[0];
}



document.addEventListener('DOMContentLoaded', myLoadFunction);