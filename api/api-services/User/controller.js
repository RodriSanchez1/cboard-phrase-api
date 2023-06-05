const User = require('./model');
const Communicator = require('../Communicator/model');

const login = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email })
      .populate({ path: 'communicators categories' })
      .exec();
    if (!findUser || findUser.password !== req.body.password)
      return res.status(404).json({ message: 'Wrong email or password' });
    return res.status(200).json(findUser);
  } catch (e) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  req.body.isFirstLogin = true;
  try {
    const findUser = await User.findOne({ email: req.body.email }).exec();

    console.log(req.body);

    if (findUser)
      return res.status(400).json({ message: 'User already exists' });

    const user = new User(req.body);

    const communicator = new Communicator({
      name: `${req.body.name} communicator`,
      email: req.body.email,
      author: req.body.name,
      rootCategory: 'c4e1f6g8h2',
      categories: [
        'c4e1f6g8h2',
        'c0e4g2j6k8',
        'r2e5s7t9a1u',
        'd2c8f9g1h5',
        'a0b1c2d3e4',
        'h3e9t6k8p2',
        's0c5i2a1l8',
        'e9m2k6h7t3',
      ],
    });

    const newUser = await user.save();
    const newCommunicator = await communicator.save();

    if (newUser) return res.status(201).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const UPDATEABLE_FIELDS = [
  'email',
  'name',
  'birthdate',
  'locale',
  'location',
  'isFirstLogin',
];

const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log(id, req.body);
  // if (!req.user.isAdmin && req.auth.id !== id) {
  //   return res.status(403).json({
  //     message: 'You are not authorized to update this user.',
  //   });
  // }
  try {
    const user = await User.findById(id)
      // .populate('communicators')
      // .populate('categories')
      .exec();

    if (!user) {
      return res.status(404).json({
        message: 'Unable to find user. User Id: ' + id,
      });
    }
    for (let key in req.body) {
      if (UPDATEABLE_FIELDS.includes(key)) {
        user[key] = req.body[key];
      }
    }

    const dbUser = await user.save();
    if (!dbUser) {
      return res.status(404).json({
        message: 'Unable to find user. User id: ' + id,
      });
    }
    return res.status(200).json(dbUser);
  } catch (err) {
    return res.status(500).json({
      message: 'Error saving user. ',
      error: err.message,
    });
  }
};

module.exports = { login, createUser, updateUser };
