var express = require("express");
var router = express.Router();
const { Emails } = require("../models/emails");
const { checkId } = require("../middlewares/checkId");
const { checkFields } = require("../middlewares/checkFields");

router.get("/", async function (req, res) {
  const emails = await Emails.find({});

  res.status(200).json({ data: { emails } });
});

router.post(
  "/",
  checkFields(["theme", "description", "to"]),
  async function (req, res) {
    const { theme, description, to = {} } = req.body;
    const { name, address } = to;

    const email = await Emails.create({
      theme,
      description,
      sendDate: new Date(),
      to: { name, address },
    });

    res.status(200).json({ message: "SUCCESS", data: email });
  }
);

router.get("/:id", checkId("id"), async function (req, res) {
  const { id } = req.params;

  const email = await Emails.findById(id);

  if (!email) {
    return res.status(404).json({ message: "NOT FOUND" });
  }

  res.status(200).json({ data: { email } });
});

router.put("/:id", checkId("id"), async function (req, res) {
  const { id } = req.params;

  const email = await Emails.findById(id);

  if (!email) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  const { theme, description, to = {} } = req.body;

  const { name, address } = to;

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

  await Emails.findByIdAndUpdate(id, updatedEmail);

  res.status(200).json({ message: "SUCCESS" });
});

router.delete("/:id", checkId("id"), async function (req, res) {
  const { id } = req.params;

  const email = await Emails.findById(id);

  if (!email) {
    return res.status(404).json({ message: "NOT FOUND" });
  }

  await Emails.findByIdAndDelete(id);

  res.status(200).json({ message: "SUCCESS" });
});

module.exports = router;
