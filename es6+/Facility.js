class Facility {
  static facilityNetwork = [];
  constructor(maxLocations, coordinates) {
    this.coordinates = coordinates
    this.init(maxLocations);
  }

  init(id_base) {
    this._id = this.generateId(id_base);
    this._medications = [
      { name: "A", price: this._setPrice() },
      { name: "B", price: this._setPrice() },
      { name: "C", price: this._setPrice() },
    ];
    this.constructor.facilityNetwork.push(this);
  }

  //generate new id until no dupes found in facilityNetwork
  generateId(base){
    let id = Math.floor(Math.random() * base);
    if(!this.foundIdDupe(id)){
        return id
    }
    else{
        return this.generateId(base)
    }
  }

  foundIdDupe(newId){
    return this.facilityNetwork.some(facility => facility.id === newId)
  }

  get facilityNetwork() {
    return this.constructor.facilityNetwork;
  }

  get id() {
    return this._id;
  }

  _setPrice() {
    //set non-zero price with decimal
    let price = Math.floor(Math.random() * 10000) / 100;
    if(price !== 0){
        return price
    }
    else{
       return this._setPrice()
    }
  }

  get cheapestMedication() {
    this._medications.sort((a,b) => (a.price > b.price) ?  1: -1)
    const cheapestMed = this._medications[0];
    const cheapestPrice = cheapestMed.price.toString();
    const change = cheapestPrice.split('.')[1]
    let displayPrice = change.length!== 2 ? `$${cheapestPrice+'0'}`: `$${cheapestPrice}`
    return `${displayPrice}, Medication ${cheapestMed.name}`//e.g. $35.20, Medication B
  }

}

module.exports = { Facility };