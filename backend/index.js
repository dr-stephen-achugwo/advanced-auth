const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// connect to database============
const db = process.env.MONGO_URI;
mongoose
    .connect(db)
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`);
});
