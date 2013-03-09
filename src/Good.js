define(function(require, exports, module){
  var util = require('./utils'),
      Matrix = require('./Matrix'),
      EventDispatcher = require('./EventDispatcher');
  /**
   * @overview good is the element of stage,can be add  event(collide,click event)
   * @param {Object} arg
   * {
   *    id : 'test',
   *    transform : {a:1,b:0,c:0,d:1,e:200,f:100},  initial matrix
   *    rotate : {deg:0,x:0,y:0},
   *    rect : {w:50,h:50},
   *    color : '#ff0'
   * }
   */
  var Good = function(arg){
    util.extend(this,arg);
  };
  //prototype chain
  Good.prototype = new EventDispatcher();
  Good.prototype.getMatrix = function(){
      var matrix = new Matrix(this.transform);
      if(this.rotate){
        matrix.rotate(this.rotate.deg * Math.DEG_TO_RAD || 0,
                           this.rotate.x || 0,
                           this.rotate.y || 0);
      
      }  
      return matrix;    
    };
    
  Good.prototype.getBounds = function(){
    
    var w = this.width, h = this.height;
    var mtx = this.getConcatenatedMatrix();
    
    var poly = this.polyArea || [{x:0, y:0}, {x:w, y:0}, {x:w, y:h}, {x:0, y:h}];
    
    var vertexs = [], len = poly.length, v, minX, maxX, minY, maxY; 
    v = mtx.transformPoint(poly[0], true, true);
    minX = maxX = v.x;
    minY = maxY = v.y;
    vertexs[0] = v;
    
    for(var i = 1; i < len; i++)
    {
      var v = mtx.transformPoint(poly[i], true, true);
      if(minX > v.x) minX = v.x;
      else if(maxX < v.x) maxX = v.x;
      if(minY > v.y) minY = v.y;
      else if(maxY < v.y) maxY = v.y;
      vertexs[i] = v;
    }
    
    vertexs.x = minX;
    vertexs.y = minY;
    vertexs.width = maxX - minX;
    vertexs.height = maxY - minY;
    return vertexs;
  };

  
  module.exports = Good;
});