const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/user',
    createProxyMiddleware({
      target: 'http://localhost:30649',
      changeOrigin: true
    })
  );
  app.use(
    '/api/auth',
    createProxyMiddleware({
      target: 'http://localhost:30649',
      changeOrigin: true
    })
  );
  app.use(
    '/api/product',
    createProxyMiddleware({
      target: 'http://localhost:31130',
      changeOrigin: true
    })
  );
};
