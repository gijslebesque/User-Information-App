// Including the necessary modules.
const express 		= require('express')
const fs 			= require('fs')
const app 			= express()
const bodyParser 	= require('body-parser')

//Implement pug enginge
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')


//Parsing implemented info by user. changes saved html data. 
app.use(bodyParser.urlencoded({  //downloaded via npm install body-parser --save
	extended: true
}))



//Users page
app.get('/', (request, response) =>{
	fs.readFile(__dirname + '/users/users.json', (error, data) => {
		if (error )throw error
			let parsedData = JSON.parse(data)
		console.log(parsedData)
		response.render('index', {users:parsedData})
	})
})

//Search page
app.get('/search', (request, response) => {
	response.render('search')
})

app.post('/searchData', (req, res) =>{
	console.log(req.body)
	let result = []
	fs.readFile(__dirname + '/users/users.json', (error, data) =>{
		if(error) throw error
		let parsedData = JSON.parse(data)
		for (let i = parsedData.length - 1; i >= 0; i--) {
			if (parsedData[i].firstName.indexOf(req.body.input) > -1){
				result.push(parsedData[i].firstName)
			}
		}		
	res.send(result)
	})
})


app.post('/search', function(request, response){
	console.log(request.body.query)
	let searchResult =[]
	fs.readFile(__dirname + '/users/users.json', (error, data) => {
		if (error) throw error
			let parsedData = JSON.parse(data)
		console.log(parsedData)
		for (let i = parsedData.length - 1; i >= 0; i--) {
			if(parsedData[i].firstName == request.body.query || parsedData[i].lastName == request.body.query) {
				searchResult.push(parsedData[i])
			}
		}
		console.log(searchResult)
		response.render('result', {user:searchResult})
	})
})


//Add page
app.get('/add', (request, response) => {
	response.render('add')
	
})

app.post('/add', (request, response) => {
	fs.readFile(__dirname + '/users/users.json', (error, data) => {
		if (error) throw error
			let fileData = JSON.parse(data)
		fileData.push({firstName : request.body.firstName, lastName: request.body.lastName, email: request.body.email})
		data = JSON.stringify(fileData)
		fs.writeFile(__dirname + '/users/users.json', data, (error) => {
			if (error) throw error
		})
	})
	response.redirect('/users')
})



// make app listen to port 8000
app.listen(8000,() =>{
	console.log("Server running")
})