canvas = document.getElementById('zelda');
ctx = canvas.getContext('2d');

const tileW = 30;
const tileH = 30;
const mapW = 16;
const mapH = 20;
const tSize = 30;
const col = 20;
const row = 16;

let map = [
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
		this.draw = function(x, y){
			ctx.drawImage(this.image, x, y, tileW, tileH);			
		} 		
	}
};

class Enemy {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.speed = 2;
		this.move = function(){
			this.x = this.x + 1
		}
	}
}

const grass = new Sprite("images/grass.png");
const link = new Sprite("images/link.png");
const dirt = new Sprite("images/dirt.png");
const ghosts = new Sprite("images/enemies.png");
const sword = new Sprite("images/sword.png");

const player = {
	x: tileW*8,
	y: tileH*10,
	attack: false,
	aCollision: false,
	speed: 2, 
	tileY: null,
	tileX: null,
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
  attack(){
  	if(this.direction.up == true && this.attack == true){
  		sword.draw(this.x, this.y - tileH)
  	}
  	if(this.direction.left == true && this.attack == true){
  		sword.draw(this.x - tileW, this.y)
  	}
  	if(this.direction.right == true && this.attack == true){
  		sword.draw(this.x + tileW, this.y)
  	}
  	if(this.direction.down == true && this.attack == true){
  		sword.draw(this.x, this.y + tileH)
  	}  	
  },
  startAttack(key){
  	if(key == ' '){
  		this.attack = true;
  	}
  },
  stopAttack(key){
  	if(key == ' ') this.attack = false;
  },
  checkCollisionWall(){
  	if(this.y < tileH){
  		this.y += 3;
  		return this.aCollision = true;
  	}
  	if(this.x + tileW > canvas.width - tileW){
  		this.x -= 3
  		return this.aCollision = true;
  	}
  	if(this.y + tileH > canvas.height - tileH){
  		this.y -= 3;
  		return this.aCollision = true;
  	}
  	if(this.x + this.speed < tileH){
  		this.x += 3;
  		return this.aCollision = true;
  	}
  	else{
  		return this.aCollision = false;
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
}

// const enemies = {
// 	speed: 1,
// 	x: tileW*4,
// 	y: tileH*4,
// 	xVel: 1,
// 	yVel: 1,
// 	draw(){
// 		ghosts.draw(this.x, this.y)
// 		// ghosts.draw(tileW*4, tileH*9)
// 		// ghosts.draw(tileW*4, tileH*15)
// 		// ghosts.draw(tileW*11, tileH*4)
// 		// ghosts.draw(tileW*11, tileH*9)
// 		// ghosts.draw(tileW*11, tileH*15)
// 	},
// 	move(){
// 		this.y = this.y + this.speed;
// 		if(this.y > canvas.height - tileH || this.y < tileH){
// 			this.yVel = -this.yVel
// 		}
//  		this.x = this.x + this.speed;
//  		if(this.x > canvas.width - tileW || this.y < tileW){
//  			this.xVel = -this.xVel
//  		}
 	

//   }
// }

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

function animate() {
	// enemies.move();
	player.move();
	clearCanvas();
	drawGame();
	// enemies.draw();
	player.draw();
	player.attack();
	player.checkCollisionWall();
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





