var Algo	= require('./algo.js');
var Read     = require('./read');
var Write     = require('./write');

const filename = process.argv[2];

var problem = Read.processFile(filename);

var cars = Algo.init(problem);

Write.displaySolution(filename, cars);
