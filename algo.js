var Algo = {};
var lib = require('./mylib.js');
var _ = require('lodash');

Algo.init = function (problem) {
	Algo.problem = problem;
	Algo.initCars(problem.cars);
	// console.log(Algo.cars);
	Algo.proceed();
	// console.log(Algo.cars);
	return Algo.cars;
};

Algo.initCars = function (nbCars) {
	Algo.cars = {};
	_.times(nbCars, function (idx) {
		Algo.cars[idx] = {
			score: 0,
			rides: [],
			last: {x: 0, y: 0, time: 0},
		};
	});
};

Algo.update = function (carNb, rideNb, last, time) {
	Algo.cars[carNb].rides.push(rideNb);
	Algo.cars[carNb].score += lib.distance(Algo.problem.rides[rideNb].pos.start, Algo.problem.rides[rideNb].pos.end);
	Algo.cars[carNb].score += lib.waitingDirect(Algo.cars[carNb].last, Algo.problem.rides[rideNb].pos.end,  Algo.problem.rides[rideNb].startTime) >= 0 ? +Algo.problem.bonus : 0;
	Algo.cars[carNb].last = last;
	Algo.cars[carNb].last.time = time;
}


Algo.proceed = function () {
	var carsScore = [];
	_.each(Algo.problem.rides, function (rideInfos, rideNumber) {
		carsScore = [];
		_.each(Algo.cars, function (carInfos, carNumber) {
			carsScore.push({
				score: lib.getScore(rideInfos, carInfos).score,
				nb: carNumber,
			});
		});
		var selectedCar = _.minBy(carsScore, 'score');
		Algo.update(selectedCar.nb, rideNumber,
			rideInfos.pos.end,
			lib.rideFinish(Algo.cars[selectedCar.nb].last, rideInfos.pos.start, rideInfos.pos.end, rideInfos.maxTime).time);
		// _.each(Algo.cars, function (carInfos, carNumber) {
		// 	carsScore[carNumber] = lib.getScore(rideInfos, carInfos);
			// console.log(lib.getInfos(rideInfos, carInfos));
		// });
	});
	var total = 0;
		_.each(Algo.cars, function (carInfos, carNumber) {
			total+= carInfos.score || 0;
		});
		console.log("score total", total);

};

module.exports = Algo;