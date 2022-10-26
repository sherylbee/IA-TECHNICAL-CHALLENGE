const { Facility } = require("./Facility.js");

class Matrix {
  generateMatrix(range) {
    let matrix = [];
    //get length of range, inclusive of lower bound
    const rangeLength = Math.abs(range[0]) + Math.abs(range[1]) + 1;
    let createdRows = 0;
    let createdCells = 0;
    while (createdRows < rangeLength) {
      let row = [];
      matrix.push(row);
      while (createdCells < rangeLength) {
        let cell = [];
        row.push(cell);
        createdCells++;
      }
      //set cell count back to zero for next row
      createdCells = 0;
      createdRows++;
    }
    return matrix;
  }

  seedMatrix(userLocationCoords, grid) {  //expected format: [4,2], grid = matrix
    const gridCenter = Math.floor(grid.length / 2);
    const maxLength = grid.length;
    const numOfFacilityLocations = this._randomNum(maxLength * maxLength);
    //keeping the following array even though same data is contained on Facility class because this flat structure facilitates checking for duplicates
    let facilityLocations = [];
    let createdFacilityCount = 0;
    //create facilities until the amount that was determined above @ 'numOfFacilityLocations' is reached
    while (createdFacilityCount < numOfFacilityLocations) {
      let facilityIndices = [
        this._randomNum(maxLength),
        this._randomNum(maxLength),
      ];
      //transform facility indices to coordinates
      var facilityCoords = facilityIndices.map((idx) => {
        if (idx === gridCenter) {
          return 0;
        } else {
          return idx - gridCenter;
        }
      });
      //if the random facility location is the same as the user location, don't create it or count it against the total; skip it
      if (
        (facilityCoords[0] === userLocationCoords[0] &&
          facilityCoords[1] === userLocationCoords[1]) ||
        this.foundCoordDupe(facilityCoords, facilityLocations) //some bool
      ) {
        continue;
      }
      let facility = new Facility(numOfFacilityLocations, facilityCoords);
      facilityLocations.push(facilityCoords);
      createdFacilityCount++;
    }
  }

  foundCoordDupe(latestCoords, allCoords) {
    return allCoords.some(
      (coords) => coords[0] === latestCoords[0] && coords[1] === latestCoords[1]
    );
  }

  _randomNum(upperBound) {
    //generate random number from 0 to upperBound (exclusive)
    return Math.floor(Math.random() * upperBound);
  }
}

module.exports = { Matrix };
