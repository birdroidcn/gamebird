define(function(require, exports, module){
  var util = require('./utils'),
      Good = require('./Good'),
      collide = require('./collide');
  
  var Stage = function(opt){
    if(!opt.container || !opt.container instanceof HTMLDivElement) throw 'illegalargumentexception';
    util.extend(this,opt);
    //preload  img 
    if(opt.background){
      var temp = new Image();
      temp.src = opt.background.src;
      this.background = temp;
    }
    var canvas = document.createElement('canvas');
    util.extend(canvas, {id:opt.id,
                         height:opt.height || opt.container.offsetHeight,
                         width:opt.width || opt.container.offsetWidth});
    opt.container.appendChild(canvas);
    this.canvas = canvas;
    this.initCanvas();
    this.ctx = canvas.getContext('2d');
    this.goods = [];
  };
  
  Stage.prototype = {  
    initCanvas :function(){
      var self = this;
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
      if( this.clickP && ctx.isPointInPath(this.clickP.x,this.clickP.y)){
        good.trigger({type:'click'});
      }
      
      ctx.closePath();
      ctx.restore();
    },
    
    _clear : function(){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    
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
   
    _collide : function(){
      for(var i=0,len = this.goods.length;i<len;i++){
        var good = this.goods[i];
        if(good.isBindType('collide')){
            var v1 = good.getBounds();
            for(var j=0;j<len;j++){
              if(j==i) continue;
              var v2 = this.goods[j].getBounds();
              if(collide.isRectCollide(v1,v2)){
                  good.trigger({type:'collide',good:good[j]});
              }
            }
        }
      }       
    }
  };
  
  module.exports = Stage; 
});
