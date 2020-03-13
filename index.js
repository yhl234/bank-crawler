/* eslint-disable prefer-destructuring */
const Crawler = require('crawler');

const c = new Crawler({
  maxConnections: 10,
});
// c.queue([
//   {
//     url: 'https://ibank.firstbank.com.tw/NetBank/7/0201.html?sh=none',
//     jQuery: 'cheerio',
//     // The global callback won't be called
//     callback(error, res, done) {
//       if (error) {
//         console.log(error);
//       } else {
//         const result = [];
//         let { $ } = res;
//         let tableTr = $('main table tbody tr');
//         console.log(tableTr.length);
//         while (tableTr.length < 0) {
//           $ = res.$;
//           tableTr = $('main table tbody tr');
//         }
//         const array = [0, 4, 18, 7];
//         for (let i = 0; i < array.length; i++) {
//           const tableTd = tableTr.eq(array[i]).find('td');
//           const country = tableTd
//             .eq(0)
//             .find('div[style]')
//             .text()
//             .trim();
//           const bankBuy = tableTd.eq(3).text();
//           const bankSell = tableTd.eq(4).text();
//           result.push(Object.assign({ country, bankBuy, bankSell }));
//         }
//         const toString = JSON.stringify(Object.assign({}, result));
//         const output = JSON.parse(toString);
//         console.log('firstbank', output);
//       }
//       done();
//     },
//   },
// ]);
c.queue([
  {
    uri: 'https://rate.bot.com.tw/xrt?Lang=zh-TW',

    jQuery: 'cheerio',
    // The global callback won't be called
    callback(error, res, done) {
      if (error) {
        console.log(error);
      } else {
        const { $ } = res;
        const result = [];
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
        console.log('taiwan', output);
      }
      done();
    },
  },
]);
c.queue([
  {
    url: 'https://www.cathaybk.com.tw/cathaybk/personal/exchange/product/currency-billboard/?indexwidget',
    jQuery: 'cheerio',
    // The global callback won't be called
    callback(error, res, done) {
      if (error) {
        console.log(error);
      } else {
        const { $ } = res;
        const result = [];
        const tableTr = $('#content-first-tab-01 table tbody tr');
        const array = [0, 10, 2, 13];
        for (let i = 0; i < array.length; i++) {
          const tableTd = tableTr.eq(array[i]).find('td');
          const country = tableTd
            .eq(0)
            .text()
            .trim();
          const bankBuy = tableTd
            .eq(1)
            .text()
            .trim();
          const bankSell = tableTd
            .eq(2)
            .text()
            .trim();
          result.push(Object.assign({ country, bankBuy, bankSell }));
        }
        const toString = JSON.stringify(Object.assign({}, result));
        const output = JSON.parse(toString);
        console.log('cathaybk', output);
      }
      done();
    },
  },
]);
