const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect('mongodb+srv://Admin:abcde12345@justtweetdb.ncqc20n.mongodb.net/?retryWrites=true&w=majority&appName=JustTweetDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Middleware
app.use(cors());
app.use(express.json());

// Tweet Schema
const tweetSchema = new mongoose.Schema({
  content: String,
});

const Tweet = mongoose.model('Tweet', tweetSchema);

// Routes
app.get('/tweets', async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.json(tweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/tweets', async (req, res) => {
  const tweet = new Tweet({
    content: req.body.content,
  });

  try {
    const newTweet = await tweet.save();
    res.status(201).json(newTweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/tweets/:id', async (req, res) => {
  try {
    const tweet = await Tweet.findByIdAndDelete(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    res.json({ message: 'Tweet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});