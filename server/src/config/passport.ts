const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

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

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    User.findById(id, (err: Error, user: any) => {
      done(null, user);
    });
  });
};

// function (passport: any) {
//   passport.use(
//     new LocalStrategy((email: string, password: string, done: any) => {
//       User.findOne({ email: email }, (err: Error, user: any) => {
//         if (err) throw err;
//         if (!user) return done(null, false);
//         bcrypt.compare(password, user.password, (err: Error, result: any) => {
//           if (err) throw err;
//           if (result === true) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//         });
//       });
//     })
//   );

//   passport.serializeUser((user: any, cb: any) => {
//     cb(null, user.id);
//   });

//   passport.deserializeUser((id: string, cb: any) => {
//     User.findOne({ _id: id }, (err: Error, user: any) => {
//       const UserInformation = {
//         email: user.email,
//       };
//       cb(err, UserInformation);
//     });
//   });
// };
