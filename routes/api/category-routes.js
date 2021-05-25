const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
router.get("/", (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((Categories) => res.json(Categories))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  });
});

router.post("/", async (req, res) => {
  try {
    const Categories = await Category.create(req.body);
    res.status(200).json(Categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const Categories = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!Categories) {
      res.status(400).json;
      return;
    }
    res.status(200).json(Categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const Categories = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!Categories) {
      res.status(400).json;
      return;
    }
    res.status(200).json(Categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
