import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { UserInterface } from "../interfaces/UserInterface";
module.exports = {
  registerUser: async (req: Request, res: Response) => {
    const { email, username, password } = req?.body;
    if (
      !email ||
      !username ||
      !password ||
      typeof email !== "string" ||
      typeof username !== "string" ||
      typeof password !== "string"
    ) {
      res.send("Improper values");
    }

     User.findOne({ email }, async (err: Error, doc: UserInterface) => {
      if (err) throw err;
      if (doc) res.send("Email already registered");
      if (!doc) {
        User.findOne({username}, async (err:Error, doc: UserInterface) => {
          if(err) throw err;
          if(doc) res.send("Username is in use");
          if(!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
              username,
              email,
              password: hashedPassword,
            });
            await newUser.save();
            res.send("Successfully registered");
          }
        })
       
       
      }
    });
  },
  getUser: (req: Request, res: Response) => {
    // const loggedInUser = await User.findOne({email: req.query.email})
    // res.send(loggedInUser);
    res.send(req.user);
  }
};
