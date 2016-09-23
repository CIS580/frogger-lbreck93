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