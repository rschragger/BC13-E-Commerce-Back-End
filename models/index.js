// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
// Categories have many Products
Category.hasMany(Product,{
  foreignKey:'category_id',
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag,{
  through:ProductTag,
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product,{
  through:ProductTag,
})

//Learned syntax for MtoM from https://sebhastian.com/sequelize-belongstomany/#:~:text=The%20Sequelize%20belongsToMany()%20method%20is%20used%20to%20create%20a,primary%20keys%20of%20both%20models.
await Product.sync();
await ProductTag.sync();
await Tag.sync();



module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
