define(function(require, exports, module){
  var util = require('./utils');

  var Matrix  = function(args)
  {
    util.extend(this,args)
  };
  
  Matrix.prototype.concat = function(mtx)
  {
    var a = this.a;
    var c = this.c;
    var e = this.e;
    
    this.a = a * mtx.a + this.b * mtx.c;
    this.b = a * mtx.b + this.b * mtx.d;
    this.c = c * mtx.a + this.d * mtx.c;
    this.d = c * mtx.b + this.d * mtx.d;
    this.e = e * mtx.a + this.f * mtx.c + mtx.e;
    this.f = e * mtx.b + this.f * mtx.d + mtx.f;
    return this;
  };
  
  Matrix.prototype.rotate = function(theta,x,y)
  {
    var ct=Math.cos(theta),
        st=Math.sin(theta);
    
    this.concat(new Matrix({a:ct,b:-st,c:st,d:ct,e:-x*ct-y*st+x,f:x*st-y*ct+y}));
    return this;
  };
  
  Matrix.prototype.scale = function(sx, sy)
  {
    this.a *= sx;
    this.d *= sy;
    this.e *= sx;
    this.f *= sy;
    return this;
  };
  
  Matrix.prototype.translate = function(dx, dy)
  {
    this.e += dx;
    this.f += dy;
    return this;
  };
  
  Matrix.prototype.identity = function()
  {
    this.a = this.d = 1;
    this.b = this.c = this.e = this.f = 0;
    return this;
  };
  
  Matrix.prototype.invert = function()
  {
    var a = this.a;
    var b = this.b;
    var c = this.c;
    var d = this.d;
    var e = this.e;
    var i = a * d - b * c;
    
    this.a = d / i;
    this.b = -b / i;
    this.c = -c / i;
    this.d = a / i;
    this.e = (c * this.f - d * e) / i;
    this.f = -(a * this.f - b * e) / i;
    return this;
  };
  
  Matrix.prototype.transformPoint = function(point, round, returnNew)
  {
    var x = point.x * this.a + point.y * this.c + this.e;
    var y = point.x * this.b + point.y * this.d + this.f;
    if(round)
    {
      x = x + 0.5 >> 0;
      y = y + 0.5 >> 0;
    }
    if(returnNew) return {x:x, y:y};
    point.x = x;
    point.y = y;
    return point;
  };
  
  Matrix.prototype.clone = function()
  {
    return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
  };
  
  Matrix.prototype.toString = function()
  {
    return "(a="+this.a+", b="+this.b+", c="+this.c+", d="+this.d+", e="+this.e+", f="+this.f+")";
  };  
  
  module.exports = Matrix;
  
});
