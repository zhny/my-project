var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.conf')

var httpProxy = require('http-proxy');

var app = express()
var compiler = webpack(config)

var apiProxy = httpProxy.createProxyServer();

app.get("/vhotel/*", function(req, res){ 
  apiProxy.web(req, res, { target: 'http://125.64.11.165:7088' });              //代理服务
});

app.post("/vhotel/*", function(req, res){ 
  apiProxy.web(req, res, { target: 'http://125.64.11.165:7088' });              //代理服务
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler))

app.listen(8080, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:8080')
})
