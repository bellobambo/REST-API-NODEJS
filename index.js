const express = require("express");

const app = express();

// MIDDLEWARE CONVERT RESPONSE TO JSON
app.use(express.json());
app.use('/api/products', require('./routes/productRoutes'))

//   BASE URL

app.get("/", (request, response) => {
    response.json({
        message: 'Welcome! Simple & Free CRUD API',
        contactEmail: 'bellobambo21@gmail.com',
        githubLink: 'https://github.com/bellobambo/REST-API-NODEJS'
    });
});

  

// HOST(LOCALHOST:3000)
app.listen(3000, () => console.log("Server Started on PORT 3000"));
