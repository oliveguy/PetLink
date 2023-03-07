const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
  res.send('PetLink homepage');
})

app.listen(8080, ()=>{
  console.log('listening on 8080')
})