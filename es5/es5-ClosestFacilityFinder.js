"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var _require = require('./es5-Matrix.js'),
  Matrix = _require.Matrix;
var _require2 = require('./es5-Facility.js'),
  Facility = _require2.Facility;
var userLocation = [0, 2];
var gridRange = [-10, 10];
var matrix = new Matrix();
matrix.seedMatrix(userLocation, matrix.generateMatrix([-10, 10]));
var ClosestFacilityFinder = /*#__PURE__*/function () {
  function ClosestFacilityFinder(origin) {
    _classCallCheck(this, ClosestFacilityFinder);
    this.init(origin);
  }
  _createClass(ClosestFacilityFinder, [{
    key: "init",
    value: function init(origin) {
      this.sortedFacilities = this.sortFacilitiesByDistance(origin);
      this._closestFacilities = this.sortedFacilities.slice(0, 3);
    }
  }, {
    key: "sortFacilitiesByDistance",
    value: function sortFacilitiesByDistance(origin) {
      var facilityNetwork = Facility.facilityNetwork;
      if (facilityNetwork.length === 0) {
        return "There are no fill facilities within the given area";
      }
      var facilitiesWithDistances = facilityNetwork.map(function (facility) {
        var distanceFromUser = Math.abs(origin[0]) + Math.abs(origin[1]) + Math.abs(facility.coordinates[0]) + Math.abs(facility.coordinates[1]);
        facility.distanceFromUser = distanceFromUser;
        return facility;
      });
      facilitiesWithDistances.sort(function (a, b) {
        return a.distanceFromUser > b.distanceFromUser ? 1 : -1;
      });
      return facilitiesWithDistances;
    }
  }, {
    key: "printResults",
    value: function printResults(origin) {
      return "\n        Closest Central Fills to (".concat(origin, "):\n        Central Fill ").concat(this._closestFacilities[0].id, " - ").concat(this._closestFacilities[0].cheapestMedication, ", Distance ").concat(this._closestFacilities[0].distanceFromUser, "\n        Central Fill ").concat(this._closestFacilities[1].id, " - ").concat(this._closestFacilities[1].cheapestMedication, ", Distance ").concat(this._closestFacilities[1].distanceFromUser, "\n        Central Fill ").concat(this._closestFacilities[2].id, " - ").concat(this._closestFacilities[2].cheapestMedication, ", Distance ").concat(this._closestFacilities[2].distanceFromUser, "\n        ");
    }
  }]);
  return ClosestFacilityFinder;
}();
var finder = new ClosestFacilityFinder(userLocation);
console.log(finder.printResults(userLocation));
