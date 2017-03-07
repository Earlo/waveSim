gameDiv.style.display = 'inline-block';
const WIDTH = 800 |0;
const HEIGHT = WIDTH |0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gfx0 = document.getElementById("effect0").getContext("2d");
//const gfx1 = document.getElementById("effect1").getContext("2d");
//const gfx2 = document.getElementById("effect2").getContext("2d");
const ctxUi = document.getElementById("ctx-ui").getContext("2d");
ctxUi.font = '30px Arial';

gfx0.fillStyle = 'rgb(0,0,255)';
ctx.fillStyle = 'rgb(0,0,127)';

var pCol = [200 |0,255 |0,255 |0];
var pOrder = [2 |0,1 |0,0 |0];
var nCol = [255 |0,200 |0,255 |0];
var nOrder = [2 |0,0 |0,1 |0];

//gfx0.globalAlpha = 0.85;
//gfx1.globalAlpha = 0.6;
//gfx2.globalAlpha = 0.4;

const tileSize = 1 |0;
const halfSize = (tileSize/2) |0;
const gridSize = (WIDTH/tileSize) |0;
const edgeUR = 3 |0;
const edgeDL = (gridSize - edgeUR) |0;
const simWidth = (edgeDL - edgeUR) |0;

var WAVETYPE = 0 |0;

var ca = [];
var cw = 0 |0;
for (var i = 0; i < edgeUR*2; i += 1) {
	for (var j = 0; j < edgeUR*2; j += 1) {
		ca.push(0)
		}
	}
ca[0] = 1 |0;

const friction = 0.9999;
const lineLookup = [];
const lineEndLookup = [];

const graphIndexLookup = [];

var stepper = 0 |0;
const tb = [[],[]];

const solidTiles = [];

const wave = gfx0.createImageData(WIDTH |0, HEIGHT |0);
const c  = wave.data;

for (var i = 0; i < gridSize; i += 1) {
	lineLookup[i] = (i*gridSize + edgeUR) |0;
	lineEndLookup[i] = (lineLookup[i] + simWidth) |0;
	graphIndexLookup[i] = (lineLookup[i]*4) |0;
	for (var j = 0; j < gridSize; j += 1) {
		c[4*(j*gridSize + i) + 3] = 255 |0;
		tb[0]		[j*gridSize + i] = 0 |0;
		tb[1]		[j*gridSize + i] = 0 |0;
		solidTiles	[j*gridSize + i] = false;
		}
	}
tb[0][gridSize*5 + 5] = 100000 |0;

function draw(){
	var y = edgeUR |0;
	var value = 0 |0;
	const cur  = tb[stepper];
	stepper = ((stepper+1) % 2) |0;
	const old = tb[stepper];

	var ctr = lineLookup[y] |0;
	var graphIndex = graphIndexLookup[y] |0;
	var	lu1 = lineLookup[y-2] |0;
	var	lu0 = lineLookup[y-1] |0;
	var until = lineEndLookup[y] |0;
	var	ld0 = lineLookup[y+1] |0;
	var	ld1 = lineLookup[y+2] |0;
	//for (; y < edgeDL; ++y) {
	while(y < edgeDL){
		ctr = lineLookup[y] |0;
		graphIndex = graphIndexLookup[y] |0;
		until = lineEndLookup[y] |0;

		lu1 = lineLookup[y-2] |0;
		lu0 = lineLookup[y-1] |0;
		++y;
		ld0 = lineLookup[y  ] |0;
		ld1 = lineLookup[y+1] |0;

		//for (;ctr < until; ctr += 1) {
		while(ctr < until){
			//Rook waves
			old[ctr] = (friction*( ( (	
						cur[lu0] +
				cur[ctr-1] + cur[ctr+1] +
						cur[ld0]			) >> 1 ) - old[ctr] ) ) |0;
			
			value = Math.abs(old[ctr]) |0;
			if (old[ctr] > 0){
				c[graphIndex] = value |0;
				/*
				c[graphIndex + pOrder[0] ] = value  |0;
				c[graphIndex + pOrder[1] ] = (value - pCol[pOrder[0]]) |0;
				c[graphIndex + pOrder[2] ] = (value - pCol[pOrder[0]] - pCol[pOrder[1]]) |0;
				*/
			}
			else{
				c[graphIndex + 1 ] = value |0;
				/*
				c[graphIndex + nOrder[0] ] = value |0;
				c[graphIndex + nOrder[1] ] = (value - nCol[nOrder[0]]) |0;
				c[graphIndex + nOrder[2] ] = (value - nCol[nOrder[0]] - nCol[nOrder[1]]) |0;
				*/
			}
			++ctr;
			++lu0;
			++lu1;
			++ld0;
			++ld1;
			graphIndex += 4;
		}

	}
	gfx0.putImageData( wave, 0, 0);
}

setWAVETYPE = function(i){
	WAVETYPE = i |0;
}

setCOLOURS = function(){

	pCol = [document.getElementById("PR").value,document.getElementById("PG").value,document.getElementById("PB").value];
	//pOrder = [2,1,0];
	pCol = [document.getElementById("NR").value,document.getElementById("NG").value,document.getElementById("NB").value];
	//nOrder = [2,0,1];
}


setInterval(function(){
	ctx.fillRect(0,0,WIDTH,HEIGHT);
	gfx0.clearRect(0,0,WIDTH,HEIGHT);
	/*
	gfx1.clearRect(0,0,WIDTH,HEIGHT);
	gfx2.clearRect(0,0,WIDTH,HEIGHT);
	*/
	if (HOLDING){
		tb[stepper][last[1]*gridSize + last[0]] += 5000;
	}
	draw();
},1);


function myFunction() {
	document.getElementById("demo").innerHTML = "Hello World";
}

var HOLDING = false
var last = [0,0]
document.onmousedown = function(event){
	HOLDING = true;
	const x = (event.clientX/tileSize)|0;
	const y = (event.clientY/tileSize)|0;
	if (x < gridSize && y < gridSize){
		tb[stepper][y*gridSize + x] += 5000;
	}
	last = [x,y];
}
document.onmouseup = function(event){
	HOLDING = false;
	const x = (event.clientX/tileSize)|0;
	const y = (event.clientY/tileSize)|0;
	if (x < gridSize && y < gridSize){
		tb[stepper][y*gridSize + x] += 5000;
	}
	last = [x,y];
}
document.onmousemove = function(event){
	if (HOLDING){
		const x = (event.clientX/tileSize)|0;
		const y = (event.clientY/tileSize)|0;
		while (last[0] != x || last[1] != y ){
			if ( last[0] < edgeDL && last[0] > edgeUR  && last[1] > edgeUR && last[1] < edgeDL){
				tb[stepper][last[1]*gridSize + last[0]] += 500;
			}
			last[0] += Math.sign( x - last[0] );
			last[1] += Math.sign( y - last[1] );
		}
	}
}
