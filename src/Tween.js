define(function(require, exports, module){
  var util = require('./utils');

  var Tween = function(args){
    this.tweens = [];
    this._index = 0;
    this.tweens.push(args);
    this._initTween();
    this.stuate = this.run ? 'animating' : 'pause';
    this.ease = this.ease || 'Linear.EaseNone';
  };
  
  Tween.prototype = {
    _initTween : function(){
      var args = this.tweens[this._index++];
      util.extend(this,args);
      this.lastTime = - this.delay;
      this._deltaVal = {};
      this._value = {};
      var value = this.value || this.delta;
      
      for(var key in value ){   
        if(   this.obj[key] !== undefined 
           && typeof value[key] == 'number' 
           && typeof this.obj[key] == 'number')
        {
          if(this.value){
            this._value = this.value;
            this._deltaVal[key] = this._value[key] - this.obj[key];
          }
          else{
            this._deltaVal = this.delta;
            this._value[key] = this._deltaVal[key] + this.obj[key];
          }
        }
      }
    },
    
    step : function(sTime){
      if(this.stuate != 'animating') return;
      this.lastTime += sTime;
      if(this.lastTime >= (this.duration + sTime) ){
        if(this.tweens.length > this._index){
          this._initTween();
        }else{
          if(this.loop){
            this._index = 0;
            this._initTween();
          }else{
            this.lastTime = this.duration;
            this.stuate = 'over';
          }
        }
      }else if(this.lastTime > 0){
        if(this.lastTime > this.duration)
          this.lastTime = this.duration
        this._stepValue();
      }
    },
    
    to : function(args){
      this.tweens.push(args);
      return this;
    },
    
    _stepValue : function(){
      var easeType = this.ease.split('.');
      var dot = Math.Easing[easeType[0]][easeType[1]]( this.lastTime / this.duration );
      for(var key in this._deltaVal){
        this.obj[key] = this._value[key] - (1 - dot) * this._deltaVal[key];
      }
    },
    
    reset : function(){
      this._index = 0;
      this._initTween();
      this.stuate = 'animating';
    },
    
    start : function(){
      this.stuate = 'animating';
    },
    
    pause : function(){
      this.stuate = 'pause';
    }
  };
  module.exports = Tween;
});
