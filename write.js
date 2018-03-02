const _         = require("lodash");
var fs          = require('fs');

var Write = { };

// Write file input
Write.displaySolution = function (filename, cars) {
    var path = ("./outputs/solution-" + filename).replace(/.in/i, ".txt");
    
    var stream = fs.createWriteStream(path);
    stream.once('open', function (fd) {
        _.each(cars, function (car) {
            stream.write(car.rides.length + " ");
            _.each(car.rides, function (ride, index) {
                stream.write(ride.toString());
                if (index <  (car.rides.length - 1)) {
                    stream.write(" ");
                }
            });
            stream.write("\n");
        });
        stream.end();
    });
}

module.exports = Write;