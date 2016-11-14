const User = require('../models/user');
const Listing = require('../models/listing');
const Conversation = require('../models/conversation');
const Message = require('../models/message');
const mongoose = require('mongoose');

exports.getMessagesFromConversation = function (req, res) {
  Conversation
    .findOne({_id: req.params.conversationID})
    .select('messages')
    .populate('messages')
    .exec(function(err, conversation) {
      if (err) {
        return res.status(400).send({ success: false, message: err});
      }
      if (conversation == null) {
        return res.status(400).send({ success: false, message: "No conversation matching that ID"});
      }
      res.json(conversation.messages);
    });
}

exports.postToConversation = function (req, res) {
  var newMessage = new Message({
    sender: req.user._id,
    text: req.body.text
  });

  newMessage.save(function(err, message) {
    if (err) {
      return res.status(400).json({ success: false, message: err});
    }
    Conversation
      .findOneAndUpdate({_id: req.params.conversationID}, {$push: {"messages": message._id}})
      .exec(function(err, conversation) {
        if (err) {
          return res.status(400).send(err);
        }
        res.json({
          success: true,
          message: 'Successfully created new message.',
          listingID: message._id
        });
      });
  });
}

exports.getMessagesFromItem = function (req, res) {
  Conversation
    .findOne({buyer: req.user._id, item: req.params.itemID})
    .select('messages')
    .populate('messages')
    .exec(function(err, conversation) {
      if (err) {
        return res.status(400).send(err);
      }
      res.json(conversation.messages);
    });
}

exports.postToItem = function (req, res) {
  var newMessage = new Message({
    sender: req.user._id,
    text: req.body.text
  });

  newMessage.save(function(err, message) {
    if (err) {
      return res.status(400).json({ success: false, message: err});
    }
    Conversation
      .findOneAndUpdate({buyer: req.user._id, item: req.params.itemID}, {$push: {"messages": message._id}}, {upsert:true})
      .exec(function(err, conversation) {
        if (err) {
          return res.status(400).send(err);
        }
        res.json({
          success: true,
          message: 'Successfully created new message.',
          listingID: message._id
        });
      });
  });
}
