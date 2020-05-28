const router = require('express').Router();
const Cards = require('../models/cards-model.js');
const authenticate = require('../auth/restricted-middleware.js');


//get all cards
router.get('/', authenticate, (req, res) => {
  Cards.find()
    .then(card => {
      res.status(200).json(card)
    })
    .catch(error => {
      res.status(500).json({ message: 'YOU SHALL NOT PASS 🧙🏻‍♂️', error })
    })
});

// get a card by an id
router.get('/:id', authenticate, (req, res) => {
  const { id } = req.params;

  Cards.findById(id)
    .then(card => {
      if (card) {
        res.status(200).json({
          status: 200,
          data: card,
        })
      } else {
        res.status(404).json({ error: 'No cards, create one!'})
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Some error occured 🥺', error })
    })
});

// get a card by user ID
router.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const cards = await Cards.getByUserId(id);
    if(!cards.length)
    return res.status(404).json({
      status: 404,
      message: 'User has no created any cards'
    });
    res.status(200).json({
      status: 200,
      data: cards
    })
  } catch (error) {
    res.status(500).json({
      status:500,
      error: 'Cannot get cards'
    })
  }
});

// create a new card
router.post('/', (req, res) => {
  let cardData = req.body;
  Cards.add(cardData)
    .then(added => {
      res.status(201).json({
        status: added,
      })
    })
    .catch(error => {
      res.status(500).json({ message: 'Unable to add card', error })
    })
});

// edit a card
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, items, user_id } = req.body;

  try {
    const card = await Cards.update(id, { title, items, user_id });
    res.status(200).json({
      status: 200,
      data: card,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'Error has occured, cannot update entry'
    })
  }
});

// delete a card
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Cards.remove(id)
    .then(removed => {
      if (removed) {
        res.json({ message: 'Post has been destroyed 💀'})
      } else {
        res.status(404).json({ message: 'Could not find post with the given id'})
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'An error occured, unable to delete post', error})
    })
})

module.exports = router;