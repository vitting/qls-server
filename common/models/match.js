"use strict";

module.exports = function(Match) {
    Match.afterRemote("addScore", function(context, remoteMethodOutput, next) {
        console.log("SCORE ADDED");
        next();
    });

    Match.addScore = function(id, data, cb) {

        Match.findById(id, function(err1, instance) {
            if (err1) {
                cb(null, "error");
                return;
            }

            instance.updateAttributes({$push: {"data": data}}, function(err2, v) {
                if (err2) {
                    cb(null, "error");
                    return;
                }
                
                cb(null, "ok");
            }); 
        });  
    };

    Match.remoteMethod("addScore", {
        accepts: [
            {arg: "id", type: "string", required: true},
            {arg: "data", type: "object"},
        ],
        description: "Add score data to a match",
        http: {path: "/:id/addScore", verb: "put"},
        returns: {arg: "status", type: "string"},
    });
};
