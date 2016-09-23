"use strict;"

/* Classes */
const Game = require('./game.js');
const Player = require('./player.js');
const Sedan = require('./sedan.js');
const River = require('./river.js');
const Crate = require('./crate.js');
// const EntityManager = require('./EntityManager.js');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var player = new Player({x: 0, y: 240});
var grass = new Image();
grass.src = encodeURI('assets/tex_grass.jpg');
//starts at row 2 because player is in row 1
var sedan1 = new Sedan({row: 1, cavasHeight: canvas.height});
var sedan2 = new Sedan({row: 2, cavasHeight: -50});
var sedan3 = new Sedan({row: 3, cavasHeight: canvas.height});

var river1 = new River({row:3, canvasHeight: canvas.height});
var crate1 = new Crate({row:3, place: 20});
var crate2 = new Crate({row:3, place: 125});
var crate3 = new Crate({row:3, place: 250});
var crate4 = new Crate({row:3, place: 370});
// var em = new EntityManager(canvas.width, canvas.height, 64);
//
// em.addEntity(player);
//
// em.addEntity(sedan1);
// em.addEntity(sedan2);
// em.addEntity(sedan3);
//
// em.addEntity(river1);
// em.addEntity(crate2);
// em.addEntity(crate3);

// var sedans = [];
// sedans[0] = new Sedan({x:64, y: canvas.height + 25}, 'up');
// sedans[1] = new Sedan({x:64*2, y: -50}, 'down');
// sedans[2] = new Sedan({x:63*3, y: -50}, 'down');

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function (timestamp) {
    game.loop(timestamp);
    window.requestAnimationFrame(masterLoop);
};
masterLoop(performance.now());

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
    // TODO: Update the game objects
    //updates game cars
    sedan1.update(elapsedTime, canvas);
    sedan2.update(elapsedTime, canvas);
    sedan3.update(elapsedTime, canvas);

    //updates water
    river1.update(elapsedTime, canvas);
    crate1.update(elapsedTime, canvas);
    crate2.update(elapsedTime, canvas);
    crate3.update(elapsedTime, canvas);
    crate4.update(elapsedTime, canvas);
    player.update(elapsedTime, canvas);


    if (player.checkForCollision(player, sedan1)){
        player.state = 'dead';
        console.log('you got hit by a truck bro');
    }
    if (player.checkForCollision(player, sedan2)){
        player.state = 'dead';
        console.log('you got hit by a truck bro');
    }
    // bootleg water check
    if (192 < player.x || player.x < 256){
        if ((player.checkForCollision(player, crate1) && crate1.state == 'sink')||
            (player.checkForCollision(player, crate2) && crate2.state == 'sink')||
            (player.checkForCollision(player, crate3) && crate3.state == 'sink')||
            (player.checkForCollision(player, crate4) && crate4.state == 'sink')){
            player.state = 'dead';
            console.log('froggy drowned, what?');
        }
    }

    if (player.state == 'dead'){
        if (player.lives == 0){
            player.state = 'gameover';
            player.x = 500;
            player.y = 200;
        }
        else{
            player.lives -=1;
            player.state = 'idle';
            player.x = 0;
            sedan1.reset();
            sedan2.reset();

        }
    }

    //update entities
    // em.updateEntity(player);
    //
    // em.updateEntity(sedan1);
    // em.updateEntity(sedan2);
    // em.updateEntity(sedan3);
    //
    // em.updateEntity(river1);
    //
    // em.updateEntity(crate1);
    // em.updateEntity(crate2);
    // em.updateEntity(crate3);

    //update all elements, check to see if there is collision


}

/**
 * @function render
 * Renders the current game state into a back buffer.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 * @param {CanvasRenderingContext2D} ctx the context to render to
 */
function render(elapsedTime, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(grass, 0, 0, 64, canvas.height);
    
    sedan1.render(elapsedTime, ctx, canvas);
    sedan2.render(elapsedTime, ctx, canvas);

    river1.render(elapsedTime, ctx, canvas);
    crate1.render(elapsedTime, ctx, canvas);
    crate2.render(elapsedTime, ctx, canvas);
    crate3.render(elapsedTime, ctx, canvas);
    crate4.render(elapsedTime, ctx, canvas);
    ctx.drawImage(grass, 64*4, 0, 64, canvas.height);
    
    player.render(elapsedTime, ctx);
    if (player.state == 'gameover'){
        // ctx.drawImage(gameover, 64*6, 0, canvas.width/3, canvas.height)
    }

    // em.renderCells(ctx);
}