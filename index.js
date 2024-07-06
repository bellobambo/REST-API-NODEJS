const express = require("express");
const crypto = require('crypto');

const app = express();

app.use(express.json());

const products = [
    {
      "id": "f7e0464a-6dcd-4b09-97e7-e0dc141d02dq",
      "name": "Laptop",
      "price": 400,
      "quantity": 4,
      "active": true
    },
    {
        
      "id": "f7e0464a-6dcd-4b09-97e7-e0dc141d02da",
      "name": "KeyBoard",
      "price": 29.99,
      "quantity": 10,
      "active": true
    },
    {
      "id": "f7e0464a-6dcd-4b09-97e7-e0dc141d02df",
      "name": "Thinkpad",
      "price": "550.00",
      "quantity": 1,
      "active": true
    }
  ];

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.post("/products", (req, res) => {
  const { name, price, quantity, active } = req.body;

  if (!name) {
    return res.status(422).json({ message: "name is required" });
  }

  const id = crypto.randomUUID()

  products.push({
    id,
    name,
    price,
    quantity,
    active,
  });

  res.status(201).json({ message: "product created successfully" , id });
});

app.get('/products/:id', (req, res) =>{
    const product = products.find(product => product.id == req.params.id)
    console.log(req.params)
   res.status(200).json(product);

})

app.listen(3000, () => console.log("Server Started on PORT 3000"));
