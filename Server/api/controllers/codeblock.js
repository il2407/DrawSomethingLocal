const CodeBlock = require("../models/codeblock");
const mongoose = require("mongoose");

exports.codeblocks_get_all = (req, res, next) => {
  // Find all proudtcs in DB
  CodeBlock.find()
    // select() lets us choose which values we want to return
    .select("title text _id")
    .then((docs) => {
      // Returning a better response with more data.
      const response = {
        count: docs.length,
        codeblocks: docs.map((doc) => {
          return {
            title: doc.title,
            text: doc.text,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5001/codeblocks/" + doc._id,
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

exports.codeblocks_create_codeblock = (req, res, next) => {
  // creating a new  object before saving it to DB
  const codeblock = new CodeBlock({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    text: req.body.text,
  });

  codeblock
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Handling POST requests to /codeblocks",
        createdCodeBlock: {
          title: result.title,
          text: result.text,
          _id: result._id,
          request: {
            type: "POST",
            url: "http://localhost:5001/codeblocks/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.codeblocks_get_by_id = async (req, res, next) => {
  //   Extracting  id from params;
  const id = req.params.codeblockId;
  await CodeBlock.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          title: doc.title,
          text: doc.text,
          _id: doc._id,
          request: {
            type: "GET",
            url: "http://localhost:5001/codeblocks/" + doc._id,
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.codeblocks_edit = (req, res, next) => {
  //   Extracting  id from params;
  const id = req.params.codeblockId;
  const updateOps = {};
  //   Iterating through updated props
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  //   Find object by id and update propValues
  CodeBlock.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        result: result,
        _id: id,
        request: {
          type: "GET",
          url: "http://localhost:5001/codeblocks/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.codeblocks_delete = (req, res, next) => {
  //   Extracting  id from params;
  const id = req.params.codeblockId;
  CodeBlock.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        result: result,
        _id: id,

        request: {
          type: "DELETE",
          url: "http://localhost:5001/codeblocks/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
