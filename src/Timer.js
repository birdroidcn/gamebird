define(function(require, exports, module){
  /**
   *@overview Timer class ,control refresh frequency of canvas
   */
  var Timer =  function(interval){
  this.interval = interval || 50;
  this.paused = false;  
  this.info = {lastTime:0, currentTime:0, deltaTime:0, realDeltaTime:0};

  this._startTime = 0;
  this._intervalID = null;
  this._listeners = []; 
  };

  Timer.prototype= {
  
    constructor : Timer ,
  
    start : function(){
      if(this._intervalID != null) return;
      this._startTime = this.info.lastTime = this.info.currentTime = Date.now();
      var me = this;
      var run = function(){
        me._intervalID = setTimeout(run, me.interval);
        me._run();
      };
      run();
    },
    
    stop : function(){
      clearTimeout(this._intervalID);
      this._intervalID = null;
      this._startTime = 0;
    },
  
    pause : function(){
      this.paused = true;
    },
  
    resume : function(){
      this.paused = false;
    },
  
    _run : function() {
      if(this.paused) return;

      var info = this.info;
      var time = info.currentTime = Date.now();
      info.deltaTime = info.realDeltaTime = time - info.lastTime;
    
      for(var i = 0, len = this._listeners.length, obj, runTime; i < len; i++)
      {
        obj = this._listeners[i];
        runTime = obj.__runTime || 0;
        if(runTime == 0)
        {
          obj.step(this.info.deltaTime);
        }else if(time > runTime)
        {
          obj.step(this.info.deltaTime);
          this._listeners.splice(i, 1);
          i--;
          len--;
        }
      }
    
      info.lastTime = time;
    },
    addListener  : function(obj){
      if(obj == null || typeof(obj.step) != "function") throw "Timer Error: The listener object must implement a step() method!";
        this._listeners.push(obj); 
    },
  
    removeListener  : function(obj) {
      var index = this._listeners.indexOf(obj);
      if(index > -1)
      {
        this._listeners.splice(index, 1);
      }
    }
  };
  
  module.exports = Timer;

});
