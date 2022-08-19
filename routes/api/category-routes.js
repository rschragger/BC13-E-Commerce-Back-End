const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // Category associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json('categoryData' + err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(
      req.params.id, {
      include: [{ model: Product }],
    });
    if(!categoryData){
      res.status(404).json({ message: `No category found for id ${req.params.id}` });
    return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json('categoryData by ID' + err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const addCategoryData = await Category.create({
      category_name : req.body.category_name,
    }, { fields: ['category_name'] }); //do not allow 'id' to be sent in body
    res.status(200).json(addCategoryData)
  } catch (err) {
    res.status(300).json({message:`Add category data: ${err}`});
  }
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategoryData = await Category.update({
      category_name : req.body.category_name,
    }, {
      where: {
        id: req.body.id
      }});
    res.status(200).json(updateCategoryData)
  } catch (err) {
    res.status(300).json({message:`Update category data: ${err}`});
  }
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where:{
        id:req.params.id
      }});
      if (!deleteCat) {
        res.status(404).json({ message: `No category found with id ${req.params.id}!` });
        return;
      }
      res.status(200).json(deleteCat)

  } catch (err) {
    res.status(300).json({message:`Delete category data: ${err}`});
  }
});

module.exports = router;
