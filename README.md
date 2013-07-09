GameBird
========
a mini hmt5  game framework(to be continued)
# example
```
define(function(require, exports, module){
  var GameBird = require('./GameBird'),

  var container = document.getElementById('game'),
      stage = GameBird.createStage(container,{
                id : 'test',
                background : {src : 'background.jpg'},
                width : 524,
                height : 304
              }),
      good = GameBird.createGood({
               id : 'test',
               transform : {a:1,b:0,c:0,d:1,e:200,f:100},
               rotate : {deg:0,x:0,y:0},
               rect : {w:50,h:50},
               color : '#ff0'
             }),
      jump = new GameBird.Tween({ obj:good.transform,
                               value: {f:0},
                               delay : 0,
                               duration : 500,
                               ease : 'Quadratic.EaseOut',
                               loop : false,
                               run : false
                }).to({
                               value: {f:100},
                               delay : 0,
                               duration : 400,
                               ease : 'Quadratic.EaseIn'
                }),

  good.bind('collide',function(){
    console.log(1);
    });
  clone = util.cloneObj(good);
  clone.transform  = {a:1,b:0,c:0,d:1,e:400,f:100};
  stage.add(good);
  stage.add(clone);
  timer = GameBird.createTimer(1000/60);
  timer.addListener(stage);
  timer.addListener(jump);
  timer.start();

  document.onkeydown = function(evt){
    switch(evt.keyCode){
      case 38 :
        if(jump.stuate == 'pause')
          jump.start();
        if(jump.stuate == 'over')
          jump.reset();
        break;
    }
  };
});

```
