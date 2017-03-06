gameDiv.style.display = 'inline-block';
const WIDTH = 800;
const HEIGHT = WIDTH;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gfx0 = document.getElementById("effect0").getContext("2d");
//const gfx1 = document.getElementById("effect1").getContext("2d");
//const gfx2 = document.getElementById("effect2").getContext("2d");
const ctxUi = document.getElementById("ctx-ui").getContext("2d");
ctxUi.font = '30px Arial';

gfx0.fillStyle = 'rgb(0,0,255)';
ctx.fillStyle = 'rgb(0,0,127)';

var pCol = [200,255,255];
var pOrder = [2,1,0];
var nCol = [255,200,255];
var nOrder = [2,0,1];

//gfx0.globalAlpha = 0.85;
//gfx1.globalAlpha = 0.6;
//gfx2.globalAlpha = 0.4;

const tileSize = 1;
const halfSize = (tileSize/2)|0;
const gridSize = (WIDTH/tileSize)|0;
const edgeUR = 3;
const edgeDL = gridSize - edgeUR;
const simWidth = edgeDL - edgeUR;

var WAVETYPE = 0;

var ca = [];
var cw = 0
for (var i = 0; i < edgeUR*2; i += 1) {
	for (var j = 0; j < edgeUR*2; j += 1) {
		ca.push(0)
		}
	}
ca[0] = 1;

const World = function(){
	const self = this;

	const friction = 0.9999
	const lineLookup = [];
	const graphIndexLookup = [];

	self.stepper = 0;

	self.tb = [[],[]];
	self.solidTiles = [];

	self.wave = gfx0.createImageData(WIDTH, HEIGHT);
	self.c  = self.wave.data;
	
	for (var i = 0; i < gridSize; i += 1) {
		lineLookup[i] = (i*gridSize + edgeUR) |0;
		graphIndexLookup[i] = (lineLookup[i]*4) |0;
		for (var j = 0; j < gridSize; j += 1) {
			self.c[4*(j*gridSize + i) + 3] = 255 |0;
			self.tb[0]		[j*gridSize + i] = 0 |0;
			self.tb[1]		[j*gridSize + i] = 0 |0;
			self.solidTiles	[j*gridSize + i] = false;
			}
		}
	self.tb[0][gridSize*5 + 5] = 100000 |0;

	self.draw = function(){

		const cur  = self.tb[self.stepper];
		self.stepper = (self.stepper+1) % 2;
		const old = self.tb[self.stepper];
		self.c  = self.wave.data
		
		var y = edgeUR
		for (; y < edgeDL; ++y) {
			var ctr = lineLookup[y] |0;
			var graphIndex = graphIndexLookup[y] |0;
			
			var lu0 = lineLookup[y-1] |0;
			var lu1 = lineLookup[y-2] |0;
			var ld0 = lineLookup[y+1] |0;
			var ld1 = lineLookup[y+2] |0;

			const until = (ctr + simWidth) |0;
			//for (;ctr < until; ctr += 1) {
			while(ctr < until){

				if (WAVETYPE == 0){
					//Rook waves
					old[ctr] = (friction*( ( (	
								cur[lu0] +
						cur[ctr-1] + cur[ctr+1] +
								cur[ld0]			) >> 1 ) - old[ctr] ) ) | 0;
					}
				else if(WAVETYPE == 1){
					//Bishop Waves
					old[ctr] = ( friction*( ( (
							cur[lu0-1] + cur[lu0+1] +
							cur[ld0-1] + cur[ld0+1]		) >> 1 ) - old[ctr] ) ) | 0;

				}
				else if(WAVETYPE == 2){
					//Knight Waves
					old[ctr] = ( friction*( ( (
							cur[lu1-2] + cur[lu1+2] + 
						cur[lu0-1] + 		cur[lu0+1] +
						cur[ld0-1] + 		cur[ld0+1] +
							cur[ld1-2] + cur[ld1+2]		) >> 2 ) - old[ctr] ) ) | 0;
					}
				else if(WAVETYPE == 3){
					//King Waves
					old[ctr] = ( friction*( ( (
						cur[lu0-1] + cur[lu0] + cur[lu0+1] +
						cur[ctr-1] + 			cur[ctr+1] +
						cur[ld0-1] + cur[ld0] + cur[ld0+1]  ) >> 2 ) - old[ctr] ) ) | 0;
				}
				else if(WAVETYPE == 4){
					//custom
					old[ctr] = ( friction*( ( (
					cur[lu1-2]*ca[0 ] + cur[lu1-1]*ca[1 ] + cur[lu1]*ca[2 ] + cur[lu1+1]*ca[3 ] + cur[lu1+2]*ca[4 ] +
					cur[lu0-2]*ca[5 ] + cur[lu0-1]*ca[6 ] + cur[lu0]*ca[7 ] + cur[lu0+1]*ca[8 ] + cur[lu0+2]*ca[9 ] +
					cur[ctr-2]*ca[10] + cur[ctr-1]*ca[11] + 				  cur[ctr+1]*ca[13] + cur[ctr+2]*ca[14] +
					cur[ld0-2]*ca[15] + cur[ld0-1]*ca[16] + cur[ld0]*ca[17] + cur[ld0+1]*ca[18] + cur[ld0+2]*ca[19] +
					cur[ld1-2]*ca[20] + cur[ld1-1]*ca[21] + cur[ld1]*ca[22] + cur[ld1+1]*ca[23] + cur[ld1+2]*ca[24]  
																					) >> 2 ) - old[ctr] ) ) | 0;
				}
				else{
					//box
					old[ctr] = ( friction*( ( (
					cur[lu1-2] + cur[lu1-1] + cur[lu1] + cur[lu1+1] + cur[lu1+2] +
					cur[lu0-2] + cur[lu0-1] + cur[lu0] + cur[lu0+1] + cur[lu0+2] +
					cur[ctr-2] + cur[ctr-1] + 			 cur[ctr+1] + cur[ctr+2] +
					cur[ld0-2] + cur[ld0-1] + cur[ld0] + cur[ld0+1] + cur[ld0+2] +
					cur[ld1-2] + cur[ld1-1] + cur[ld1] + cur[ld1+1] + cur[ld1+2]  
																					) >> 2 ) - old[ctr] ) ) | 0;
				}
				
				const value = Math.abs(old[ctr])  |0;
				if (old[ctr] > 0){
					self.c[graphIndex + pOrder[0] ] = value  |0;
					self.c[graphIndex + pOrder[1] ] = (value - pCol[pOrder[0]]) |0;
					self.c[graphIndex + pOrder[2] ] = (value - pCol[pOrder[0]] - pCol[pOrder[1]]) |0;
				}
				else{
					self.c[graphIndex + nOrder[0] ] = value |0;
					self.c[graphIndex + nOrder[1] ] = (value - nCol[nOrder[0]]) |0;
					self.c[graphIndex + nOrder[2] ] = (value - nCol[nOrder[0]] - nCol[nOrder[1]]) |0;
				}
				++ctr;
				++lu0;
				++lu1;
				++ld0;
				++ld1;
				graphIndex += 4;
				/*
				lu0 += 1;
				lu1 += 1;
				ld0 += 1;
				ld1 += 1;
				*/
			}
		}
		gfx0.putImageData( self.wave, 0, 0);
	}
}
const WORLD = new World();

setWAVETYPE = function(i){
	WAVETYPE = i;
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
		WORLD.tb[WORLD.stepper][last[1]*gridSize + last[0]] += 5000;
	}

	WORLD.draw();
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
		WORLD.tb[WORLD.stepper][y*gridSize + x] += 5000;
	}
	last = [x,y];
}
document.onmouseup = function(event){
	HOLDING = false;
	const x = (event.clientX/tileSize)|0;
	const y = (event.clientY/tileSize)|0;
	if (x < gridSize && y < gridSize){
		WORLD.tb[WORLD.stepper][y*gridSize + x] += 5000;
	}
	last = [x,y];
}
document.onmousemove = function(event){
	if (HOLDING){
		const x = (event.clientX/tileSize)|0;
		const y = (event.clientY/tileSize)|0;
		while (last[0] != x || last[1] != y ){
			if ( last[0] < edgeDL && last[0] > edgeUR  && last[1] > edgeUR && last[1] < edgeDL){
				WORLD.tb[WORLD.stepper][last[1]*gridSize + last[0]] += 500;
			}
			last[0] += Math.sign( x - last[0] );
			last[1] += Math.sign( y - last[1] );
		}
	}
}
