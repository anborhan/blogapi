"use strict"

const mongoose = require("mongoose");

//this is our schema to represent a blog post
const blogPostSchema = mongoose.Schema({
    author: {
        firstName: String,
        lastName: String
      },
      title: {type: String, required: true},
      content: {type: String},
    created: {type: Date, default: Date.now}
});

blogPostSchema.virtual('authorName').get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
  });
  
  blogPostSchema.methods.serialize = function() {
    return {
      id: this._id,
      author: this.authorName,
      content: this.content,
      title: this.title,
      created: this.created
    };
  };
  
// schema must be defined *before* we make the call to `.model`.
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = { BlogPost };