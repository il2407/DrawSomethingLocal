const GameData = require("../models/gameData");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.gameDatas_add_new_gameData = (req, res, next) => {
  const gameData = new GameData({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,

    word: req.body.word,
    time: req.body.time,
    points: req.body.points,
    score: req.body.score,
  });
  gameData
    .save()
    .then((result) => {
      res.status(200).json({
        message: "GameData added successfully",
        createdUser: {
          _id: result._id,
          word: result.word,
          time: result.time,
          points: result.points,
          score: result.score,
          request: {
            type: "POST",
            url: "http://localhost:5001/game-data/",
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.gameDatas_get_all = (req, res, next) => {
  // Find all proudtcs in DB
  GameData.find()
    // select() lets us choose which values we want to return
    .select("word time points score _id")
    .then((docs) => {
      // Returning a better response with more data.
      const response = {
        count: docs.length,
        gameDatas: docs.map((doc) => {
          return {
            word: doc.word,
            time: doc.time,
            points: doc.points,
            score: doc.score,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5001/game-data/",
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.gamedata_edit = (req, res, next) => {
  //   Extracting product id from params;
  const id = req.params.gameDataId;
  //   Find object by id and update propValues
  GameData.findOneAndUpdate(
    { name: id },
    {
      word: req.body.newWord,
      time: req.body.newTime,
      points: req.body.newPoints,
      score: req.body.newScore,
    }
  )
    .exec()
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        result: result,
        name: id,
        request: {
          type: "PUT",
          url: "http://localhost:5001/game-data/" + id,
        },
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({ error: err });
    });
};
