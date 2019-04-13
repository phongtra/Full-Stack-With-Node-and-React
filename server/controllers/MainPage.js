const mongoose = require("mongoose");

const Crossfire = mongoose.model("Crossfire");

exports.createWeapon = async (req, res, next) => {
  const { weapon, model, price } = req.body;
  if (!weapon) {
    return res.status(422).send({ error: "Weapon is required" });
  }
  try {
    const newWeapon = new Crossfire({
      weapon,
      model,
      price,
      _user: req.user._id,
      dateSent: Date.now()
    });
    await newWeapon.save();
    res.send(newWeapon);
  } catch (e) {
    next(e);
  }
};

exports.fetchWeapons = async (req, res, next) => {
  try {
    const weapons = await Crossfire.find({ _user: req.user._id });
    res.send(weapons);
  } catch (e) {
    next(e);
  }
};
