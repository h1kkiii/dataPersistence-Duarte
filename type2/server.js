const express = require('express')
const session = require('express-session')
const path = require('path')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}))

app.use(express.static(path.join(__dirname)))

app.get('/api/students', (req, res) => {
  req.session.students = req.session.students || []
  res.json(req.session.students)
})

app.post('/api/students', (req, res) => {
  const { name, age, grade } = req.body
  req.session.students = req.session.students || []
  req.session.students.push({ name, age, grade })
  // Sort
  req.session.students.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return b.grade - a.grade
  })
  res.json(req.session.students)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`)
})