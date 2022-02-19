const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'cascade',
  hooks: true
});

Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

Product.belongsToMany(Tag, {
  foreignKey: 'product_id',
  through: {
    model: ProductTag,
    unique: false
  },
});

Tag.belongsToMany(Product, {
  foreignKey: 'tag_id',
  through: {
    model: ProductTag,
    unique: false
  },
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
