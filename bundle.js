(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
var crate1 = new Crate({row:3, place: 50});
var crate2 = new Crate({row:3, place: 220});
var crate3 = new Crate({row:3, place: 375});
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
    player.update(elapsedTime, canvas);


    if (player.checkForCollision(player, sedan1)){
        player.state = 'dead';
        console.log('you got hit by a truck bro');
    }

    if (player.state == 'dead'){
        if (player.lives == 0){
            //gameover
        }
        else{
            player.lives -=1;
            player.state = 'idle';
            player.x = 0;

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
    ctx.drawImage(grass, 64*4, 0, 64, canvas.height);
    
    player.render(elapsedTime, ctx);

    // em.renderCells(ctx);
}
},{"./crate.js":2,"./game.js":3,"./player.js":4,"./river.js":5,"./sedan.js":6}],2:[function(require,module,exports){
"use strict";

const MS_PER_FRAME = 1000 / 8;

/**
 * @module exports the Player class
 */
module.exports = exports = Crate;

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Crate(position) {
    this.state = "idle";
    this.row = position.row;
    this.y = position.place;
    this.direction = Math.round(Math.random() * (1));
    this.width = 64;
    this.height = 64;
    this.spritesheet = new Image();
    this.spritesheet.src = encodeURI('assets/tex_crate.svg');
    this.x = 64*this.row;

    this.timer = 0;
    this.frame = 0;
    this.speed = Math.round(Math.random() * (2 - 1) + 1);

    var self = this;

}

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Crate.prototype.update = function (time, canvas) {
    // console.log(this.row, this.x, this.y);
    switch (this.direction) {
        case 0:
            // if (this.y < 430)
            // {
            //     this.y+=this.speed;
            // }
            // else{
            //     this.y = -20;
            // }
            break;
    }
};
/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Crate.prototype.render = function(time, ctx, canvas) {
    if (this.state == 'hostile'){
        ctx.drawImage(this.spritesheet, this.row*64, this.y, 0, 0);
    }
    else{
        ctx.drawImage(this.spritesheet, this.row*64, this.y, 64, 64);
    }
};
},{}],3:[function(require,module,exports){
"use strict";

/**
 * @module exports the Game class
 */
module.exports = exports = Game;

/**
 * @constructor Game
 * Creates a new game object
 * @param {canvasDOMElement} screen canvas object to draw into
 * @param {function} updateFunction function to update the game
 * @param {function} renderFunction function to render the game
 */
function Game(screen, updateFunction, renderFunction) {
    this.update = updateFunction;
    this.render = renderFunction;

    // Set up buffers
    this.frontBuffer = screen;
    this.frontCtx = screen.getContext('2d');
    this.backBuffer = document.createElement('canvas');
    this.backBuffer.width = screen.width;
    this.backBuffer.height = screen.height;
    this.backCtx = this.backBuffer.getContext('2d');

    // Start the game loop
    this.oldTime = performance.now();
    this.paused = false;
}

/**
 * @function pause
 * Pause or unpause the game
 * @param {bool} pause true to pause, false to start
 */
Game.prototype.pause = function (flag) {
    this.paused = (flag == true);
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
Game.prototype.loop = function (newTime) {
    var game = this;
    var elapsedTime = newTime - this.oldTime;
    this.oldTime = newTime;

    if (!this.paused) this.update(elapsedTime);
    this.render(elapsedTime, this.frontCtx);

    // Flip the back buffer
    this.frontCtx.drawImage(this.backBuffer, 0, 0);
};

},{}],4:[function(require,module,exports){
"use strict";

const MS_PER_FRAME = 1000 / 8;

/**
 * @module exports the Player class
 */
module.exports = exports = Player;

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Player(position) {
    this.state = "idle";
    this.x = position.x;
    this.y = position.y;
    this.lives = 3;
    this.width = 54;
    this.height = 64;
    this.spritesheet = new Image();
    this.spritesheet.src = encodeURI('assets/PlayerSprite2.png');
    this.spritesheetReverse = new Image();
    this.spritesheetReverse.src = encodeURI('assets/PlayerSprite2Reverse.png');
    this.timer = 0;
    this.frame = 0;

    var self = this;
    window.onkeydown = function (event) {

        if (self.state == 'idle' && event.keyCode == 39) {
            self.state = 'moving-right';
        }
        else if (self.state == 'idle' && event.keyCode == 37) {
            self.state = 'moving-left';
        }
        else if (self.state == 'idle' && event.keyCode == 38) {
            self.state = 'moving-up';
        }
        else if (self.state == 'idle' && event.keyCode == 40) {
            self.state = 'moving-down';
        }

    };
    window.onkeyup = function (event) {
        if (self.state == 'moving-right' && event.keyCode == 39) {
            self.state = 'idle';
        }
        else if (self.state == 'moving-left' && event.keyCode == 37) {
            self.state = 'idle';
        }
        else if (self.state == 'moving-up' && event.keyCode == 38) {
            self.state = 'idle';
        }
        else if (self.state == 'moving-down' && event.keyCode == 40) {
            self.state = 'idle';
        }
    }
}

Player.prototype.checkForCollision = function(entity1, entity2) {
    var collides = !(entity1.x + entity1.width < entity2.x ||
    entity1.x > entity2.x + entity2.width ||
    entity1.y + entity1.height < entity2.y ||
    entity1.y > entity2.y + entity2.height);
    if(collides) {
        return true;
    }
};

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Player.prototype.update = function (time, ctx) {
    switch (this.state) {
        case "idle":
            this.timer += time;
            if (this.timer > MS_PER_FRAME) {
                this.timer = 0;
                this.frame += 1;
                if (this.frame > 3) this.frame = 0;
            }
            break;
        // TODO: Implement your player's update by state
        case "moving-right":
            if ((this.x + 1) < 701) { this.x++; }
            else {
                this.x = 700;
            }
            this.timer += time;
            if (this.timer > MS_PER_FRAME) {
                this.timer = 0;
                this.frame += 1;
                if (this.frame > 3) this.frame = 0;
            }
            break;
        case "moving-left":
            if (-1 < (this.x - 1)) { this.x--; }
            this.timer += time;
            if (this.timer > MS_PER_FRAME) {
                this.timer = 0;
                this.frame += 1;
                if (this.frame > 3) this.frame = 0;
            }
            break;
        case "moving-up":
            if (-1 < (this.y - 1)) { this.y--; }
            this.timer += time;
            if (this.timer > MS_PER_FRAME) {
                this.timer = 0;
                this.frame += 1;
                if (this.frame > 3) this.frame = 0;
            }
            break;
        case "moving-down":
            if ((this.y + 1) < 416 ) { this.y++; }
            this.timer += time;
            if (this.timer > MS_PER_FRAME) {
                this.timer = 0;
                this.frame += 1;
                if (this.frame > 3) this.frame = 0;
            }
            break;
    }
};

/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Player.prototype.render = function (time, ctx) {
    switch (this.state) {
        case "idle":
            ctx.drawImage(
                // image
                this.spritesheet,
                // source rectangle
                this.frame * 64, 64, this.width, this.height,
                // destination rectangle
                this.x, this.y, this.width, this.height
            );
            break;
        // TODO: Implement your player's redering according to state
        case "moving-right":
        case "moving-up":
        case "moving-down":
            ctx.drawImage(
                // image
                this.spritesheet,
                // source rectangle
                this.frame * 64, 0, this.width, this.height,
                // destination rectangle
                this.x, this.y, this.width, this.height
            );
            break;
        case "moving-left":
            ctx.drawImage(
                // image
                this.spritesheetReverse,
                // source rectangle
                this.frame * 64, 0, this.width, this.height,
                // destination rectangle
                this.x, this.y, this.width, this.height
            );
            break;
    }
};

},{}],5:[function(require,module,exports){
"use strict";

const MS_PER_FRAME = 1000 / 8;

/**
 * @module exports the Player class
 */
module.exports = exports = River;

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function River(position) {
    this.state = "drive";
    this.type = 'water';
    this.row = position.row;
    this.direction = Math.round(Math.random() * (1));
    this.width = 64;
    this.height = 64;
    this.spritesheet = new Image();
    this.spritesheet.src = encodeURI('assets/tex_water.jpg');
    this.x = 64*this.row;
    this.y = 0;

    this.timer = 0;
    this.frame = 0;
    this.speed = Math.round(Math.random() * (2 - 1) + 1);

    var self = this;

}

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
River.prototype.update = function (time, canvas) {
    // console.log(this.row, this.x, this.y);
    switch (this.direction) {
        case 0:
            if (this.y < 430)
            {
                this.y+=this.speed;
            }
            else{
                this.y = -20;
            }
            break;
    }
};
/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
River.prototype.render = function(time, ctx, canvas) {
    ctx.drawImage(this.spritesheet, this.row*64, 0, 64, canvas.height);
};
},{}],6:[function(require,module,exports){
"use strict";

const MS_PER_FRAME = 1000 / 8;

/**
 * @module exports the Player class
 */
module.exports = exports = Sedan;

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Sedan(position) {
    this.state = "drive";
    this.type = 'hostile';
    this.row = position.row;
    this.direction = Math.round(Math.random() * (1));
    this.width = 64;
    this.height = 64;
    this.spritesheet = new Image();
    this.ground = new Image();
    this.ground.src = encodeURI('assets/tex_road.jpg');
    this.x = 64*this.row;
    if (this.direction == 0){
        this.spritesheet.src = encodeURI('assets/TRBRYcars [Converted] sedan.png');
        this.y = position.cavasHeight + 25;
    }
    else{
        this.y = -50;
        this.spritesheet.src = encodeURI('assets/TRBRYcars [Converted] sedan-Reversed.png');
    }

    this.timer = 0;
    this.frame = 0;
    this.speed = Math.round(Math.random() * (2 - 1) + 1);

    var self = this;

}

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Sedan.prototype.update = function (time, canvas) {
    // console.log(this.row, this.x, this.y);
    switch (this.direction) {
        case 0:
            if (this.y < 430)
            {
                this.y+=this.speed;
            }
            else{
                this.y = -20;
            }
            break;
        case 1:
            if ((-25 - this.height) < this.y)
            {
                this.y-=this.speed;
            }
            else{
                this.y = canvas.height + 25;
            }
            break;
    }
};
/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Sedan.prototype.render = function(time, ctx, canvas) {
    //rendering too much i think.
    ctx.drawImage(this.ground,
        this.row*64, 0, this.width, canvas.height);
    ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        0, 0, this.spritesheet.width, this.spritesheet.height,
        this.x, this.y, this.width, this.height
    );
};
},{}]},{},[1]);
