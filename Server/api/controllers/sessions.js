const Session = require("../models/sessions");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sessions_add_new_session = (req, res, next) => {
  const session = new Session({
    _id: new mongoose.Types.ObjectId(),
    score: req.body.score,
    time: req.body.time,
  });
  session
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Session added successfully",
        createdUser: {
          _id: result._id,
          score: result.score,
          time: result.time,
          request: {
            type: "POST",
            url: "http://localhost:5001/sessions/",
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

exports.sessions_get_all = (req, res, next) => {
  // Find all proudtcs in DB
  Session.find()
    // select() lets us choose which values we want to return
    .select("score time _id")
    .then((docs) => {
      // Returning a better response with more data.
      const response = {
        count: docs.length,
        sessions: docs.map((doc) => {
          return {
            score: doc.score,
            time: doc.time,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5001/sessions/",
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

exports.session_edit = (req, res, next) => {
  //   Extracting product id from params;
  const id = req.params.sessionId;
  //   Find object by id and update propValues
  Session.findOneAndUpdate(
    { score: id },
    { score: req.body.newScore, time: req.body.newTime }
  )
    .exec()
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        result: result,
        score: id,
        request: {
          type: "PUT",
          url: "http://localhost:5001/sessions/" + id,
        },
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({ error: err });
    });
};
