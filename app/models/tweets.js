/**
 * A model for interfacing with the Tweets depot
 * 
 */
var Tweets = function(replace) {
	
	this.bucket = "tweets";
	this.dm_bucket = "dms";
	
	this._init(replace);
};

Tweets.prototype._init  = function(replace) {
	var opts = {
		'name'    : 'ext:SpazDepotTweets',
		'replace' : false,
		'estimatedSize': 10*1024*1024 // 10MB
	};
	
	if (replace === true) {
		sch.debug('REPLACING DEPOT!!!!!!!!!!!=======================');
		opts.replace = true;
	} else {
		sch.debug('NOT REPLACING DEPOT!!!!!!!!!!====================');
	}
	
	if (!this.mojoDepot) {
		this.mojoDepot = new Mojo.Depot(opts);
	}
};

Tweets.prototype.get    = function(id, is_dm, onSuccess, onFailure) {

	/*
		make sure this is an integer
	*/	
	id = parseInt(id, 10);
	
	if (!is_dm) {
		this.mojoDepot.getSingle(this.bucket, id, onSuccess, onFailure);
	} else {
		this.mojoDepot.getSingle(this.dm_bucket, id, onSuccess, onFailure);
	}
};


Tweets.prototype.getMultiple = function(type, since_id) {
	
};


Tweets.prototype.save   = function(object, onSuccess, onFailure) {
	var objid = object.id;
	
	/*
		make sure this is an integer
	*/
	objid = parseInt(objid, 10);
	
	dump("Saving id "+objid);
	if (!object.SC_is_dm) {
		dump("Saving TWEET "+objid);
		this.mojoDepot.addSingle(this.bucket, objid, object, null, function(){ dump('save '+objid+' success'); }, function(msg){ dump('save '+objid+' fail:'+msg); });
	} else {
		dump("Saving DM "+objid);
		this.mojoDepot.addSingle(this.dm_bucket, objid, object, null, function(){ dump('save '+objid+' success'); }, function(msg){ dump('save '+objid+' fail:'+msg); });
	}
};

Tweets.prototype.remove = function(objid, onSuccess, onFailure) {
	
};

Tweets.prototype.onSaveSuccess = function(obj, msg) {
	dump('TweetModel Saved');
};

Tweets.prototype.onSaveFailure = function(msg, obj) {
	dump('TweetModel Save Failed On : '+obj+' '+msg);
};

Tweets.prototype.reset = function() {
	this._init(true);
};

