const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/user', {
			// target: '*', 
			target: 'http://localhost:8080/', 
			changeOrigin: true,
		})
	);
	app.use(
		createProxyMiddleware('/main', {
			// target: '*', 
			target: 'http://localhost:8080/', 
			changeOrigin: true,
		})
	);
	app.use(
		createProxyMiddleware('/chat', {
			// target: '*', 
			target: 'http://localhost:8080/', 
			changeOrigin: true,
		})
	);
};