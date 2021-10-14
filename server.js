const express = require('express') //brings in express
const connectDB = require('./config/db') //brings in db file

const app = express() //initialize app variable with express

//Connect Database
connectDB();

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/post', require('./routes/api/post'))

const PORT = process.env.PORT || 5000 //looks for environment variable called PORT to use for Heroku, if not, it will go to 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); //listen on a PORT