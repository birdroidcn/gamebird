define(function(require, exports, module){

var EventDispatcher = function()
{
  
};

EventDispatcher.prototype.bind = function(type, listener)
{
  if(!this._eventMap) this._eventMap = {};
  var map = this._eventMap[type];
    if(map == null) map = this._eventMap[type] = [];
    
    if(map.indexOf(listener) == -1)
    {
      map.push(listener);
      return true;
    }
    return false;
};
EventDispatcher.prototype.isBindType = function(type){
    if(!this._eventMap) this._eventMap = {};

    var map = this._eventMap[type];
    return map == null ? false : true;
};

EventDispatcher.prototype.unbind = function(type, listener)
{
  if(!this._eventMap) this._eventMap = {};
  
  if(arguments.length == 0) return this.unbindAll();
  if(arguments.length == 1) return this.unbindByType(type);
  
  var map = this._eventMap[type];
  if(map == null) return false;

  for(var i = 0; i < map.length; i++)
  {
    var li = map[i];
    if(li === listener)
    {
      map.splice(i, 1);
      if(map.length == 0) delete this._eventMap[type];
      return true;
    }
  }
  return false;
};

EventDispatcher.prototype.unbindByType = function(type)
{
  var map = this._eventMap[type];
    if(map != null)
  {
    delete this._eventMap[type];
    return true;
  }
  return false;
};


EventDispatcher.prototype.unbindAll = function()
{ 
  this._eventMap = {};
};

EventDispatcher.prototype.trigger = function(event)
{
  var map = this._eventMap[event.type];
  if(map == null) return false; 
  if(!event.target) event.target = this;
    map = map.slice();

  for(var i = 0; i < map.length; i++)
  {
    var listener = map[i];
    if(typeof(listener) == "function")
    {
      listener.call(this, event);
    }
  }
  return true;
};

module.exports = EventDispatcher;

});
