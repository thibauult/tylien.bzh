/**
 * Created by tibus on 16/12/14.
 */
var mongoose = require('mongoose');
var ShortId = require('mongoose-shortid');

var alphabet = '0123456789abcdefghijklmnopqrstwxyzABCDEFGHIJKLMNOPQRSTWXYZ';

var linkSchema = mongoose.Schema({
    _id: {
        type: ShortId,
        len: 4,              // Length 3 characters
        base: 64,            // Web-safe base 64 encoded string
        alphabet: alphabet, // Use default alphabet for base
        retries: 4           // Four retries on collision
    },
    url    : { type: String, require: true },
    key    : { type: String, require: true },
    date   : { type: Date, default: Date.now },
    clicks : { type: Number, default: 0 }
});

linkSchema.statics.findOrCreateByUrl = function(url, customKey, cb) {

    if(!customKey) {

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
    else {

        new Link({ _id: customKey, url: url })
            .save(function(err, link) {
                if(err)       cb(null);
                else if(link) cb(link);
            }
        );
    }
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