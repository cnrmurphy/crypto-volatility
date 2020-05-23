const axios = require('axios');

class Messari {
  constructor(asset) {
    this.asset = asset;
  }

  set asset(asset) {
    this._asset = asset;
  }
  
  get asset() {
    return this.asset;
  }

  async getPriceSeries() {
    const url =
      `https://data.messari.io/api/v1/assets/${this._asset}/metrics/price/time-series?start=2020-01-01&end=2020-02-01&interval=1d`;
    
    try {
      return axios.get(url)
        .then(response => response.data);
    } catch(e) {
      throw new Error(e);
    }
  }
}

module.exports = Messari;
