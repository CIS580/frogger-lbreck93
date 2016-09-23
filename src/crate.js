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
    this.setstat = Math.round(Math.random() * (1));
    if (this.setstat){
        this.state = "floaty";
    }
    else{
        this.state = "sink";
    }

    this.row = position.row;
    this.y = position.place;

    this.width = 64;
    this.height = 64;
    this.spritesheet = new Image();
    this.spritesheet.src = encodeURI('assets/tex_crate.svg');
    this.x = 64*this.row;

    this.timer = 0;
    this.frame = 0;
    this.show = 5000;
    this.hide = 1000;

    var self = this;

}

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Crate.prototype.update = function (time, canvas) {
    // console.log(this.row, this.x, this.y);
    this.timer += time;
    switch (this.state) {
        case 'floaty':
            if (this.timer >= this.show)
            {
                this.state = 'sink';
                this.timer = 0;
            }
            break;
        case "sink":
            if(this.timer >= this.hide)
            {
                this.state = "floaty";
                this.timer = 0;
            }
            break;
    }
};
/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Crate.prototype.render = function(time, ctx, canvas) {
    if (this.state == 'sink'){
        // ctx.drawImage(this.spritesheet, this.row*64, this.y, 64, 64);
    }
    else{
        ctx.drawImage(this.spritesheet, this.row*64, this.y, 64, 64);
    }
    if (this.state == 'floaty'){
        ctx.strokeStyle = 'blue';
    }
    else{
        ctx.strokeStyle = 'red';
    }
    ctx.strokeRect(this.x, this.y, this.width, this.height);
};