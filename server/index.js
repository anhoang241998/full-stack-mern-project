const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const postRoutes = require("./routes/posts")

const app = express()

app.use("/posts", postRoutes)

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

const CONNECTION_USERNAME = process.env.CONNECTION_URL_USERNAME
const CONNECTION_PASSWORD = process.env.CONNECTION_URL_PASSWORD
const CONNECTION_URL = `mongodb+srv://${CONNECTION_USERNAME}:${CONNECTION_PASSWORD}@cluster0.nxff3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000

const connect = async () => {
	try {
		await mongoose.connect(CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		await app.listen(PORT)
		console.log(`Server running on port: ${PORT}`)
	} catch (error) {
		console.log(error.message)
	}
}

connect()
