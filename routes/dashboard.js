const express = require("express");
const router = express.Router();

// Home page - Dashboard.
router.get("/", function (req, res) {
  res.render("login", {
    name: process.env.NAME,
    dashboardTitle: process.env.DASHBOARD_TITLE,
  });
});

router.get("/dashboard1", function (req, res) {
  res.render("dashboard1", {
    name: process.env.NAME,
    dashboardTitle: process.env.DASHBOARD_TITLE,
  });
});

router.get("/user", function (req, res) {
  res.render("user", {
    name: process.env.NAME,
    dashboardTitle: process.env.DASHBOARD_TITLE,
  });
});

router.get("/home", function (req, res) {
  res.render("home", {
    name: process.env.NAME,
    dashboardTitle: process.env.DASHBOARD_TITLE,
  });
});

module.exports = router;
