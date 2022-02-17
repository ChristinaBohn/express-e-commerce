const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find all categories
router.get('/', (req, res) => {
  Category.findAll({

    // Include all associated Products
    include: [{
      model: Product,
      attributes: ['product_id','product_name']
    }]

  }).then((categoryData) => {
    res.json(categoryData);
  });
});

// Find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {

    // Include all associated Products
    include: [{
      model: Product,
      attributes: ['product_id','product_name']
    }]
  })
  .then((categoryData) => {
    res.json(categoryData);
  });
});

// Create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  });
});

// Update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));

});

// Delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      isbn: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
