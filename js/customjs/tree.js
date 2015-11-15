var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var notcan = document.getElementById('notcanvas');

var w = window.innerWidth;
var h = window.innerHeight-notcan.offsetHeight;
canvas.width = w;
canvas.height = h;


var trunk_length, trunk_width, shrink1, shrink2, spread1, spread2, tips, mouseX, mouseY, theta;

document.onmousemove = function (event) {
	event = event || window.event;
	mouseX = event.clientX;
	mouseY = event.clientY;
}

window.addEventListener('resize', function() {
	w = window.innerWidth;
	h = window.innerHeight-notcan.offsetHeight;
	canvas.width = w;
	canvas.height = h;
});

drawTree();

function drawTree() {
	ctx.clearRect(0,0,w,h);
	trunk_length = h*0.3;
	trunk_width = w/160;
	shrink1 = Math.round(60+Math.random()*10)/100;
	shrink2 = Math.round(60+Math.random()*10)/100;
	spread1 = Math.PI/12+Math.random()*Math.PI/6;
	spread2 = Math.PI/12+Math.random()*Math.PI/6;
	tips = [];
	var trunk = {
		x:w/2,
		y:trunk_length,
		angle: Math.PI/2
	};
	tips.push(trunk);

	ctx.beginPath();
	ctx.moveTo(w/2,h);
	ctx.lineTo(w/2,h-trunk.y);
	ctx.strokeStyle = 'brown';
	ctx.lineWidth = trunk_width;
	ctx.stroke();

	drawBranches();
}

function drawBranches() {
	trunk_width *= shrink1;
	ctx.lineWidth = trunk_width;

	var branch_tips = [];
	ctx.beginPath();
	for(var i = 0; i < tips.length; i++) {
		var pt = tips[i];
		var angle1 = spread1;
		var angle2 = -spread2;
		if(mouseX <= w/3) angle2 = 0;
		else if(mouseX > 2*w/3) { angle1 *= -1; angle2 = 0; }
		branch_tips.push(calculateTip(pt.x,pt.y,pt.angle+angle1,trunk_length*shrink1));
		branch_tips.push(calculateTip(pt.x,pt.y,pt.angle+angle2,trunk_length*shrink2));
		ctx.moveTo(pt.x,h-pt.y);
		ctx.lineTo(branch_tips[2*i].x,h-branch_tips[2*i].y);
		ctx.moveTo(pt.x,h-pt.y);
		ctx.lineTo(branch_tips[2*i+1].x,h-branch_tips[2*i+1].y);
	}
	trunk_length *= shrink1;
	if(trunk_length < 10)
		ctx.strokeStyle = 'green';
	else
		ctx.strokeStyle = 'brown';
	tips = branch_tips;
	ctx.stroke();
	if(trunk_length > 2)
		setTimeout(drawBranches,50);
	else setTimeout(drawTree,500);
}

function calculateTip(x,y,a,trunk_length) {
	var tipx = x + trunk_length*Math.cos(a);
	var tipy = y + trunk_length*Math.sin(a);
	return {x: tipx, y: tipy, angle: a};
}