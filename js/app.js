canvas = document.getElementById('zelda');
ctx = canvas.getContext('2d');

const tileW = 30;
const tileH = 30;
const mapW = 16;
const mapH = 20;
function indexCoord(index){
	const x = index % mapW;
	const y = Math.floor(index/mapW);
	return[x,y];
}
function mapCoord(x, y, mapW){
	return y * mapW + x;
}

const map = [
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,
		1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,
		1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,
		1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	];

mapIndex = 0;	

class sprite {
	constructor(picture){
		this.image = new Image();
		this.image.src = picture;
		this.draw = function(x, y){
			ctx.drawImage(this.image, x, y, tileW, tileH);			
		} 		
	}
};

const grass = new sprite("images/grass.png");
const link = new sprite("images/link.png");
const dirt = new sprite("images/dirt.png");
let playerX = tileW*8;
let playerY = tileH*10

const player = {
	attack: false,
	direction: {
    up: false,
    down: false,
    left: false,
    right: false		
	},
	draw(){
		link.draw(playerX, playerY)
	},
	move(){
		if(this.direction.up) playerY -= 2;
    if(this.direction.left) playerX -= 2;
    if(this.direction.right) playerX += 2;
    if(this.direction.down) playerY += 2;
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
  }	
}

function drawGame(){
	mapIndex = 0;
	for(let y = 0; y < 20;y++){
		for(let x = 0; x < 16;x++, mapIndex++){
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
	player.move();
	clearCanvas();
	drawGame();
	player.draw();
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






