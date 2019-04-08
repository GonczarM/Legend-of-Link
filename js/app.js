canvas = document.getElementById('zelda');
ctx = canvas.getContext('2d');

const tileW = 30;
const tileH = 30;
const mapW = 16;
const mapH = 20;

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
	clearCanvas();
	drawGame();
	window.requestAnimationFrame(animate);
}
animate();

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}







