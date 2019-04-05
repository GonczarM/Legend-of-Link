const canvas = document.getElementById("zelda");
// this.viewport = $("#zelda");

const ctx = canvas.getContext('2d');
// this.screen = screen;
const background = new Image();
background.src = "images/overworld_map.png";
background.onload = function(){
	ctx.drawImage(background,-1792,-1232);
}