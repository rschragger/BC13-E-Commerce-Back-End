const router = require('express').Router();
const { Tag, Product, ProductTag  } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll(
      // Includes associated associated Product data
      { include: [{ model: Product }] }
    )
    res.status(200).json(tagData)
  } catch (err) {
    res.status(400).json("Tag All Data error: " + err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const oneTagData = await Tag.findByPk(
      req.params.id, {
  // includes associated Product data
      include: [{ model: Product }],
    });
    if (!oneTagData) {
      res.status(404).json({ message: `No tag found for id ${req.params.id}` });
      return;
    }
    res.status(200).json(oneTagData);
  } catch (err) {
    res.status(500).json('One Tag by ID error:' + err);
  }


});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const addTagData = await Tag.findOrCreate({
      where:{tag_name: req.body.tag_name,},
    });
    res.status(200).json(addTagData)
  } catch (err) {
    res.status(400).json({ message: `Add tag data error: ${err}` });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = await Tag.update(
      {
      tag_name: req.body.tag_name,
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updateTagData)
  } catch (err) {
    res.status(400).json({ message: `Update tag data: ${err}` });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteTag) {
      res.status(404).json({ message: `No Tag found with id ${req.params.id}!` });
      return;
    }
    res.status(200).json(deleteTag)

  } catch (err) {
    res.status(400).json({ message: `Delete Tag data: ${err}` });
  }
});

module.exports = router;
