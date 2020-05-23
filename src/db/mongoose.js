const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/products_service', {useNewUrlParser: true, useUnifiedTopology:true});
mongoose.connection.once('open', () => console.log('Connected'))
                    .on('error', (error) => console.log(error))