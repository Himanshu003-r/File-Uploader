require('dotenv').config()
const express = require('express')
const app = express()

const fileupload = require('express-fileupload')
// Use V2
const cloudinary = require('cloudinary').v2
cloudinary.config(
  {
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
  }
)
// database
const connectDB = require('./db/connect')

//routes
const productRouter = require('./routes/productroutes')

app.use(express.static('./public'))
app.use(express.json())
app.use(fileupload({useTempFiles: true}))

app.use('/api/v1/products', productRouter)
const port = process.env.PORT || 4500
  
const start = async () => {
      try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=> console.log(`On port ${port}`))
      } catch (error) {
        console.log(error);
        
      }
}

start()