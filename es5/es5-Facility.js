"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var Facility = /*#__PURE__*/function () {
  function Facility(maxLocations, coordinates) {
    _classCallCheck(this, Facility);
    this.coordinates = coordinates;
    this.init(maxLocations);
  }
  _createClass(Facility, [{
    key: "init",
    value: function init(id_base) {
      this._id = this.generateId(id_base);
      this._medications = [{
        name: "A",
        price: this._setPrice()
      }, {
        name: "B",
        price: this._setPrice()
      }, {
        name: "C",
        price: this._setPrice()
      }];
      this.constructor.facilityNetwork.push(this);
    }

    //generate new id until no dupes found in facilityNetwork
  }, {
    key: "generateId",
    value: function generateId(base) {
      var id = Math.floor(Math.random() * base);
      if (!this.foundIdDupe(id)) {
        return id;
      } else {
        return this.generateId(base);
      }
    }
  }, {
    key: "foundIdDupe",
    value: function foundIdDupe(newId) {
      return this.facilityNetwork.some(function (facility) {
        return facility.id === newId;
      });
    }
  }, {
    key: "facilityNetwork",
    get: function get() {
      return this.constructor.facilityNetwork;
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "_setPrice",
    value: function _setPrice() {
      //set non-zero price with decimal
      var price = Math.floor(Math.random() * 10000) / 100;
      if (price !== 0) {
        return price;
      } else {
        return this._setPrice();
      }
    }
  }, {
    key: "cheapestMedication",
    get: function get() {
      this._medications.sort(function (a, b) {
        return a.price > b.price ? 1 : -1;
      });
      var cheapestMed = this._medications[0];
      var cheapestPrice = cheapestMed.price.toString();
      var change = cheapestPrice.split('.')[1];
      var displayPrice = change.length !== 2 ? "$".concat(cheapestPrice + '0') : "$".concat(cheapestPrice);
      return "".concat(displayPrice, ", Medication ").concat(cheapestMed.name); //e.g. $35.20, Medication B
    }
  }]);
  return Facility;
}();
_defineProperty(Facility, "facilityNetwork", []);
module.exports = {
  Facility: Facility
};
