const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


// MONGOOSE SPECIFIC STUFF
main().catch(err => console.log(err));

let Song;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/elMusica');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    Song = mongoose.model('Song', {
        name: String, // Define your schema based on the structure of the 'songs' collection
        path: String,
        // Add other fields as needed
    });
}




// EXPRESS SPECIFIC STUFF
const app = express()
const port = 3000
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// PUG STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));




// PAGE ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('index.pug', params);
});


// MONGO ENDPOINTS
app.get('/api/songs', async (req, res) => {
    try {
        // Fetch data from MongoDB using Mongoose
        const data = await Song.find();

        // Respond with the data as JSON
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





// LISTENING TO PORT 3000
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })