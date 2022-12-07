import express from "express";
import passport from "passport";
const router = express.Router();
const homeController = require('../controllers/home');

router.post("/register", homeController.registerUser);
router.post("/login", passport.authenticate("local", {session: true}), (req, res) => {
  res.send("Successfully Authenticated");
});
router.get('/user', (req, res) => {
  console.log(req.user);
})

module.exports = router;
