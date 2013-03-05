define(function(require, exports, module) {
  var Stage = require('./Stage'),
      Good = require('./Good'),
      Tween = require('./Tween'),
      Timer = require('./Timer');
  var GameBird = {
    stages : [],
    
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
  
    
    switchStage : function(id){
      
    },
    
    Tween : Tween
  };
  module.exports = GameBird;
});