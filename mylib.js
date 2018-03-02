var Mylib = {};

/**
 * Temps entre deux points
 */
Mylib.distance = function (s, e) {
	return  Math.abs(s.x - e.x) +  Math.abs(s.y - e.y);
};

/**
 * temps auquel la voiture sera à la position choisie compte tenu de sa dernière
 * position connue
 */
Mylib.timeReady = function (carLast, target) {
	return Mylib.distance(carLast, target) + carLast.time;
};

/**
 * Temps où la voiture attendra à la position en fonction de sa dernière
 * position connue ET du minTime de ce ride
 */
Mylib.waiting = function (carLast, target, minStart) {
	// console.log(carLast, target, minStart);
	// console.log(Mylib.timeReady(carLast, target));
	// console.log(Mylib.timeReady(carLast, target) < 0);
	// console.log("MS", (Mylib.timeReady(carLast, target) > minStart ? 0 : Mylib.timeReady(carLast, target)))
	return minStart - (Mylib.timeReady(carLast, target) > minStart ? 0 : Mylib.timeReady(carLast, target));
};

Mylib.waitingDirect = function (carLast, target, minStart) {
	return minStart - (Mylib.timeReady(carLast, target));
};

/**
 * [canFinish description]
 */
Mylib.rideFinish = function (carLast, startTarget, endTarget, maxEnd) {
	var time = Mylib.timeReady(carLast, startTarget) + Mylib.distance(startTarget, endTarget);
	return {
		time: time,
		possible: time <= maxEnd
	};
};


Mylib.getInfos = function (ride, car) {
	// console.log("INFOS", Mylib.timeReady(car.last, ride.pos.start), Mylib.waiting(car.last, ride.pos.start, ride.startTime),  Mylib.rideFinish(car.last, ride.pos.start, ride.pos.end, ride.maxTime))
	return {
		timeReady: Mylib.timeReady(car.last, ride.pos.start),
		waiting: Mylib.waiting(car.last, ride.pos.start, ride.startTime),
		rideFinish: Mylib.rideFinish(car.last, ride.pos.start, ride.pos.end, ride.maxTime),
	}
};

Mylib.getScore = function (ride, car) {
	var score = 0;
	var infos = Mylib.getInfos(ride, car);
	// console.log("SCORE READY", infos.timeReady);
	// console.log("SCORE waiting", infos.waiting);
	score = infos.timeReady + infos.waiting;
	// console.log("GS", score, infos.rideFinish.possible);
	return {
		score: score,
		canFinish: infos.rideFinish.possible,
	}
};

// rides = {
// 	0: {
// 		pos: {
// 			start: {
// 				x: 1,
// 				y: 1
// 			},
// 			end: {x,y},
// 		},
// 		startTime: 150,
// 		maxTime: 99,
// 	},
// };
// cars = {
// 	0: {
// 		rides: [42, 10],
// 		last: {x: 2, y: 2, time: 142},
// 	},
// 	1: {
// 		rides: [42, 10],
// 	},
// }



module.exports = Mylib;
