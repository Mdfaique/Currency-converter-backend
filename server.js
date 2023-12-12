
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')

// Configuration of dotenv
dotenv.config();

// Rest of the code
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api",require('./routes/calcRoute'))

app.get('/',(req,res)=>{
  res.send('<h1>Welcome Md Faique</h1>')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
