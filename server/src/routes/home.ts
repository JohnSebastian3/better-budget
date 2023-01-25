import express from "express";
import passport from "passport";
const router = express.Router();
const homeController = require('../controllers/home');

router.post("/register", homeController.registerUser);
router.post("/login", passport.authenticate("local", {session: true}), (req, res) => {
  res.sendStatus(200);
});
router.get('/user', homeController.getUser);
router.get('/logout', homeController.logoutUser);

module.exports = router;
