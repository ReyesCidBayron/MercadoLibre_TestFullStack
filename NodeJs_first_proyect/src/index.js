// IMporta las librerias 
import express from 'express'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import indexRoutes from './routes/index.js'

// Ejecuta la app 
const app = express()

// Recupera el nombre del directorio de forma dinamica 
const __dirname = dirname(fileURLToPath(import.meta.url))
// Muestra la url de las vistas en el directorio
console.log(join(__dirname, 'views'))

// Configura ejs 
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(indexRoutes)

app.use(express.static(join(__dirname, 'public')))

// Deja el servidor en espera a los comandos del usuario
app.listen(3000)
console.log('Server is listening on port', 3000)