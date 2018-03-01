var Problem = {
	rides: {},
};

Problem.setInfos = function (rows, cols, cars, nbRides, bonus, steps) {
	this.map = {
		rows: rows,
		cols: cols,
	};
	this.cars = cars;
	this.nbRides = nbRides;
	this.bonus = bonus;
	this.steps = steps;
}

Problem.addRide = function (a,b, x, y, start, end, line) {
	this.rides[line] = {
		pos: {
			start: {
				x: a,
				y: b,
			},
			end: {
				x: x,
				y: y,
			},
		},
		startTime: start,
		maxTime: end,
	};
}


module.exports = Problem;