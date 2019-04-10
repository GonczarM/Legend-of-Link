$(document).on('click', (event) => {
	$('#start').hide("fade", "slow");
	$('#zelda').css('display', 'flex');
});

canvas = document.getElementById('zelda');
ctx = canvas.getContext('2d');

const tileW = 30;
const tileH = 30;
const mapW = 16;
const mapH = 20;
const tSize = 30;
const col = 20;
const row = 16; 

const map = [
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,0,2,0,0,0,2,2,2,0,2,2,2,2,0,1,
	1,0,2,0,0,0,2,0,0,0,2,0,0,0,0,1,
	1,0,2,0,0,0,2,2,0,0,2,0,2,2,0,1,
	1,0,2,0,0,0,2,0,0,0,2,0,0,2,0,1,
	1,0,2,2,2,0,2,2,2,0,2,2,2,2,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,0,0,0,2,2,2,0,0,2,2,2,0,0,0,1,
	1,0,0,0,2,0,2,0,0,2,0,0,0,0,0,1,
	1,0,0,0,2,0,2,0,0,2,2,0,0,0,0,1,
	1,0,0,0,2,2,2,0,0,2,0,0,0,0,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,0,2,2,2,0,2,2,2,2,0,2,0,0,0,1,
	1,0,0,0,2,0,2,0,0,0,0,2,0,0,0,1,
	1,0,0,2,0,0,2,2,2,0,0,2,0,0,0,1,
	1,0,2,0,0,0,2,0,0,0,0,2,0,0,0,1,
	1,0,2,2,2,0,2,2,2,2,0,2,2,2,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

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
	constructor(x, y, picture){
		this.alive = true;
		this.speed = 2;
		this.image = new Image();
		this.image.src = picture;
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
	die () {
		this.alive = false;
		this.x = 15*tileW
		this.y = 0
	}
}

const grass = new Sprite("images/grass.png");
const dirt = new Sprite("images/dirt.png");
const swordUp = new Sprite("images/sword up.png");
const swordDown = new Sprite("images/sword down.png");
const swordLeft = new Sprite("images/sword left.png");
const swordRight = new Sprite("images/sword right.png");
const linkForward = new Sprite("images/link forward.png");
const linkBackward = new Sprite("images/link backward.png");
const linkLeft = new Sprite("images/link left.png");
const linkRight = new Sprite("images/link right.png");
const wall = new Sprite("images/wall.png");

const player = {
	x: tileW*8,
	y: tileH*10,
	unsheath: false,
	speed: 2,
	attackTime: 1,
	// tileY: null,
	// tileX: null,
	direction: {
    up: false,
    down: false,
    left: false,
    right: false		
	},
	draw(){
		linkForward.draw(this.x, this.y)
	},
	move(){
		if(this.direction.up){
			linkBackward.draw(this.x, this.y) 
			this.y -= this.speed;
		}
    if(this.direction.left){
    	linkLeft.draw(this.x, this.y)
   	  this.x -= this.speed;
   	}
    if(this.direction.right){
    	linkRight.draw(this.x, this.y)
    	this.x += this.speed;
    }
    if(this.direction.down) this.y += this.speed;  
	},
	startDirection(key){
    if(key == 'w') this.direction.up = true;
    if(key == 'a') this.direction.left = true;
    if(key == 's') this.direction.down = true;
    if(key == 'd') this.direction.right = true;
	},
  stopDirection(key) {
    if(key == 'w') this.direction.up = false;
    if(key == 'a') this.direction.left = false;
    if(key == 's') this.direction.down = false;
    if(key == 'd') this.direction.right = false;
  },
  attack(enemy){
  	for(let i = 0; i < 6; i++){
		 	if(this.direction.up == true && this.unsheath == true){
		  	swordUp.draw(this.x, this.y - tileH)
		  	if(
		  		this.y - tileH < enemy.y + tileH &&
		  		this.y + tileH > enemy.y &&
		  		this.x < enemy.x + tileW &&
		  		this.x + tileW > enemy.x
		  		){
		 			ghosts[i].die();
		  	}
		  }
		  if(this.direction.left == true && this.unsheath == true){
		  	swordLeft.draw(this.x - tileW, this.y)
		  	if(
		  		this.x - tileW < enemy.x + tileW &&
		  		this.y + tileH > enemy.y &&
		  		this.x > enemy.x &&
		  		this.y < enemy.y + tileH
		  		){
		  		ghosts[i].die();
		  		// return;
		  	}
		  }
		  if(this.direction.right == true && this.unsheath == true){
		  	swordRight.draw(this.x + tileW, this.y)
		  	if(
		  		this.x + (2*tileW) > enemy.x &&
		  		this.x + tileW < enemy.x + tileW &&
		  		this.y + tileH > enemy.y &&
		  		this.y < enemy.y + tileH
		  		){
		  		ghosts[i].die();
		  		// return;
		  	}
		  }
		  if(this.direction.down == true && this.unsheath == true){
		  	swordDown.draw(this.x, this.y + tileH)
		  	if(
		  		this.y + (2*tileH) > enemy.y &&
		  		this.x < enemy.x + tileW &&
		  		this.x + tileW > enemy.x &&
		  		this.y + tileH < enemy.y + tileH
		  		){
		  		ghosts[i].die();
		  		// return;
		  	}
		  }
		}  	   	
  },
  startAttack(key){
  	if(key == ' '){
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
		// for(let x = 0; x < mapH; x++){
		// 	for(let y = 0; y < mapW; y++){
		// 		let tileType = map[mapIndex];
		// 		player
		// 			xOverlap = (this.x < tileX + tileW) &&
		// 			(this.x + tileW > tileX)
		// 			yOverlap = (this.y < tileY + tileH) &&
		// 			(this.y + tileH > tileY)
		// 			collision = xOverlap && yOverlap
		// 			if(collision){
		// 				this.aCollision = true;
		// 			}
		// 		}
		// 	}
		// }
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
  // slayedThemAll(){
  // 	if(ghosts.every(ghosts.alive == false)){
  // 		return true;
  // 	}
  // 	else{
  // 		return false;
  // 	}
  // }
}

const spawnPoints = [
	[4*tileW, 4*tileH],
	[4*tileW, 10*tileH],
	[4*tileW, 15*tileH],
	[11*tileW, 4*tileH],
	[11*tileW, 10*tileH],
	[11*tileW, 15*tileH]
];

const ghosts = [];
const ghost1 = [];
const ghost2 = [];
const ghost3 = [];
const ghost4 = [];
const ghost5 = [];
const ghost6 = [];

function createEnemies(){
 	for(let i = 0; i < 6; i++){
 		ghosts[i] = new Enemy(spawnPoints[i][0],
 		spawnPoints[i][1], "images/enemies.png")
 	}
}
createEnemies();

function drawGame(){
	mapIndex = 0;
	for(let y = 0; y < mapH;y++){
		for(let x = 0; x < mapW;x++, mapIndex++){
			let tileX = x*tileW;
			let tileY = y*tileH;
			let tileType = map[mapIndex];
			if(tileType === 1){
				wall.draw(tileX, tileY);
			}
			if(tileType === 0){
				dirt.draw(tileX, tileY);
			}
			if(tileType === 2){
				grass.draw(tileX, tileY);
			}
		}
	}
};

function gameOver() {
	$('#zelda').css('display', 'none')
  $('.lose').show('fade', 1000)
}

function youWin(){
	$('#zelda').css('display', 'none')
	$('.win').show('fade', 2000)	
} 

function animate() {
	for(let i = 0; i < 6; i++){
		ghosts[i].move();
	}
	clearCanvas();
	drawGame();
	player.draw();
	player.move();
	for(let i = 0; i < 6; i++){
		player.attack(ghosts[i]);
	}
	for(let i = 0; i < 6; i++){
		if (ghosts[i].alive) {
			ghosts[i].draw();
		}
	}
	for(let i = 0; i < 6; i++){
		ghosts[i].checkCollisionWall();
	}
	player.checkCollisionWall();
	for(let i = 0; i < 6; i++){
		if(player.checkCollisionEnemy(ghosts[i])){
			gameOver();
			return;
		}
	}

	// if(player.slayedThemAll()){
	// 	youWin();
	// 	return;
	// }
	window.requestAnimationFrame(animate);
}
animate();

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('keydown', (event) => {

	if(['w', 'a', 's', 'd'].includes(event.key)) {
    player.startDirection(event.key)
    player.stopAttack();
  }
});

document.addEventListener('keyup', (event) => {
  if(['w', 'a', 's', 'd'].includes(event.key)) {
    player.stopDirection(event.key)
  }
});

document.addEventListener('keydown', (event) => {
	if([' '].includes(event.key)) {
		if (!player.unsheath) {
	    player.startAttack(event.key)
		} 
  }
});

document.addEventListener('keyup', (event) => {
  if([' '].includes(event.key)) {
    player.stopAttack(event.key)
  }
});





