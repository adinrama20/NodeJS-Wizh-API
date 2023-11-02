const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.post("/", async (req, res) => {
  const article = new Blog(req.body);

  article.uploadAt = new Date().toISOString();
  article.updatedAt = article.uploadAt;

  const findArticle = await Blog.findOne({ title: req.body.title });
  if (findArticle) {
    return res.status(400).json({
      message: "Blog already exist",
      status: "Failed",
    });
  }

  const savedBlog = await article.save();
  res.status(201).json({
    message: "Successfully post article on blog",
    status: "Success",
    data: savedBlog,
  });
});

router.get("/", async (req, res) => {
  const article = await Blog.find();

  res.status(200).json({
    status: "Success",
    data: article,
  });
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  const findArticle = await Blog.findById(_id);

  if (!findArticle) {
    return res.status(404).json({
      message: "Article not found",
      status: "Failed",
    });
  }

  res.status(200).json({
    message: "Article found",
    status: "Success",
    data: findArticle,
  });
});

router.put("/:_id", async (req, res) => {
  const { _id } = req.params;

  const findArticle = await Blog.findById(_id);

  if (!findArticle) {
    return res.status(404).json({
      message: "Article not found",
      status: "Failed",
    });
  }

  const { title, photos, article, tags } = req.body;

  const articleUpdate = await Blog.findByIdAndUpdate(
    _id,
    {
      title,
      photos,
      article,
      tags,
      updatedAt: new Date().toISOString(),
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    message: "Successfully update article",
    status: "Success",
    data: articleUpdate,
  });
});

router.delete("/:_id", async (req, res) => {
  const { _id } = req.body;

  const findArticleId = await Blog.findById(_id);
  if (!findArticleId) {
    return res.status(404).json({
      message: "Article failed to delete",
      status: "Failed",
    });
  }

  await Blog.findByIdAndDelete(_id);
  res.status(201).json({
    message: "Successfully delete article",
    status: "Success",
  });
});

module.exports = router;
