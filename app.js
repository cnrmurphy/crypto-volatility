const MessariClient = require('./Messari.js');

(async () => {
  const mc = new MessariClient('ethereum');
  const data = await mc.getPriceSeries();
  console.log(data);
})();