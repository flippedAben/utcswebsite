// Declare the objects of construction 
function Point (x0,y0) {
	this.x = x0;
	this.y = y0;
	this.foundationOf = [];
}

Point.prototype.draw = function(paper) {
	paper.circle(this.x,this.y,3)
		.attr({
			fill: "blue",
			stroke: "none"
		});
}

function Segment (p1,p2) {
	this.a = p1;
	this.b = p2;
}

function Angle (p0,seg1,seg2) {
	this.o = p0;
	this.a = seg1;
	this.b = seg2;
}

function Circle (p1,seg1) {
	this.c = p1;
	this.r = seg1;
}

// Declare the collections of objects
var points = []; //new Set();
var segments = []; //new Set();
var angles = []; //new Set();
var circles = []; //new Set();

// Declare functions used on collections
function drawAll(collection) {
	collection.forEach(function(element){
		element.draw(p);
	});
}

// Begin drawing
var w = 400;
var h = 400;
var p = Raphael("paper",w,h);
p.rect(0,0,w,h);

// Given
points.push(new Point(w/2-10,h/2));
points.push(new Point(w/2+10,h/2));

drawAll(points);

// Construct everything possible
function construct() {
	// If we can construct a new circle

	// If we can construct a new segment

	// Optional: If we can construct a new angle

	// Optional: If we can construct a new point

	// If our objects create any intersections
}

// Returns true if we can construct a circle
function constructableCircle() {
	points.forEach(function(point){
		//  IF the point is the foundation of a segment
		// AND the pair does not make up an existing circle
		if(point.foundationOf)
	});
}