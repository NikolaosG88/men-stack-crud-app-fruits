const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { default: mongoose } = require('mongoose');


const app = express();

// Lets connct to MongoDB
mongoose.connect(process.env.MONGODB_URI);

//LETS  UPDATE THE TERMINAL WITH CORRECT STATUS

mongoose.connection.openUri('connected', () => {
    console.log(`connected to MDG ${mongoose.connection.name}`)
});


const Fruit = require('./models/fruit');

app.use(express.urlencoded({ extended: false }));

//app for all routes//

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/fruits/new', (req,res) => {
    res.send('This route send the user a form page');
});

app.post('/fruits', async (req, res) => {
    if (req.body.isReadyToEat ==='on') {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    // console.log(req.body);
    // res.redirect('/fruits/new');
})


//_______________________//

app.listen(3000, () => {
    console.log('Express is listening on port 3000...')
})