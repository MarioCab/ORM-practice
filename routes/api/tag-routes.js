const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
router.get("/", async (req, res) => {
  Tag.findAll({
    include: [Product],
  })
    .then((Tags) => res.status(200).json(Tags))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  });
});
router.post("/", async (req, res) => {
  try {
    const Tags = await Tag.create(req.body);
    res.status(200).json(Tags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const Tags = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (!Tags) {
      res.status(400).json;
      return;
    }
    res.status(200).json(Tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const Tags = await Tag.delete({
      where: { id: req.params.id },
    });
    if (!Tags) {
      res.status(400).json;
      return;
    }
    res.status(200).json(Tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
