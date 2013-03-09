define(function(require, exports, module) {
  var Stage = require('./Stage'),
      Good = require('./Good'),
      Tween = require('./Tween'),
      Timer = require('./Timer');
  /**
   * @overview API for users
   */
  var GameBird = {
    stages : [],         //queue of game scene
    
    createStage : function(opt){
      var stage = new Stage(opt);
      this.stages.push(stage);
      return stage;
    },
    
    createGood : function(opt){
      var good = new Good(opt);
      return good;
    },
    
    createTimer : function(interval){
      var timer = new Timer(interval);
      return timer;
    },
    //todo
    switchStage : function(id){
      
    },
    Tween : Tween
  };
  module.exports = GameBird;
});