var fs          = require('fs');
const _         = require("lodash");
var Problem     = require('./problem');

var Read = { };

// Read file input
Read.processFile = function (filename) {
    const filepath = ('./' + filename);
    var rows = fs.readFileSync(filepath).toString().split("\n");
    
    // Process infos
    var infos = rows.shift();
    var array = _.split(infos, " ");
    Problem.setInfos(array[0], array[1], array[2], array[3], array[4], array[5]);

    // Process rides
    _.each(rows, function (row, index) {
        if (row) {
            var array = _.split(row, " ");
            Problem.addRide(array[0], array[1], array[2], array[3], array[4], array[5], index);
        }
    });

    console.log(Problem.cars);
    console.log(Problem.rides);
}

module.exports = Read;