const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

// DB connection code

// Mount it along with our other middleware, ABOVE the routes
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

// routes below

const app = express();




// Lets connct to MongoDB
mongoose.connect(process.env.MONGODB_URI);

//LETS  UPDATE THE TERMINAL WITH CORRECT STATUS

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });


  const Fruit = require('./models/fruit.js');

app.use(express.urlencoded({ extended: false }));

//app for all routes//

app.get('/', async  (req, res) => {
    res.render('index.ejs');
});

app.get('/fruits', async (req, res) => {
    const allFruits = await Fruit.find();
    res.render('fruits/index.ejs', { fruits: allFruits });
    // res.send('welcome to the fruits index page')
}) 

app.get('/fruits/new', async (req,res) => {
    res.send('fruits/new.ejs');
});

app.get('/fruits/:fruitID', async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    // res.send(`this route render the show page for fruit id: ${req.params.fruitID} `);
    res.render('fruits/show.ejs', { fruit: founfFruit });
});

app.post('/fruits', async (req, res) => {
    if (req.body.isReadyToEat ==='on') {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }

    await Fruit.create(req.body);
    res.redirect('/fruits/new');
    // console.log(req.body);
});

app.delete('/fruits/:fruitID', async (req, res) => {
    await frit.findByIdAndDelete(req.params.fruitID);
    res.redirect('/fruit');
});

app.put("/fruits/:fruitId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    
    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.fruitId}`);
  });


//____________________________________________//

app.listen(3000, () => {
    console.log('Express is listening on port 3000...')
})