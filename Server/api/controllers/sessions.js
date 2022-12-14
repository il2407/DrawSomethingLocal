const Session = require("../models/sessions");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sessions_add_new_session = (req, res, next) => {
  Session.find({ uuid: req.body.uuid })
    .exec()
    .then((session) => {
      if (session.length >= 1) {
        res.status(409).json({
          message: "Session address already exists",
        });
      } else {
        const session = new Session({
          _id: new mongoose.Types.ObjectId(),
          uuid: req.body.uuid,
          user: req.body.user,
        });
        session
          .save()
          .then((result) => {
            res.status(200).json({
              message: "Session added successfully",
              createdUser: {
                _id: result._id,
                uuid: result.uuid,
                user: result.user,
                request: {
                  type: "POST",
                  url: "http://localhost:5001/codeblocks/" + result._id,
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
      }
    });
};
