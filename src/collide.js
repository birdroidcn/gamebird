define(function(require, exports, module){
  exports.isRectCollide = function(v1,v2){
      //比较包含矩形的最小矩形
      if(v2.maxX > v1.minX && v2.minX< v1.maxX && v1.maxY>v2.minY && v1.minY < v2.maxY){
          return true;
      }else{
          return false;
      }
      //todo:叉积判断矩形是否相交
  };
});
