const router = require("express").Router();
const { Post, Comment, User } = require("../models");

// Get all posts by user who is logged in
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    if (req.session.loggedIn) {
      res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
      return;
    }
  } catch (err) {
    res.json(err);
  }
});

// Make a blog post
router.post("/", async (req, res) => {
    try {
      const postData = await Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


