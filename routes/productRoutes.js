const router = require("express").Router();
const crypto = require('crypto');


// ARRAY OF PRODUCT

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

// ALL PRODUCT URL
router.get("/", (req, res) => {
  res.status(200).json(products);
});

// ADD PRODUCT URL
router.post("/", (req, res) => {
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

// GET A PRODUCT URL
router.get('/:id', (req, res) =>{
    const product = products.find(product => product.id == req.params.id)

    if(!product){
        return res.status(404).json({message : "product not found"})
    }

    console.log(req.params)
   res.status(200).json(product);

})

// EDIT A PRODUCT URL
router.put('/:id' , (req, res)=>{
    const product = products.find(product => product.id == req.params.id)
    if(!product){
        return res.status(404).json({message : "product not found"})
    }
    const { name, price, quantity, active } = req.body;
    
    if(name){
        product.name = name
    }
    if(price){
        product.price = price
    }
    if(quantity){
        product.quantity = quantity
    }
    if("active" in req.body){
        product.active = active
    }

    console.log('active' , active)

    res.status(200).json({message : "Product Updated"})

})

// DELETE A PRODUCT URL
router.delete('/:id' , (req, res)=>{
    const productIndex = products.findIndex(product => product.id == req.params.id)

    if(productIndex == -1){
        return res.status(404).json({message : "Product Not Found"})
    }

    products.splice(productIndex , 1)
    res.status(200).json({message : "Product Deleted"})
})


module.exports = router