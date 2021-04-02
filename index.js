const express = require('express');
const dotenv = require('dotenv')
const routes = require('./server/routes/index');
const app = express();
const port = process.env.PORT || 3000;

if(process.env.NODE_ENV !== 'production'){
  dotenv.config()
}

app.use(express.json());
app.use('/', routes);

app.get('*', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
