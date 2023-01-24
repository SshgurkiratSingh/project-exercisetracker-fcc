const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const user = require('./models/tracker')
const postRoute = require('./routers/post');
const getRoute = require('./routers/get');

require('dotenv').config()
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.set('view engine', 'ejs')
app.use(cors())
app.use('/', postRoute);
app.use('/api', getRoute);
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.render('index.ejs')
});

mongoose.connect(process.env.mongo, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB connected')
).catch(err => console.log(err));




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
