"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var _require = require("./es5-Facility.js"),
  Facility = _require.Facility;
var Matrix = /*#__PURE__*/function () {
  function Matrix() {
    _classCallCheck(this, Matrix);
  }
  _createClass(Matrix, [{
    key: "generateMatrix",
    value: function generateMatrix(range) {
      var matrix = [];
      //get length of range, inclusive of lower bound
      var rangeLength = Math.abs(range[0]) + Math.abs(range[1]) + 1;
      var createdRows = 0;
      var createdCells = 0;
      while (createdRows < rangeLength) {
        var row = [];
        matrix.push(row);
        while (createdCells < rangeLength) {
          var cell = [];
          row.push(cell);
          createdCells++;
        }
        //set cell count back to zero for next row
        createdCells = 0;
        createdRows++;
      }
      return matrix;
    }
  }, {
    key: "seedMatrix",
    value: function seedMatrix(userLocationCoords, grid) {
      //expected format: [4,2], grid = matrix
      var gridCenter = Math.floor(grid.length / 2);
      var maxLength = grid.length;
      var numOfFacilityLocations = this._randomNum(maxLength * maxLength);
      //keeping the following array even though same data is contained on Facility class because this flat structure facilitates checking for duplicates
      var facilityLocations = [];
      var createdFacilityCount = 0;
      //create facilities until the amount that was determined above @ 'numOfFacilityLocations' is reached
      while (createdFacilityCount < numOfFacilityLocations) {
        var facilityIndices = [this._randomNum(maxLength), this._randomNum(maxLength)];
        //transform facility indices to coordinates
        var facilityCoords = facilityIndices.map(function (idx) {
          if (idx === gridCenter) {
            return 0;
          } else {
            return idx - gridCenter;
          }
        });
        //if the random facility location is the same as the user location, don't create it or count it against the total; skip it
        if (facilityCoords[0] === userLocationCoords[0] && facilityCoords[1] === userLocationCoords[1] || this.foundCoordDupe(facilityCoords, facilityLocations) //some bool
        ) {
          continue;
        }
        var facility = new Facility(numOfFacilityLocations, facilityCoords);
        facilityLocations.push(facilityCoords);
        createdFacilityCount++;
      }
    }
  }, {
    key: "foundCoordDupe",
    value: function foundCoordDupe(latestCoords, allCoords) {
      return allCoords.some(function (coords) {
        return coords[0] === latestCoords[0] && coords[1] === latestCoords[1];
      });
    }
  }, {
    key: "_randomNum",
    value: function _randomNum(upperBound) {
      //generate random number from 0 to upperBound (exclusive)
      return Math.floor(Math.random() * upperBound);
    }
  }]);
  return Matrix;
}();
module.exports = {
  Matrix: Matrix
};
