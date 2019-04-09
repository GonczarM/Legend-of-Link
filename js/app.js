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
	1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,
	1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,
	1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,
	1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
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
		this.x = x;
		this.y = y;
		this.speed = 2;
		this.image = new Image();
		this.image.src = picture;
	}
	draw(x, y){
		ctx.drawImage(this.image, x, y, tileW, tileH);			
	}
	move(){
		this.y = this.y + this.speed;
 		this.x = this.x + this.speed;
	}
	checkCollisionWall(){
	  if(this.y < tileH){
	  	this.speed = -this.speed
	  	return this.aCollision = true;
	  }
	  if(this.x + tileW > canvas.width - tileW){
	  	this.speed = -this.speed
	  	return this.aCollision = true;
	  }
	  if(this.y + tileH > canvas.height - tileH){
	  	this.speed = -this.speed
	  	return this.aCollision = true;
	  }
	  if(this.x + this.speed < tileH){
	  	this.speed = -this.speed
	  	return this.aCollision = true;
	  }
	  else{
	  	return this.aCollision = false;
	  }	  
	}
}

const grass = new Sprite("images/grass.png");
const link = new Sprite("images/link.png");
const dirt = new Sprite("images/dirt.png");
const ghost1 = new Sprite("images/enemies.png");
const sword = new Sprite("images/sword.png");

const player = {
	x: tileW*8,
	y: tileH*10,
	unsheath: false,
	kill: false,
	speed: 2, 
	// tileY: null,
	// tileX: null,
	direction: {
    up: false,
    down: false,
    left: false,
    right: false		
	},
	draw(){
		link.draw(this.x, this.y)
	},
	move(){
		if(this.direction.up) this.y -= this.speed;
    if(this.direction.left) this.x -= this.speed;
    if(this.direction.right) this.x += this.speed;
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
  attack(enemy){
  	if(this.direction.up == true && this.unsheath == true){
  		sword.draw(this.x, this.y - tileH)
  		if(
  			this.y - tileH < enemy.y + tileH &&
  			this.y + tileH > enemy.y &&
  			this.x < enemy.x + tileW &&
  			this.x + tileW > enemy.x
  			){
  			console.log("kill");
  			return kill = true;
  		}
  	}
  	if(this.direction.left == true && this.unsheath == true){
  		sword.draw(this.x - tileW, this.y)
  		if(
  			this.x - tileW < enemy.x + tileW &&
  			this.y + tileH > enemy.y &&
  			this.x > enemy.x &&
  			this.y < enemy.y + tileH
  			){
  			console.log("kill");
  			return kill = true;
  		}
  	}
  	if(this.direction.right == true && this.unsheath == true){
  		sword.draw(this.x + tileW, this.y)
  		if(
  			this.x + (2*tileW) > enemy.x &&
  			this.x + tileW < enemy.x + tileW &&
  			this.y + tileH > enemy.y &&
  			this.y < enemy.y + tileH
  			){
  			console.log("kill");
  			return kill = true;
  		}
  	}
  	if(this.direction.down == true && this.unsheath == true){
  		sword.draw(this.x, this.y + tileH)
  		if(
  			this.y + (2*tileH) > enemy.y &&
  			this.x < enemy.x + tileW &&
  			this.x + tileW > enemy.x &&
  			this.y + tileH < enemy.y + tileH
  			){
  			console.log("kill");
  			return kill = true;
  		}
  	}   	
  },
  startAttack(key,){
  	if(key == ' '){
  		this.unsheath = true;
  	} 	
  },
  stopAttack(key){
  	if(key == ' ') this.unsheath = false;
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
  }
}

const spawnPoints = [
	[4*tileW, 4*tileH],
	[4*tileW, 10*tileH],
	[4*tileW, 15*tileH],
	[10*tileW, 4*tileH],
	[10*tileW, 10*tileH],
	[10*tileW, 10*tileH]
];

// const ghosts = []

// const createEnemies = function(){
//  	for(let i = 0; i < 6; i++){

//  		ghosts.push(Enemy(spawnPoints[i][i],
//  		spawnPoints[i][i+1], "images/enemies.png"))
//  	}
// }
// createEnemies();
// console.log(ghosts);

const enemies = {
	speed: 1,
	x: tileW*4,
	y: tileH*4,
	draw(){
		ghost1.draw(this.x, this.y);	
	},
	move(){
		this.y = this.y + this.speed;
 		this.x = this.x + this.speed;
	},
	checkCollisionWall(){
	  if(this.y < tileH){
	  	this.speed = -this.speed
	  	return this.aCollision = true;
	  }
	  if(this.x + tileW > canvas.width - tileW){
	  	this.speed = -this.speed
	  	return this.aCollision = true;
	  }
	  if(this.y + tileH > canvas.height - tileH){
	  	this.speed = -this.speed
	  	return this.aCollision = true;
	  }
	  if(this.x + this.speed < tileH){
	  	this.speed = -this.speed
	  	return this.aCollision = true;
	  }
	  else{
	  	return this.aCollision = false;
	  }	  
	}
}

function drawGame(){
	mapIndex = 0;
	for(let y = 0; y < mapH;y++){
		for(let x = 0; x < mapW;x++, mapIndex++){
			let tileX = x*tileW;
			let tileY = y*tileH;
			let tileType = map[mapIndex];
			if(tileType === 1){
				grass.draw(tileX, tileY);
			}
			if(tileType === 0){
				dirt.draw(tileX, tileY);
			}
		}
	}
};

function gameOver() {
  document.write(`
    <h1>YOU ARE DEAD YOU SHOULD NOT HAVE CRASHED INTO THAT</h1>
    <FORM>
      <INPUT TYPE="hidden" VALUE="you also shouldn't capitalize your html or use STYLE='' because it's not 1995">
      <BUTTON STYLE="font-size: 18pt">CLICK</BUTTON>
    </FORM>
  `)  
}

function animate() {
	enemies.move();
	player.move();
	clearCanvas();
	drawGame();
	enemies.draw();
	player.draw();
	player.attack(enemies);
	enemies.checkCollisionWall();
	player.checkCollisionWall();
	if(player.checkCollisionEnemy(enemies)){
		gameOver();
		return;
	}
	window.requestAnimationFrame(animate);
}
animate();

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('keydown', (event) => {
	if(['w', 'a', 's', 'd'].includes(event.key)) {
    player.startDirection(event.key)
  }
});

document.addEventListener('keyup', (event) => {
  if(['w', 'a', 's', 'd'].includes(event.key)) {
    player.stopDirection(event.key)
  }
});

document.addEventListener('keydown', (event) => {
	if([' '].includes(event.key)) {
    player.startAttack(event.key)
  }
});

document.addEventListener('keyup', (event) => {
  if([' '].includes(event.key)) {
    player.stopAttack(event.key)
  }
});





