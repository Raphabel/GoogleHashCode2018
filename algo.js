var Algo = {};
var lib = require('./mylib.js');
var _ = require('lodash');

Algo.init = function (problem) {
	Algo.problem = problem;
	Algo.initCars(problem.cars);
	console.log(Algo.cars);
	Algo.proceed();
};

Algo.initCars = function (nbCars) {
	Algo.cars = {};
	_.times(nbCars, function (idx) {
		Algo.cars[idx] = {
			rides: [],
			last: {x: 0, y: 0, time: 0},
		};
	});
};

Algo.update = function (carNb, rideNb, last, time) {
	Algo.cars[carNb].rides.push(rideNb);
	console.log('car last', Algo.cars[carNb].last);
	console.log('last', last);
	Algo.cars[carNb].last = last;
	Algo.cars[carNb].last.time = time;
}


Algo.proceed = function () {
	var carsScore = [];
	_.each(Algo.problem.rides, function (rideInfos, rideNumber) {
		carsScore = [];
		_.each(Algo.cars, function (carInfos, carNumber) {
			console.log("carinfos", carInfos);
			carsScore.push({
				score: lib.getScore(rideInfos, carInfos),
				nb: carNumber,
			});
			// console.log(lib.getInfos(rideInfos, carInfos));
		});
		var selectedCar = _.minBy(carsScore, 'score');
		console.log('rideNumber', rideNumber, 'carNumber', selectedCar);
		Algo.update(selectedCar.nb, rideNumber,
			rideInfos.pos.end,
			lib.rideFinish(Algo.cars[selectedCar.nb].last, rideInfos.pos.start, rideInfos.pos.end, rideInfos.maxTime).time);
		// _.each(Algo.cars, function (carInfos, carNumber) {
		// 	carsScore[carNumber] = lib.getScore(rideInfos, carInfos);
		// 	// console.log(lib.getInfos(rideInfos, carInfos));
		// });
		console.log("cars", Algo.cars);
		console.log(selectedCar.nb);
		console.log(Algo.cars[selectedCar.nb]);
			console.log('=================');
	});
};

module.exports = Algo;