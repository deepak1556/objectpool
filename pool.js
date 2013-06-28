(function(context) {

    context.ObjectPool = function(Class) {
	this.Class = Class;

	this.tracker = {};
	this._clearTracker();

	this._objpool = [];
    };

    context.ObjectPool.prototype.alloc = function() {
	var obj;

	if(this._objpool.length == 0) {
	    obj = new this.Class();
	    this.tracker.totalalloc++;
	}else {
	    obj = this._objpool.pop();
	    this.tracker.totalfree--;
	}

	obj.init.apply(obj, arguements);

	return obj;
    };

    context.ObjPool.prototype.free = function(obj) {
	var k;

	this._objpool.push(obj);
	this.tracker.totalfree++;

	for(k in obj) {
	    delete obj[k];
	}

	obj.init.call(obj);
    };

    context.ObjectPool.prototype.collect = function(Class) {
	this._objpool = [];

	var inUse = this.tracker.totalalloc - this.tracker.totalfree;
	this._clearTracker(inUse);
    };

    context.ObjectPool.prototype._clearMetrics = function(allocated) {
	this.tracker.totalalloc = allocated || 0;
	this.tracker.totalfree = 0;
    }

})(Function('return this')());