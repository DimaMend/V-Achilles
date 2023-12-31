import express from "express";
import passport from "../utils/passport";
import Projects from "../controller/projects";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  Projects.getProjects
);
router.get(
  "/search",
  passport.authenticate("jwt", { session: false }),
  Projects.searchProjects
);
router.get(
  "/is-packge-json",
  passport.authenticate("jwt", { session: false }),
  Projects.isPackgeJson
);
router.get(
  "/package-json-content",
  passport.authenticate("jwt", { session: false }),
  Projects.packageJsonContent
);

export default router;
