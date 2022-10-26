const { Matrix } = require('./Matrix.js');
const { Facility } = require('./Facility.js');
const userLocation = [0,2];
const gridRange = [-10, 10];
const matrix = new Matrix();
matrix.seedMatrix(userLocation, matrix.generateMatrix([-10, 10]));

class ClosestFacilityFinder  {
    constructor(origin) {
        this.init(origin);
    }

    init(origin){
        this.sortedFacilities = this.sortFacilitiesByDistance(origin);
        this._closestFacilities = this.sortedFacilities.slice(0,3);
    }

    sortFacilitiesByDistance(origin){
        const facilityNetwork = Facility.facilityNetwork;

        if(facilityNetwork.length === 0){
            return "There are no fill facilities within the given area"
        }
        let facilitiesWithDistances = facilityNetwork.map(facility=>{
            const distanceFromUser = 
            Math.abs(origin[0])+
            Math.abs(origin[1])+
            Math.abs(facility.coordinates[0])+
            Math.abs(facility.coordinates[1])
            facility.distanceFromUser = distanceFromUser;
            return facility;
            
        })
        facilitiesWithDistances.sort((a,b) => (a.distanceFromUser > b.distanceFromUser) ?  1: -1)
        return facilitiesWithDistances;
    };

    
    printResults(origin){
        return `
        Closest Central Fills to (${origin}):
        Central Fill ${this._closestFacilities[0].id} - ${this._closestFacilities[0].cheapestMedication}, Distance ${this._closestFacilities[0].distanceFromUser}
        Central Fill ${this._closestFacilities[1].id} - ${this._closestFacilities[1].cheapestMedication}, Distance ${this._closestFacilities[1].distanceFromUser}
        Central Fill ${this._closestFacilities[2].id} - ${this._closestFacilities[2].cheapestMedication}, Distance ${this._closestFacilities[2].distanceFromUser}
        `
    }
}

const finder = new ClosestFacilityFinder(userLocation);
console.log(finder.printResults(userLocation))