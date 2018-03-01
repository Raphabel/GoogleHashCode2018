var Read	= require('./read');
var Algo	= require('./algo.js');

const filename = process.argv[2];

var problem = Read.processFile(filename);

Algo.init(problem);