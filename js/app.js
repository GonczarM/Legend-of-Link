//init canvas
canvas = document.getElementById('zelda');
ctx = canvas.getContext('2d');

//global variablesws
const tileW = 50;
const tileH = 50;
const mapW = 17;
const mapH = 12;
const Overworld = document.getElementById("overworld");
const gameOverMusic = document.getElementById("lose");
const intro = document.getElementById("intro");
const gameWon = document.getElementById("win");
const map = [
	5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,
	4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
	4,0,10,10,0,0,0,0,0,0,0,0,0,10,10,0,2,
	9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
	4,0,0,0,0,0,0,10,10,10,0,0,0,0,0,0,2,
	4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
	4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
	4,0,0,0,0,0,0,10,10,10,0,0,0,0,0,0,2,
	4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
	4,0,10,10,0,0,0,0,0,0,0,0,0,10,10,0,2,
	4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
	8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,
];

//classes
class Sprite {
	constructor(picture){
		this.image = new Image();
		this.image.src = picture; 		
	}
	draw(x, y){
		ctx.drawImage(this.image, x, y, tileW, tileH);		
	}
};

class Enemy {
	constructor(x, y, id, picture){
		this.alive = true;
		this.speed = 5;
		this.image = new Image();
		this.image.src = picture;
		this.id = id
		this.x = x;
		this.y = y;
	}
	draw(x, y){
		ctx.drawImage(this.image, this.x, this.y, tileW, tileH);		
	}
	move(){
		this.y = this.y + this.speed;
 		this.x = this.x + this.speed;
	}
	checkCollisionWall(){
	  if(this.y < tileH){
	  	this.speed = -this.speed
	  }
	  if(this.x + tileW > canvas.width - tileW){
	  	this.speed = -this.speed
	  }
	  if(this.y + tileH > canvas.height - tileH){
	  	this.speed = -this.speed
	  }
	  if(this.x + this.speed < tileH){
	  	this.speed = -this.speed
	  }	  
	}
	die(){
		this.alive = false;
		this.x = 17*tileW;
		this.y = 0;
	}
}

//creating objects from classes
const backWall = new Sprite("images/backWall.png");
const frontWall = new Sprite("images/frontWall.png");
const leftWall = new Sprite("images/leftWall.png");
const rightWall = new Sprite("images/rightWall.png");
const door = new Sprite("images/door.png");
const floor = new Sprite("images/floor.png");
const bottomLeft = new Sprite("images/bottomLeft.png");
const bottomRight = new Sprite("images/bottomRight.png");
const topRight = new Sprite("images/topRight.png");
const topLeft = new Sprite("images/topLeft.png");
const wall = new Sprite("images/wall.png");
const swordUp = new Sprite("images/sword up.png");
const swordDown = new Sprite("images/sword down.png");
const swordLeft = new Sprite("images/sword left.png");
const swordRight = new Sprite("images/sword right.png");
const linkForward = new Sprite("images/link forward.png");
const linkBackward = new Sprite("images/link backward.png");
const linkLeft = new Sprite("images/link left.png");
const linkRight = new Sprite("images/link right.png");
const attackForward = new Sprite("images/attackForward.png");
const attackBackward = new Sprite("images/attackBackward.png");
const attackLeft = new Sprite("images/attackLeft.png");
const attackRight = new Sprite("images/attackRight.png");

//player object
const player = {
	x: tileW*1,
	y: tileH*3,
	unsheath: false,
	speed: 3.5,
	attackTime: 1,
	direction: {
    up: false,
    down: false,
    left: false,
    right: false		
	},
	orientation: {
		up: false,
    down: true,
    left: false,
    right: false		
	},
	draw(){
		if(this.orientation.up === true){
			linkBackward.draw(this.x, this.y) 
		}
    if(this.orientation.left === true){
    	linkLeft.draw(this.x, this.y)
   	}
    if(this.orientation.right === true){
    	linkRight.draw(this.x, this.y)
    }
    if(this.orientation.down === true){
			linkForward.draw(this.x, this.y)
		}
	},
	move(){
		if(this.direction.up){
			this.orientation.up = true
			this.orientation.down = false
			this.orientation.left = false
			this.orientation.right = false
			this.y -= this.speed;
		}
    if(this.direction.left){
    	this.orientation.left = true
    	this.orientation.down = false
    	this.orientation.right = false
    	this.orientation.up = false
   	  this.x -= this.speed;
   	}
    if(this.direction.right){
    	this.orientation.right = true
    	this.orientation.down = false
    	this.orientation.left = false
    	this.orientation.up = false
    	this.x += this.speed;
    }
    if(this.direction.down){
    	this.orientation.down = true
    	this.orientation.left = false
    	this.orientation.right = false
    	this.orientation.up = false
  		this.y += this.speed; 
  	} 
	},
	startDirection(key){
    if(key == 'w' || key == 'upPress') this.direction.up = true;
    if(key == 'a' || key == 'leftPress') this.direction.left = true;
    if(key == 's' || key == 'downPress') this.direction.down = true;
    if(key == 'd' || key == 'rightPress') this.direction.right = true;
	},
  stopDirection(key) {
    if(key == 'w' || key == 'upRelease') this.direction.up = false;
    if(key == 'a' || key == 'leftRelease') this.direction.left = false;
    if(key == 's' || key == 'downRelease') this.direction.down = false;
    if(key == 'd' || key == 'rightRelease') this.direction.right = false;
  },
  //change sword to seperate sprite for one collision detection
  attack(enemy){
		if(this.orientation.up == true && this.unsheath == true){
			attackBackward.draw(this.x, this.y)
			swordUp.draw(this.x, this.y - tileH)
			if(
				this.y - tileH < enemy.y + tileH &&
				this.y + tileH > enemy.y &&
				this.x < enemy.x + tileW &&
				this.x + tileW > enemy.x
				){
				enemyhit.play();
				enemy.die();
				deadGhosts.push(enemy) 
			}
		}
		if(this.orientation.left == true && this.unsheath == true){
			attackLeft.draw(this.x, this.y)
			swordLeft.draw(this.x - tileW, this.y)
			if(
				this.x - tileW < enemy.x + tileW &&
				this.y + tileH > enemy.y &&
				this.x > enemy.x &&
				this.y < enemy.y + tileH
				){
				enemyhit.play();
				enemy.die();
				deadGhosts.push(enemy);
			}
		}
		if(this.orientation.right == true && this.unsheath == true){
			attackRight.draw(this.x, this.y)
			swordRight.draw(this.x + tileW, this.y)
			if(
				this.x + (2*tileW) > enemy.x &&
				this.x + tileW < enemy.x + tileW &&
				this.y + tileH > enemy.y &&
				this.y < enemy.y + tileH
				){
				enemyhit.play();
				enemy.die();
				deadGhosts.push(enemy);
			}
		}
		if(this.orientation.down == true && this.unsheath == true){
			attackForward.draw(this.x, this.y)
			swordDown.draw(this.x, this.y + tileH)
			if(
				this.y + (2*tileH) > enemy.y &&
				this.x < enemy.x + tileW &&
				this.x + tileW > enemy.x &&
				this.y + tileH < enemy.y + tileH
				){
				enemyhit.play();
				enemy.die();
				deadGhosts.push(enemy);
			}
		}			   	
  },
  startAttack(key){
  	if(key == ' ' || key == 'attack'){
  		this.unsheath = true;
  	}
  	this.timerHandle = setInterval(() => {
  		this.attackTime--
  		if(this.attackTime <= 0){
  			this.stopAttack();
  		}
  	}, 1000)
  },
  stopAttack(key){
  	this.unsheath = false;
  },
  checkCollisionWall(){
  	if(this.y < tileH){
  		this.y += 3;
  	}
  	if(this.x + tileW > canvas.width - tileW){
  		this.x -= 3
  	}
  	if(this.y + tileH > canvas.height - tileH){
  		this.y -= 3;
  	}
  	if(this.x + this.speed < tileH){
  		this.x += 3;
  	}
  },
  checkCollisionEnemy(enemy) {
  	if(
  		this.x + tileW > enemy.x &&
  		this.x < enemy.x + tileW &&
  		this.y + tileH > enemy.y &&
  		this.y < enemy.y + tileH
  	){
  		return true;
  	}
  	else{
  		return false;
  	}
  },
}

//enemies spawn, array and creation
const spawnPoints = [
	[3*tileW, 3*tileH],
	[7*tileW, 3*tileH],
	[11*tileW, 3*tileH],
	[15*tileW, 3*tileH],
	[3*tileW, 10*tileH],
	[7*tileW, 10*tileH],
	[11*tileW, 10*tileH],
	[13*tileW, 10*tileH],
	];

const ghosts = [];
const deadGhosts = [];

function createEnemies(){
 	for(let i = 0; i < spawnPoints.length; i++){
 		ghosts[i] = new Enemy(spawnPoints[i][0],
 		spawnPoints[i][1], i, "images/enemies.png")
 	}
}
createEnemies();

// drawing the canvas board and clearing it
function drawGame(){
	mapIndex = 0;
	for(let y = 0; y < mapH;y++){
		for(let x = 0; x < mapW;x++, mapIndex++){
			let tileX = x*tileW;
			let tileY = y*tileH;
			let tileType = map[mapIndex];
			if(tileType === 1){
				backWall.draw(tileX, tileY);
			}
			if(tileType === 8){
				bottomLeft.draw(tileX, tileY);
			}
			if(tileType === 7){
				bottomRight.draw(tileX, tileY);
			}
			if(tileType === 9){
				door.draw(tileX, tileY);
			}
			if(tileType === 0){
				floor.draw(tileX, tileY);
			}
			if(tileType === 3){
				frontWall.draw(tileX, tileY);
			}
			if(tileType === 4){
				leftWall.draw(tileX, tileY);
			}
			if(tileType === 2){
				rightWall.draw(tileX, tileY);
			}
			if(tileType === 5){
				topLeft.draw(tileX, tileY);
			}
			if(tileType === 6){
				topRight.draw(tileX, tileY);
			}
			if(tileType === 10){
				wall.draw(tileX, tileY);
			}
		}
	}
};

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
} 

// loop for game
function animate() {
	for(let i = 0; i < ghosts.length; i++){
		ghosts[i].move();
	}
	clearCanvas();
	drawGame();
	player.draw();
	player.move();
	for(let i = 0; i < ghosts.length; i++){
		player.attack(ghosts[i]);
	}
	for(let i = 0; i < ghosts.length; i++){
		if (ghosts[i].alive) {
			ghosts[i].draw();
		}
	}
	for(let i = 0; i < ghosts.length; i++){
		ghosts[i].checkCollisionWall();
	}
	player.checkCollisionWall();
	for(let i = 0; i < ghosts.length; i++){
		if(player.checkCollisionEnemy(ghosts[i])){
			gameOver();
			return;
		}
	}
	if(deadGhosts.length >= 8){
		youWin();
		return;
	}
	window.requestAnimationFrame(animate);
}
animate();

//the end of the game screens
function gameOver() {
	$('#zelda').hide()
  $('.lose').show();
  overworld.pause();
  gameOverMusic.play();
	$("#on, #start").prop("disabled", false);
  $('#start, #on').on('click touchstart', (event) => {
		location.reload();
	})
}

function youWin(){
	$('#zelda').hide()
	$('.win').show();
	overworld.pause();
	gameWon.play();	
	$("#on, #start").prop("disabled", false);
  $('#start, #on').on('click touchstart', (event) => {
		location.reload();
	})
}

// event listeners

$("#start, #up, #down, #left, #right, #attack").prop("disabled", true);

$('#on').on('click touchstart', (event) => {
	$('.screenOff').hide();
	$('.intro').show();
	$("#on").prop("disabled", true);
	$("#start").prop("disabled", false);
	intro.play();
});

$('#start').on('click touchstart', (event) => {
	$('.intro').hide();
	$('#zelda').show();;
	$("#start").prop("disabled", true);
	$("#up, #down, #left, #right, #attack").prop("disabled", false);
	intro.pause();
	overworld.play();
});

$(document).on('keydown', (event) => {
	if(['w', 'a', 's', 'd'].includes(event.key)) {
    player.startDirection(event.key)
    player.stopAttack();
  }
});

$(document).on('keyup', (event) => {
  if(['w', 'a', 's', 'd'].includes(event.key)) {
    player.stopDirection(event.key)
  }
});

$("#up").on('touchstart', (event) => {
	const upPress = 'upPress'
	player.startDirection(upPress)
	player.stopAttack()
})

$("#down").on('touchstart', (event) => {
	const downPress =  'downPress'
	player.startDirection(downPress)
	player.stopAttack()
})

$("#left").on('touchstart', (event) => {
	const leftPress = 'leftPress'
	player.startDirection(leftPress)
	player.stopAttack()
})

$("#right").on('touchstart', (event) => {
	const rightPress = 'rightPress'
	player.startDirection(rightPress)
	player.stopAttack()
})

$("#up").on('touchend', (event) => {
	const upRelease = 'upRelease'
	player.stopDirection(upRelease)
})

$("#down").on('touchend', (event) => {
	const downRelease = 'downRelease'
	player.stopDirection(downRelease)
})

$("#left").on('touchend', (event) => {
	const leftRelease = 'leftRelease'
	player.stopDirection(leftRelease)
})

$("#right").on('touchend', (event) => {
	const rightRelease = 'rightRelease'
	player.stopDirection(rightRelease)
})

$("#attack").on('touchstart', (event) => {
	const attack = 'attack'
	if(!player.unsheath) {
		player.startAttack(attack)
	}
})

$("#attack").on('touchstop', (event) => {
		const sheath = 'sheath'
		player.stopAttack(sheath)
})

$(document).on('keydown', (event) => {
	if([' '].includes(event.key)) {
		if (!player.unsheath) {
	    player.startAttack(event.key)
		} 
  }
});

$(document).on('keyup', (event) => {
  if([' '].includes(event.key)) {
    player.stopAttack(event.key)
  }
});

$(document).on('keydown', (e) => {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

$(document).ready(function(){
	typeWriter();
})

let i = 0;
const txt = "Welcome to Gonczar's own Gamer Boy Emulator, if you're using a computer press the WASD keys to move Link around the screen and space bar to have him attack. If you're using a phone the four control and A buttons will do the same. To play Legend of Link power on the device and then follow the in game instructions. When you perish to an Orkorak or slay them all simply power off the Gamer Boy to battle again.";
const speed = 150;
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("instruct").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}