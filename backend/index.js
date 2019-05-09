const express = require('express');
const router = express.Router();
const http = require('http');
const app = express();

const server = http.createServer(app);

const port = 5000;


app.use('/', router.get('', (req, res) => {
	console.log('hehehe');
	res.send('Hello Worlds!');
}))

server.listen(port, () => {
	console.log('Server is running on Port http://localhost:'+port);
});