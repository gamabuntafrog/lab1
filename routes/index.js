var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");

const store = {
  emails: [], // email {theme, description, sendDate, to: {name, address}}
};

router.get("/", async function (req, res) {
  res.status(200).json({ data: { emails: store.emails } });
});

router.post("/", async function (req, res) {
  const { theme, description, to = {} } = req.body;
  const { name, address } = to;

  if (!theme || !description || !name || !address) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  store.emails.push({
    id: v4(),
    theme,
    description,
    sendDate: new Date(),
    to: { name, address },
  });

  res.status(200).json({ message: "SUCCESS" });
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  const email = store.emails.find((em) => em.id === id);

  if (!email) {
    return res.status(404).json({ message: "NOT FOUND" });
  }

  res.status(200).json({ data: { email } });
});

router.put("/:id", async function (req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  const { theme, description, to = {} } = req.body;

  const { name, address } = to;

  const emailIndex = store.emails.findIndex((em) => em.id === id);

  if (emailIndex === -1) {
    return res.status(404).json({ message: "EMAIL NOT FOUND" });
  }

  const updatedEmail = {};

  if (typeof theme === "string") {
    updatedEmail.theme = theme;
  }

  if (typeof description === "string") {
    updatedEmail.description = description;
  }

  if (typeof name === "string") {
    updatedEmail.name = name;
  }

  if (typeof address === "string") {
    updatedEmail.address = address;
  }

  store.emails[emailIndex] = { ...store.emails[emailIndex], ...updatedEmail };

  res.status(200).json({ message: "SUCCESS" });
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  const email = store.emails.find((em) => em.id === id);

  if (!email) {
    return res.status(404).json({ message: "NOT FOUND" });
  }

  store.emails = store.emails.filter((el) => el.id !== id);

  res.status(200).json({ message: "SUCCESS" });
});

module.exports = router;
