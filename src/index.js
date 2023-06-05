import express  from "express";
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'
import usersRoutes from './routes/users.routes.js'
import deliveryRoutes from './routes/delivery.routes.js'
import packageRoutes from './routes/package.routes.js'
import adminRoutes from './routes/admin.routes.js'
import { pool } from "./db.js";

const app = express()
const PORT = 4000

const domainsList = ['http://127.0.0.1:5500', '*', 'http://localhost:5500']

const corsOptions = {
  origin: function (origin, callback) {
    if (domainsList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error(`Not allowed by cors${origin}`))
    }
  },
  credentials: true
}
app.use(express.json())
app.use(cors(corsOptions))
app.use(usersRoutes)
app.use(indexRoutes)
app.use(deliveryRoutes)
app.use(packageRoutes)
app.use(adminRoutes)


//from express return a route and return something in this case a text
app.get("/", (req,res) =>{
    res.send('hola como has estau')
 
})

app.listen(PORT, async () => {
    console.log(`Server running on:${PORT}`)
    
})


