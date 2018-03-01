var pb = require('./problem');
pb.setInfos(1, 2, 3, 4, 5, 6);
pb.addRide(0,0,1,2,0,9,0);
console.log(pb.cars);
console.log(pb.rides);