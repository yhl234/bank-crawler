const Crawler = require('crawler');

const c = new Crawler({
  maxConnections: 10,
});
c.queue([
  {
    uri: 'https://rate.bot.com.tw/xrt?Lang=zh-TW',
    jQuery: 'cheerio',
    // The global callback won't be called
    callback(error, res, done) {
      if (error) {
        console.log(error);
      } else {
        const result = [];
        const { $ } = res;
        const tableTr = $('main table tbody tr');
        const array = [0, 4, 18, 7];
        for (let i = 0; i < array.length; i++) {
          const tableTd = tableTr.eq(array[i]).find('td');
          const country = tableTd
            .eq(0)
            .find('div[style]')
            .text()
            .trim();
          const bankBuy = tableTd.eq(3).text();
          const bankSell = tableTd.eq(4).text();
          result.push(Object.assign({ country, bankBuy, bankSell }));
        }
        const toString = JSON.stringify(Object.assign({}, result));
        const output = JSON.parse(toString);
        console.log(output);
      }
      done();
    },
  },
]);
