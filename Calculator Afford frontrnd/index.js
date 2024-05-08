const express = require('express');
const { fetchNumber, calculateAverage } = require('./helpers'); 

const app = express();
const windowSize = 10;

let numberSet = new Set();

app.get('/numbers/:numberid', async (req, res) => {
  const numberId = req.params.numberid;

  if (!['p', 'f', 'e', 'r'].includes(numberId)) {
    return res.status(400).send('Invalid number ID');
  }
  const newNumber = await fetchNumber(numberId);
  if (!newNumber) {
    return res.status(500).send('Error fetching number');
  }

  numberSet.add(newNumber);

  const before = Array.from(numberSet);
  const after = before.slice();
  after.push(newNumber);
  const average = calculateAverage(numberSet.size >= windowSize ? numberSet.slice(-windowSize) : numberSet);

  if (numberSet.size > windowSize) {
    numberSet.delete(before[0]);
  }

  res.json({
    before,
    after,
    average,
  });
});

app.listen(4000, () => console.log('Server listening on port 4000'));
