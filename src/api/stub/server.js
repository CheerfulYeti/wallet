/**
 *
 * Run the server to use stubs
 */

const connect = require('connect');
const serveStatic = require('serve-static');
const port = 9000;

connect()
  .use(serveStatic(__dirname, {
    setHeaders: function (res) {
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
  }))
  .listen(port, function () {
    console.log(`Server running on ${port}...`);
  });
