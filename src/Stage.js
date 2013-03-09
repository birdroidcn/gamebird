define(function(require, exports, module){
  var util = require('./utils'),
      Good = require('./Good'),
      collide = require('./collide');
  /**
   *@overview game scene ,control all goods in it
   *@param {HTMLDivElement} container
   *@param {obj} opt
   * {
   *   height: (height of canvas)
   *   width :
   *   background :
   *   id:
   * }
   */
  var Stage = function(container,opt){
    if(!container || !container instanceof HTMLDivElement) throw 'illegalargumentexception';
    util.extend(this,opt);
    //preload  img 
    if(opt.background){
      var temp = new Image();
      temp.src = opt.background.src;
      this.background = temp;
    }
    var canvas = document.createElement('canvas');
    util.extend(canvas, {id:opt.id,
                         height:opt.height || container.offsetHeight,
                         width:opt.width || container.offsetWidth});
    container.appendChild(canvas);
    this.canvas = canvas;
    this.initCanvas();
    this.ctx = canvas.getContext('2d');
    this.goods = [];     
  };
  // prototype function
  Stage.prototype = {  
    initCanvas :function(){
      var self = this;
      //listen click event
      //todo : othor event type
      this.canvas.addEventListener('click',function(evt){
        var  rect= this.getBoundingClientRect();
        self.clickP = {x:evt.clientX - rect.left,
                       y:evt.clientY - rect.top};
      });
    },
    
    add : function(good){
      if( good instanceof Good){
        this.goods.push(good);
      }else{
        throw 'arg must be instance of Good';
      }
    },
    
    draw : function(){
      var self = this;
      this.goods.forEach(function(good){
        self._drawGood(good);
      });      
    },
    //draw every good on canvas
    _drawGood : function(good){
      var tween = good.tween,
          start = good.start,
          matrix = good.getMatrix(),
          ctx = this.ctx;

      ctx.save();
      ctx.beginPath();
      ctx.transform( matrix.a, matrix.b, matrix.c,
                          matrix.d, matrix.e, matrix.f );
     
      ctx.fillStyle = good.color;
      ctx.rect(0, 0, good.rect.w, good.rect.h);
      if(!good.image){
        ctx.fill();
      }else{
        ctx.drawImage(good.image, start.x || 0, start.y || 0 , good.rect.w, good.rect.h);
      }
      //trigger click event when one goods is clicked
      if( this.clickP && ctx.isPointInPath(this.clickP.x,this.clickP.y)){
        good.trigger({type:'click'});
      }
      
      ctx.closePath();
      ctx.restore();
    },
    
    _clear : function(){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    //redraw,collide test,handle events  per flush
    step : function(stepTime){
      var self = this;
      this._collide();
      this._clear();
      this._drawBackground();
      this.goods.forEach(function(good){
        var tween = good.tween;
        if(tween)
          tween.step(stepTime);
        self._drawGood(good);
      });           
      this.clickP = null;
    },
    
    _drawBackground : function(){
      if(this.background)
        this.ctx.drawImage(this.background,0,0);
    },
    //test whether there are collision among these goods
    _collide : function(){
      for(var i=0,len = this.goods;i<len;i++){
        var v = this.goods[i].getBounds();
        for(var j=i;j<len;j++){
          var v1 = this.good[j].getBounds();
          if(Collide.isRectCollide(v,v1)){
            
          }
        }
      }       
    }
  };
  
  module.exports = Stage; 
});
