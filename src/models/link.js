/**
 * Created by tibus on 16/12/14.
 */
var mongoose = require('mongoose');

var linkSchema = mongoose.Schema({
    url    : { type: String, require: true },
    key    : { type: String, require: true },
    date   : { type: Date, default: Date.now },
    clicks : { type: Number, default: 0 }
});

linkSchema.statics.findOrCreateByUrl = function(url, cb) {

    this.findOne({ url: url }, function(err, link) {

        if(err || !link) {
            new Link({ url: url })
                .save(function(err, link) {
                    if(err)       cb(null);
                    else if(link) cb(link);
                }
            );
        } else if(link) {
            cb(link);
        } else {
            cb(null);
        }
    });
}

linkSchema.statics.findByKey = function(key, cb) {

    this.findByIdAndUpdate(key, { $inc: { clicks: 1  } }, function(err, link) {

        if(err || !link) cb(null);
        else if(link)    cb(link);
        else             cb(null);
    });
}

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;