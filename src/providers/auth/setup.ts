import passport from "passport";
import { Router } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { appConfig } from "../../common/config";


passport.use(
  new GoogleStrategy(
    {
      clientID: appConfig.google.clientId || "",
      callbackURL: appConfig.google.callbackURL || "", 
      clientSecret: appConfig.google.clientSecret || " ",
    },
    (accessToken, refreshToken, profile) => {
      console.log(accessToken, refreshToken, profile);
    },
  ),
);


const socialRouter = Router();

socialRouter.get(
  "/google",
  (req, res, next) => {
    console.log("google auth");
    next();
  },
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
