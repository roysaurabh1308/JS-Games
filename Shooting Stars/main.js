var canvas = document.getElementById("myCanvas");
var container = document.getElementById("container");

var c = canvas.getContext('2d');

container.width = window.innerWidth;
container.height = window.innerHeight;
canvas.width = container.width;
canvas.height = container.height;

window.addEventListener('resize', function(){
	container.width = window.innerWidth;
	container.height = window.innerHeight;
	canvas.width = container.width;
	canvas.height = container.height;
	init();
})

canvas.addEventListener('click', function(){
	init();
})
var grd = c.createLinearGradient (0,0,0,canvas.height);
grd.addColorStop(0,"rgba(10,10,10)");
grd.addColorStop(1,"rgba(40,40,40)");



function Stars(x,y,radius){
	this.x = x;
	this.y = y
	this.radius = radius;
	
	this.draw = function(){
		c.beginPath();
		c.save();
		c.arc(x,y,radius,0,2*Math.PI,false);
		c.shadowBlur = 7;
		c.shadowColor = "white";
		c.fillStyle = "white";
		c.fill();
		c.restore();
		c.closePath();
	};
	
	this.update = function(){
		this.draw();
	};
}


function Mountain (height, count,color){
	this.height = height;
	this.count = count;
	this.color = color;
	this.draw =  function(){
		c.beginPath();
		var breadth = canvas.width/count;
		for(var i = 0;i<count;i++){
			c.moveTo(breadth*i-365,canvas.height);
			c.lineTo((breadth*i + breadth*(i+1))/2,canvas.height-height);
			c.lineTo(breadth*(i+1)+365,canvas.height);
			c.lineTo(breadth*i,canvas.height);
		}
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
		
	};
	
	this.update = function(){
		this.draw();
	}
}
let stars;
let M1;
let M2;
let M3;
function init(){
	stars = []
	for(var i =0;i<100;i++){
		var radius = Math.random()*3 + 1;
		var x = Math.random()*(canvas.width-radius) + radius;
		var y = Math.random()*(canvas.height-radius) + radius;
		stars.push(new Stars(x,y,radius));

	}
	
	M1 = new Mountain(canvas.height-200,1,"rgb(45,45,45)");
	M2 = new Mountain(canvas.height-300,2,"rgb(38,38,38)");
	M3 = new Mountain(canvas.height-450,3,"rgb(30,30,30)");
	
}

function animate(){
	requestAnimationFrame(animate);
	c.fillStyle = grd;
	c.fillRect(0,0,canvas.width, canvas.height);
	for(var i = 0;i<stars.length;i++)
		stars[i].update();
	
	M1.update();
	M2.update();
	M3.update();
}

init();
animate();





