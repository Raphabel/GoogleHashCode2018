var fs          = require('fs');
const _         = require("lodash");

// Read file input
const filename = process.argv[2];
const filepath = ('./' + filename);
var rows = fs.readFileSync(filepath).toString().split("\n");
// Process file
_.each(rows, function (row) {
    console.log(row);
});
