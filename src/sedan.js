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
        this.resty = position.cavasHeight + 25;
    }
    else{
        this.y = -50;
        this.resty = -50;
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
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
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

Sedan.prototype.reset = function(){
    this.y = this.resety;
};