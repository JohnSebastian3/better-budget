const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

import { DatabaseUserInterface } from "../interfaces/UserInterface";
// Load User Model
import User from "../models/User";

module.exports = function (passport: any) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      (email: string, password: string, done: any) => {
        // Match user
        User.findOne({ email: email })
          .then((user: any) => {
            if (!user) {
              return done(null, false, { message: "Email is not registered" });
            }

            // Match password
            bcrypt.compare(
              password,
              user.password,
              (err: Error, isMatch: boolean) => {
                if (err) throw err;

                if (isMatch) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: "Incorrect Password" });
                }
              }
            );
          })
          .catch((err: Error) => console.log(err));
      }
    )
  );

  passport.serializeUser((user: DatabaseUserInterface, done: any) => {
    done(null, user._id);
  });

  passport.deserializeUser((id: string, done: any) => {
    User.findById(id, (err: Error, user: DatabaseUserInterface) => {
      done(null, user);
    });
  });
};

