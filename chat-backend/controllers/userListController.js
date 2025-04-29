const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    // Get all users except the current logged-in one
    const users = await User.findAll({
      where: {
        id: { [require('sequelize').Op.ne]: currentUserId }
      },
      attributes: ['id', 'username', 'email']
    });

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};
