gameDiv.style.display = "inline-block";
const WIDTH = 800 | 0;
const HEIGHT = WIDTH | 0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gfx0 = document.getElementById("effect0").getContext("2d");
const ctxUi = document.getElementById("ctx-ui").getContext("2d");
ctxUi.font = "30px Arial";

gfx0.fillStyle = "rgb(0,0,255)";
ctx.fillStyle = "rgb(0,0,127)";

let pCol = [200 | 0, 255 | 0, 255 | 0];
let pOrder = [2 | 0, 1 | 0, 0 | 0];
let nCol = [255 | 0, 200 | 0, 255 | 0];
let nOrder = [2 | 0, 0 | 0, 1 | 0];
/*
c[graphIndex + pOrder[0] ] = value  |0;
c[graphIndex + pOrder[1] ] = (value - pCol[pOrder[0]]) |0;
c[graphIndex + pOrder[2] ] = (value - pCol[pOrder[0]] - pCol[pOrder[1]]) |0;
*/

//gfx0.globalAlpha = 0.85;
//gfx1.globalAlpha = 0.6;
//gfx2.globalAlpha = 0.4;

const tileSize = 1 | 0;
const halfSize = (tileSize / 2) | 0;
const gridSize = (WIDTH / tileSize) | 0;
const edgeUR = 3 | 0;
const edgeDL = (gridSize - edgeUR) | 0;
const simWidth = (edgeDL - edgeUR) | 0;

let WAVETYPE = 0 | 0;

let ca = [];
let cw = 0 | 0;
for (let i = 0; i < edgeUR * 2; i += 1) {
    for (let j = 0; j < edgeUR * 2; j += 1) {
        ca.push(0);
    }
}
ca[0] = 1 | 0;

const POWER = 5000;
const FRICTION = 0.9;
const lineLookup = [];
const lineEndLookup = [];

const graphIndexLookup = [];

let stepper = 0 | 0;
const tb = [[], []];

const solidTiles = [];

const wave = gfx0.createImageData(WIDTH | 0, HEIGHT | 0);
const c = wave.data;

for (let i = 0; i < gridSize; i += 1) {
    lineLookup[i] = (i * gridSize + edgeUR) | 0;
    lineEndLookup[i] = (lineLookup[i] + simWidth) | 0;
    graphIndexLookup[i] = (lineLookup[i] * 4) | 0;
    for (let j = 0; j < gridSize; j += 1) {
        c[4 * (j * gridSize + i) + 3] = 255 | 0;
        tb[0][j * gridSize + i] = 0 | 0;
        tb[1][j * gridSize + i] = 0 | 0;
        solidTiles[j * gridSize + i] = false;
    }
}
//tb[0][gridSize * 100 + 100] = 25500 | 0;
//tb[0][gridSize*gridSize/2] = 25500 |0;

function drawRook() {
    let y = edgeUR | 0;
    let value = 0 | 0;
    const cur = tb[stepper];
    stepper = (stepper + 1) % 2 | 0;
    const old = tb[stepper];
    // letiables for the sim loop
    let ctr = lineLookup[y] | 0;
    let graphIndex = graphIndexLookup[y] | 0;
    let lu1 = lineLookup[y - 2] | 0;
    let lu0 = lineLookup[y - 1] | 0;
    let until = lineEndLookup[y] | 0;
    ++y;
    let ld0 = lineLookup[y] | 0;
    let ld1 = lineLookup[y + 1] | 0;
    while (y < edgeDL) {
        while (ctr < until) {
            old[ctr] =
                (FRICTION *
                    (((cur[lu0] + cur[ctr - 1] + cur[ctr + 1] + cur[ld0]) >>
                        1) -
                        old[ctr])) |
                0;

            value = Math.abs(old[ctr]) | 0;
            if (old[ctr] > 0) {
                c[graphIndex] = value | 0;
                c[graphIndex + 1] = 0;
            } else {
                c[graphIndex] = 0;
                c[graphIndex + 1] = value | 0;
            }
            ++ctr;
            ++lu0;
            ++lu1;
            ++ld0;
            ++ld1;
            graphIndex += 4;
        }
        ctr = lineLookup[y] | 0;
        graphIndex = graphIndexLookup[y] | 0;
        until = lineEndLookup[y] | 0;
        lu1 = lineLookup[y - 2] | 0;
        lu0 = lineLookup[y - 1] | 0;
        ++y;
        ld0 = lineLookup[y] | 0;
        ld1 = lineLookup[y + 1] | 0;
    }
    gfx0.putImageData(wave, 0, 0);
}
function drawBishop() {
    let y = edgeUR | 0;
    let value = 0 | 0;
    const cur = tb[stepper];
    stepper = (stepper + 1) % 2 | 0;
    const old = tb[stepper];
    // letiables for the sim loop
    let ctr = lineLookup[y] | 0;
    let graphIndex = graphIndexLookup[y] | 0;
    let lu1 = lineLookup[y - 2] | 0;
    let lu0 = lineLookup[y - 1] | 0;
    let until = lineEndLookup[y] | 0;
    ++y;
    let ld0 = lineLookup[y] | 0;
    let ld1 = lineLookup[y + 1] | 0;
    while (y < edgeDL) {
        while (ctr < until) {
            old[ctr] =
                (FRICTION *
                    (((cur[lu0 - 1] +
                        cur[lu0 + 1] +
                        cur[ld0 - 1] +
                        cur[ld0 + 1]) >>
                        1) -
                        old[ctr])) |
                0;

            value = Math.abs(old[ctr]) | 0;
            if (old[ctr] > 0) {
                c[graphIndex] = value | 0;
                c[graphIndex + 1] = 0;
            } else {
                c[graphIndex] = 0;
                c[graphIndex + 1] = value | 0;
            }
            ++ctr;
            ++lu0;
            ++lu1;
            ++ld0;
            ++ld1;
            graphIndex += 4;
        }
        ctr = lineLookup[y] | 0;
        graphIndex = graphIndexLookup[y] | 0;
        until = lineEndLookup[y] | 0;
        lu1 = lineLookup[y - 2] | 0;
        lu0 = lineLookup[y - 1] | 0;
        ++y;
        ld0 = lineLookup[y] | 0;
        ld1 = lineLookup[y + 1] | 0;
    }
    gfx0.putImageData(wave, 0, 0);
}
function drawKnight() {
    let y = edgeUR | 0;
    let value = 0 | 0;
    const cur = tb[stepper];
    stepper = (stepper + 1) % 2 | 0;
    const old = tb[stepper];
    // letiables for the sim loop
    let ctr = lineLookup[y] | 0;
    let graphIndex = graphIndexLookup[y] | 0;
    let lu1 = lineLookup[y - 2] | 0;
    let lu0 = lineLookup[y - 1] | 0;
    let until = lineEndLookup[y] | 0;
    ++y;
    let ld0 = lineLookup[y] | 0;
    let ld1 = lineLookup[y + 1] | 0;
    while (y < edgeDL) {
        while (ctr < until) {
            old[ctr] =
                (FRICTION *
                    (((cur[lu1 - 2] +
                        cur[lu1 + 2] +
                        cur[lu0 - 1] +
                        cur[lu0 + 1] +
                        cur[ld0 - 1] +
                        cur[ld0 + 1] +
                        cur[ld1 - 2] +
                        cur[ld1 + 2]) >>
                        2) -
                        old[ctr])) |
                0;

            value = Math.abs(old[ctr]) | 0;
            if (old[ctr] > 0) {
                c[graphIndex] = value | 0;
                c[graphIndex + 1] = 0;
            } else {
                c[graphIndex] = 0;
                c[graphIndex + 1] = value | 0;
            }
            ++ctr;
            ++lu0;
            ++lu1;
            ++ld0;
            ++ld1;
            graphIndex += 4;
        }
        ctr = lineLookup[y] | 0;
        graphIndex = graphIndexLookup[y] | 0;
        until = lineEndLookup[y] | 0;
        lu1 = lineLookup[y - 2] | 0;
        lu0 = lineLookup[y - 1] | 0;
        ++y;
        ld0 = lineLookup[y] | 0;
        ld1 = lineLookup[y + 1] | 0;
    }
    gfx0.putImageData(wave, 0, 0);
}
function drawKing() {
    let y = edgeUR | 0;
    let value = 0 | 0;
    const cur = tb[stepper];
    stepper = (stepper + 1) % 2 | 0;
    const old = tb[stepper];
    // letiables for the sim loop
    let ctr = lineLookup[y] | 0;
    let graphIndex = graphIndexLookup[y] | 0;
    let lu1 = lineLookup[y - 2] | 0;
    let lu0 = lineLookup[y - 1] | 0;
    let until = lineEndLookup[y] | 0;
    ++y;
    let ld0 = lineLookup[y] | 0;
    let ld1 = lineLookup[y + 1] | 0;
    while (y < edgeDL) {
        while (ctr < until) {
            //King Waves
            old[ctr] =
                (FRICTION *
                    (((cur[lu0 - 1] +
                        cur[lu0] +
                        cur[lu0 + 1] +
                        cur[ctr - 1] +
                        cur[ctr + 1] +
                        cur[ld0 - 1] +
                        cur[ld0] +
                        cur[ld0 + 1]) >>
                        2) -
                        old[ctr])) |
                0;

            value = Math.abs(old[ctr]) | 0;
            if (old[ctr] > 0) {
                c[graphIndex] = value | 0;
                c[graphIndex + 1] = 0;
            } else {
                c[graphIndex] = 0;
                c[graphIndex + 1] = value | 0;
            }
            ++ctr;
            ++lu0;
            ++lu1;
            ++ld0;
            ++ld1;
            graphIndex += 4;
        }
        ctr = lineLookup[y] | 0;
        graphIndex = graphIndexLookup[y] | 0;
        until = lineEndLookup[y] | 0;
        lu1 = lineLookup[y - 2] | 0;
        lu0 = lineLookup[y - 1] | 0;
        ++y;
        ld0 = lineLookup[y] | 0;
        ld1 = lineLookup[y + 1] | 0;
    }
    gfx0.putImageData(wave, 0, 0);
}
function drawCustom() {
    let y = edgeUR | 0;
    let value = 0 | 0;
    const cur = tb[stepper];
    stepper = (stepper + 1) % 2 | 0;
    const old = tb[stepper];
    // letiables for the sim loop
    let ctr = lineLookup[y] | 0;
    let graphIndex = graphIndexLookup[y] | 0;
    let lu1 = lineLookup[y - 2] | 0;
    let lu0 = lineLookup[y - 1] | 0;
    let until = lineEndLookup[y] | 0;
    ++y;
    let ld0 = lineLookup[y] | 0;
    let ld1 = lineLookup[y + 1] | 0;
    while (y < edgeDL) {
        while (ctr < until) {
            //custom
            old[ctr] =
                (FRICTION *
                    (((cur[lu1 - 2] * ca[0] +
                        cur[lu1 - 1] * ca[1] +
                        cur[lu1] * ca[2] +
                        cur[lu1 + 1] * ca[3] +
                        cur[lu1 + 2] * ca[4] +
                        cur[lu0 - 2] * ca[5] +
                        cur[lu0 - 1] * ca[6] +
                        cur[lu0] * ca[7] +
                        cur[lu0 + 1] * ca[8] +
                        cur[lu0 + 2] * ca[9] +
                        cur[ctr - 2] * ca[10] +
                        cur[ctr - 1] * ca[11] +
                        cur[ctr + 1] * ca[13] +
                        cur[ctr + 2] * ca[14] +
                        cur[ld0 - 2] * ca[15] +
                        cur[ld0 - 1] * ca[16] +
                        cur[ld0] * ca[17] +
                        cur[ld0 + 1] * ca[18] +
                        cur[ld0 + 2] * ca[19] +
                        cur[ld1 - 2] * ca[20] +
                        cur[ld1 - 1] * ca[21] +
                        cur[ld1] * ca[22] +
                        cur[ld1 + 1] * ca[23] +
                        cur[ld1 + 2] * ca[24]) >>
                        2) -
                        old[ctr])) |
                0;
            value = Math.abs(old[ctr]) | 0;
            if (old[ctr] > 0) {
                c[graphIndex] = value | 0;
                c[graphIndex + 1] = 0;
            } else {
                c[graphIndex] = 0;
                c[graphIndex + 1] = value | 0;
            }
            ++ctr;
            ++lu0;
            ++lu1;
            ++ld0;
            ++ld1;
            graphIndex += 4;
        }
        ctr = lineLookup[y] | 0;
        graphIndex = graphIndexLookup[y] | 0;
        until = lineEndLookup[y] | 0;
        lu1 = lineLookup[y - 2] | 0;
        lu0 = lineLookup[y - 1] | 0;
        ++y;
        ld0 = lineLookup[y] | 0;
        ld1 = lineLookup[y + 1] | 0;
    }
    gfx0.putImageData(wave, 0, 0);
}

const waveTypes = [drawRook, drawBishop, drawKnight, drawKing, drawCustom];

setWAVETYPE = function (i) {
    WAVETYPE = i | 0;
};

setCOLOURS = function () {
    pCol = [
        document.getElementById("PR").value,
        document.getElementById("PG").value,
        document.getElementById("PB").value,
    ];
    //pOrder = [2,1,0];
    pCol = [
        document.getElementById("NR").value,
        document.getElementById("NG").value,
        document.getElementById("NB").value,
    ];
    //nOrder = [2,0,1];
};

setInterval(function () {
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    gfx0.clearRect(0, 0, WIDTH, HEIGHT);
    /*
	gfx1.clearRect(0,0,WIDTH,HEIGHT);
	gfx2.clearRect(0,0,WIDTH,HEIGHT);
	*/
    //waveTypes[WAVETYPE]();
    drawRook();
}, 1);

function myFunction() {
    document.getElementById("demo").innerHTML = "Hello World";
}

let HOLDING = false;
let last = [0, 0];
document.onmousedown = function (event) {
    HOLDING = true;
    const x = (event.clientX / tileSize) | 0;
    const y = (event.clientY / tileSize) | 0;
    if (x < gridSize && y < gridSize) {
        tb[stepper][y * gridSize + x] += POWER;
    }
    last = [x, y];
};
document.onmouseup = function (event) {
    HOLDING = false;
    const x = (event.clientX / tileSize) | 0;
    const y = (event.clientY / tileSize) | 0;
    if (x < gridSize && y < gridSize) {
        tb[stepper][y * gridSize + x] += POWER;
    }
    last = [x, y];
};
document.onmousemove = function (event) {
    if (HOLDING) {
        const x = (event.clientX / tileSize) | 0;
        const y = (event.clientY / tileSize) | 0;
        while (last[0] != x || last[1] != y) {
            if (
                last[0] < edgeDL &&
                last[0] > edgeUR &&
                last[1] > edgeUR &&
                last[1] < edgeDL
            ) {
                tb[stepper][last[1] * gridSize + last[0]] += POWER;
            }
            last[0] += Math.sign(x - last[0]);
            last[1] += Math.sign(y - last[1]);
        }
    }
};
