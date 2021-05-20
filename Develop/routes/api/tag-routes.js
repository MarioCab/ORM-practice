const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  try {
    const Tags = await Tag.findAll();
    res.status(200).json(Tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const Tags = await Tag.findbyPk(req.params.id);
    if (!Tags) {
      res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json(Tags);
  } catch (err) {
    res.status(500).json(err);
  }
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
    const Tags = await Tag.update(req.body);
    res.status(200).json(Tags);
  } catch (err) {
    res.status(400).json(err);
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
