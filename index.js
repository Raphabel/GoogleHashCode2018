var Read     = require('./read');

const filename = process.argv[2];

var problem = Read.processFile(filename);

console.log(problem.rides);