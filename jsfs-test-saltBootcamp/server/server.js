const express = require("express");
const cors = require("cors");
const { json } = require("express");
const Joi = require('joi');
const { v4: uuidv4 } = require("uuid");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const salties = require('./data/salties');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(json());

/**
 * Initial population of developers from the json file
 * The `saltiesArr` is in-memory, so it is destroyed on
 * server restart.
 */

let saltiesArr = [...salties];

const addDeveloperSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  bootcamp: Joi.string().pattern(/^(jsfs)|(dnfs)|(jfs)$/).required()
});

// GET localhost:3001/api/salties
app.get('/api/salties', (_, res) => {
  res.json({ salties: saltiesArr })
})

// POST localhost:3001/api/salties
app.post('/api/salties', (req, res) => {
  const result = addDeveloperSchema.validate(req.body);
  const { error } = result;
  const valid = error == null;
  if (!valid) {
    return res.status(400).json({
      message: 'Bad Request',
      error
    })
  }
  const newDev = {
    name: req.body.name,
    id: uuidv4(),
    bootcamp: req.body.bootcamp,
    role: 'developer'
  }
  saltiesArr.push(newDev)
  res.send({
    developer: newDev
  })
})

// DELETE localhost:3001/api/salties/:id
app.delete('/api/salties/:id', (req, res) => {
  const developerId = req.params.id;
  const developerToDelete = saltiesArr.find((dev) => {
    return dev.id === developerId;
  })
  if (!developerToDelete) {
    return res.status(404).json({
      error: 'Developer with the provided Id not found',
    })
  }
  if (developerToDelete.role !== 'developer') {
    return res.status(400).json({
      error: 'Can only remove salties with role of developer',
    })
  }
  saltiesArr = saltiesArr.filter((dev) => {
    return dev.id !== developerId;
  })
  res.send({
    developer: developerToDelete
  })
})

app.get('/api/reset', (_, res) => {
  saltiesArr = [...salties];
  res.json({ salties: saltiesArr });
});

app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use("*", (_, res) => {
  res.status(400).json({
    message: "Trying to find easter eggs? There are only 3 end points!",
  });
});

app.listen(PORT, () =>
  console.log(`Remember to take breaks. Running on localhost:${PORT}`)
);
