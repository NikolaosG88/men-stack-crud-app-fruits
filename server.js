const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

// DB connection code

// Mount it along with our other middleware, ABOVE the routes
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

// routes below





// Lets connct to MongoDB
mongoose.connect(process.env.MONGODB_URI);

//LETS  UPDATE THE TERMINAL WITH CORRECT STATUS

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

  app.get("/", async  (req, res) => {
      res.render("index.ejs");
  });

const Fruit = require("./models/fruit.js");

app.use(express.urlencoded({ extended: false }));

app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat ==="on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }

    await Fruit.create(req.body);
    res.redirect("/fruits");
    // console.log(req.body);//
});

// //app for all routes//

app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
    // res.send("Welcome to the fruits index page")
    // console.log(allFruits);
}) 



app.get("/fruits/new", (req,res) => {
    res.render("fruits/new.ejs");
});

app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    //  res.send(`This route render the show page for fruit id: ${req.params.fruitID} `);
    res.render("fruits/show.ejs", { fruit: foundFruit });
});


app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
    // res.send("This is the delete route");
});

// app.put("/fruits/:fruitId", async (req, res) => {
//     // Handle the "isReadyToEat" checkbox data
//     if (req.body.isReadyToEat === "on") {
//       req.body.isReadyToEat = true;
//     } else {
//       req.body.isReadyToEat = false;
//     }
    
//     // Update the fruit in the database
//     await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  
//     // Redirect to the fruit"s show page to see the updates
//     res.redirect(`/fruits/${req.params.fruitId}`);
//   });


//____________________________________________//

app.listen(3000, () => {
    console.log("Express is listening on port 3000...")
})