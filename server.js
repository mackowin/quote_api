const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, generateId } = require('./utils');

const PORT = process.env.PORT || 4007;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({quote: randomQuote});
});

app.get('/api/quotes', (req, res, next) => {
  const personInput = req.query.person;
  const personQuotes = [];

  if(personInput !== undefined) {
    for (let quoteObject in quotes) {
      if(quotes[quoteObject].person === personInput) {
        personQuotes.push(quotes[quoteObject]);
      }
    };
    res.send({quotes: personQuotes});
  } else {
    res.send({quotes: quotes});
  }
});

app.post('/api/quotes', (req, res, next) => {
  const quoteQuery = req.query.quote;
  const personQuery = req.query.person;
  const newId = generateId(quotes);

  if(quoteQuery !== undefined && personQuery !== undefined) {
    const newQuoteObject = {
        id: newId,
        quote: quoteQuery,
        person: personQuery
    };
    quotes.push(newQuoteObject);
    res.send({quote: newQuoteObject});
  } else {
    res.status(400).send();
  }
});

app.put('/api/quotes/:id', (req, res, next) => {
  const id = req.params.id;
  const quoteQuery = req.query.quote;
  const personQuery = req.query.person;

  if(id > 0 && id <= quotes.length){
    const updatedQuoteObject = {
      id: id,
      quote: quoteQuery,
      person: personQuery
    };
    quotes[id-1] = updatedQuoteObject;
    res.send({quote: updatedQuoteObject});
  } else {
    res.status(404).send('ehh');
  }
});

app.delete('/api/quotes/:id', (req, res, next) => {
  const id = req.params.id;
  if(id > 0 && id <= quotes.length) {
    quotes.splice(id-1, 1);
    quotes.map(object => object.id -= 1);
    res.status(204).send();
  }else{
    res.status(404).send('grr');
  }
})

app.listen(PORT, () => {console.log(`I am listening on ${PORT}`)})
