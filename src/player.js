"use strict";

const MS_PER_FRAME = 1000/8;

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
  this.width  = 64;
  this.height = 64;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/PlayerSprite2.png');
  this.spritesheetReverse  = new Image();
  this.spritesheetReverse.src = encodeURI('assets/PlayerSprite2Reverse.png');
  this.timer = 0;
  this.frame = 0;

  var self = this;
  window.onkeydown = function(event) {
     console.log(event);
    if(self.state == 'idle' && event.keyCode == 39){
      self.state = 'moving-right';
    }
    else if(self.state == 'idle' && event.keyCode == 37){
      self.state = 'moving-left';
    }
    else if(self.state == 'idle' && event.keyCode == 38){
      self.state = 'moving-up';
    }
    else if(self.state == 'idle' && event.keyCode == 40){
      self.state = 'moving-down';
    }

  }
  window.onkeyup = function(event){
    if (self.state == 'moving-right' && event.keyCode == 39){
      self.state = 'idle';
    }
    else if(self.state == 'moving-left' && event.keyCode == 37){
      self.state = 'idle';
    }
    else if(self.state == 'moving-up' && event.keyCode == 38){
      self.state = 'idle';
    }
    else if(self.state == 'moving-down' && event.keyCode == 40){
      self.state = 'idle';
    }
  }
}

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Player.prototype.update = function(time) {
  switch(this.state) {
    case "idle":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
    // TODO: Implement your player's update by state
    case "moving-right":
      this.x++;
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
    case "moving-left":
      this.x--;
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
    case "moving-up":
      this.y--;
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
    case "moving-down":
      this.y++;
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
  }
};

/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Player.prototype.render = function(time, ctx) {
  switch(this.state) {
    case "idle":
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64,64, this.width, this.height,
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
