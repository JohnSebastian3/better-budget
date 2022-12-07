import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { DatabaseUserInterface } from "../interfaces/UserInterface";
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

     User.findOne({ email }, async (err: Error, doc: DatabaseUserInterface) => {
      if (err) throw err;
      if (doc) res.send("Email already registered");
      if (!doc) {
        User.findOne({username}, async (err: Error, doc: DatabaseUserInterface) => {
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
            res.sendStatus(200);
          }
        })
       
       
      }
    });
  },
  getUser: (req: any, res: Response) => {
    res.send(req.user);
  },
  logoutUser: (req: any, res: any) => {
    req.logout((err: Error) => {
      if(err) return err.message;
      res.sendStatus(200);
    });
  }
};
