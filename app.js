const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const routes = require('./src/routes/routes.js')
require('./src/db/mongoose')

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));


app.use('/api/v1', routes)



 app.listen(3000, () => {
    console.log("listening on port 3000");
})





 