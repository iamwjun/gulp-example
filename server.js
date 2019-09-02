const Express = require('express')
const Path = require('path')

var app = new Express();

app.use(Express.static(Path.resolve(__dirname, './src')))

app.listen(4500, function () {
	console.log(`Server Listening on 4500 http://localhost:4500/`)
})