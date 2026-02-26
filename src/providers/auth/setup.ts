import passport from "passport";
import { Router } from "express";
import { User } from "../../models/user";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "",
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken, profile);
    },
  ),
);

const socialRouter = Router();

socialRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

socialRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  },
);

export default socialRouter;
