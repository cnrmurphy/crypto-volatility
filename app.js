const MessariClient = require('./Messari.js');
const math = require('mathjs');

(async () => {
  const mc = new MessariClient('bitcoin');
  const data = await mc.getPriceSeries();
  const closingPrices = data.closingPrices;
  const currentPrice = closingPrices[closingPrices.length-1];
  const mean = closingPrices.reduce((a, b) => a + b, 0) / closingPrices.length;

  const mv = math.std(closingPrices);
  
  console.log({
    'asset': data.name,
    currentPrice,
    mean,
    volatility: {
      mean,
      value: mv,
      '1sd': {
        plus: mean + mv,
        minus: mean - mv
      },
      '2sd': {
        plus: mean + (mv * 2),
        minus: mean - (mv * 2)
      },
      '3sd': {
        plus: mean + (mv * 3),
        minus: mean - (mv * 3)
      }
    },
  });
})();