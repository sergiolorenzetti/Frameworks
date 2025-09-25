const express = require('express')
const app = express()
const port = 3000

const healthCheckRoutes = require ('./routes/healthCheck')
const usersRoutes = require('./routes/users_routes')
const alunoRoutes = require('./routes/alunoRoutes')

app.use(express.json())

app.use('/', healthCheckRoutes)
app.use ('/users', usersRoutes)
app.use ('/alunos', alunoRoutes)

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}!`))