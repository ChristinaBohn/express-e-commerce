const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all tags
router.get('/', (req, res) => {
  Tag.findAll(
    {
      include: [Product]
    }
  ).then((tagData) => {
    res.json(tagData);
  });
});

// Find a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findByPk( req.params.id, 
    {
      include: [Product]
    }
    ).then((tagData) => {
    res.json(tagData);
  });
});

// Create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  });
});

// Update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      id: req.body.id,
      product_id: req.body.product_id,
      tag_id: req.body.tag_id
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));

});

// Delete one tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy(
    {
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
