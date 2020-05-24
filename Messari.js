const axios = require('axios');
const Enum = require('enum');

class Client {
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
      `https://data.messari.io/api/v1/assets/${this._asset}/metrics/price/time-series?start=2020-05-17&end=2020-05-24&interval=1d`;
    
    try {
      return axios.get(url)
        .then(response => new Response(response.data));
    } catch(e) {
      throw new Error(e);
    }
  }
}

class Response {
  candleProps = new Enum({
    TIMESTAMP: 0,
    OPEN: 1,
    HIGH: 2,
    LOW: 3,
    CLOSE: 4,
    VOLUME: 5
  });
  
  constructor({ data, status }) {
    this._data = data;
    this._symbol = data.symbol;
    this._name = data.name;
    this._priceSeries = data.values;
  }

  get data() {
    return this._data;
  }

  get symbol() {
    return this._symbol;
  }

  get name() {
    return this._name;
  }

  get priceSeries() {
    return this._priceSeries;
  }

  get closingPrices() {
    return this._priceSeries.map(candle => candle[this.candleProps.CLOSE.value]);
  }

}

module.exports = Client;
