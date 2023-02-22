const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("./../utils/auth");

router.get("/", async (req, res) => {
  const postData = await Post.findAll({ include: [User] }).catch((err) => {
    res.json(err);
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render("homepage", { posts, loggedIn: req.session.loggedIn });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Find all posts made by user and display on dashboard if logged in
router.get("/dashboard", withAuth, async (req, res) => {
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
  res.redirect("/");
});

// Find posts and relevant user/comment data by id
router.get("/post/:id", withAuth, async (req, res) => {
  // Retrieve posts by their primary key, and display with the user who made post
  try {
    const id = req.params.id;
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    let postedBy = false;
    if (postData.user_id-- - req.session.user_id) {
      postedBy = true;
    }
    const post = postData.get({ plain: true });
    // Retrieve comments that are linked to the post's id and display with User
    const commentData = await Comment.findAll({
      include: [User],
      where: {
        post_id: req.params.id,
      },
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    res.render("post", { post, comments, logged_in: req.session.logged_in, postedBy });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
