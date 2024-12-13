const { User, Role } = require("../models");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Role, attributes: ["name"] }],
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
