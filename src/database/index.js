express = require('express');
const app = express();
const mongoose = require('mongoose');
const linkRoute = require('../routes/calendarRoute');
const cors = require('cors');

mongoose.connect('mongodb://localhost/calendar', { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () =>{ 
    console.log('there was error😢')
});
db.once('open', ()=>{
    console.log('MongoDB Started🚀')
})

app.use(cors());
app.use(express.json());

app.use('/', linkRoute);

app.listen(3000, ()=>{
    console.log('Example app listening on port 3000!🎉')
})