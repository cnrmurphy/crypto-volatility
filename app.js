const MessariClient = require('./Messari.js');

(async () => {
  const mc = new MessariClient('ethereum');
  const data = await mc.getPriceSeries();
  const closingPrices = data.closingPrices;
  
  let low = closingPrices[0];
  let high = closingPrices[0];

  closingPrices.forEach(price => {
    if (price > high)
      high = price;
    if (price < low)
      low = price;
  });

  console.log({ low, high });
  console.log('vol: ', (high-low)/high);
})();