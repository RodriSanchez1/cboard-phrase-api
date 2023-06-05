const Category = require('./model');
const User = require('../User/model');
const Communicator = require('../Communicator/model');

const updateCategories = async (req, res) => {
  const { editingCategories: categories } = req.body;
  try {
    const user = await User.findOne({ email: req.params.email }).exec();
    console.log(categories);
    const userCategories = [];
    const newCategories = [];
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].author === 'Cboard') {
        const newCategory = { ...categories[i] };
        newCategory.author = user.name;
        newCategory.email = user.email;
        delete newCategory.id;
        const updatedCategory = new Category(newCategory);
        const dbCategory = await updatedCategory.save();
        userCategories.push(dbCategory._id);
        newCategories.push(dbCategory);
      } else {
        const lol = await Category.findByIdAndUpdate(
          categories[i].id,
          categories[i],
          { new: true }
        );
        userCategories.push(lol._id);
        newCategories.push(lol);
      }
    }

    const userCommunicator = await Communicator.findOneAndUpdate(
      { email: req.params.email },
      { categories: userCategories },
      { new: true }
    ).exec();

    const response = { newCategories, userCommunicator };

    return res.status(200).json({ response });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { updateCategories };
