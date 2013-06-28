objectpool
==========

reuse object instance to avoid GC tax

##Usage

```javascript

function Car() {
  this.init();  
}

Car.prototype.init = function(rate) {
  this.rating = rate;
}

var carPool = new ObjectPool(Car);

var pagani = carPool.alloc(8.9);
var hennessey = carPool.alloc(10);
var koenigsegg = carPool.alloc(9.4);

carPool.free(hennessey); //return to pool

```


