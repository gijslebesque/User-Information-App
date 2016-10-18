// Including the necessary modules.
const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')

//Implement pug enginge
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')


app.get('/users', (request, response) =>{
	fs.readFile(__dirname + '/users/users.json', (error, data) => {
		if (error )throw error
		let parsedData = JSON.parse(data)
		console.log(parsedData)
		response.render('index', {users:parsedData})
	})
})

app.get('/search', (request, response) => {
	response.render('search')
})

app.get('/add', (request, response) => {
	response.render('add')
})

app.use(bodyParser.urlencoded({  //downloaded via npm instal body-parser --save
    extended: true
})); 

app.post('/search', function(request, response){
    // console.log(request.body.query)
    fs.readFile(__dirname + '/users/users.json', (error, data) => {
    	if (error) throw error
    	let parsedData = JSON.parse(data)
    		for (let i = parsedData.length - 1; i >= 0; i--) {
    			// console.log(parsedData[i].name)
    			if(parsedData[i].firstName == request.body.query || parsedData[i].lastName == request.body.query) {
    				response.render('result', {user:parsedData[i]})
    			}
    		}
    })
})

// make app listen to port 8000
app.listen(8000,() =>{
	console.log("Server running")
})