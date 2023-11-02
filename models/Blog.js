const db = require("../database/db");

const blogSchema = new db.Schema({
  title: {
    type: String,
    required: true,
  },
  photos: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  uploadAt: String,
  updatedAt: String,
});

const Blog = db.model("blogs", blogSchema);
module.exports = Blog;
