const express = require('express') //brings in express

const app = express() //initialize app variable with express

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000 //looks for environment variable called PORT to use for Heroku, if not, it will go to 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); //listen on a PORT