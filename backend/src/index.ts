import express from "express";
import dataSource from "./config/db";
import Ad from "./entities/Ad";
import Category from "./entities/Category";
const port = 3000;
const app = express();

app.use(express.json());

app.post("/ads", async (req, res) => {
  const ad = new Ad();
  ad.title = req.body.title;
  ad.description = req.body.description;
  ad.owner = req.body.owner;
  ad.price = req.body.price;
  ad.createdAt = req.body.createdAt;
  ad.picture = req.body.picture;
  ad.location = req.body.location;
  await ad.save();
  res.status(201).send("ad has been created");
});

app.get("/ads", async (_req, res) => {
  const allAds = await Ad.find();
  res.send(allAds);
});

app.delete("/ads/:id", async (req, res) => {
  try {
    await Ad.delete({ id: Number.parseInt(req.params.id) });
    res.send("Ad has been removed");
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

app.put("/ads/:id", async (req, res) => {
  await Ad.update({ id: Number.parseInt(req.params.id) }, req.body);
  res.send("Ad has been updated");
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await dataSource.initialize();
  const categories = await Category.find();
  if (categories.length === 0) {
    const misc = new Category();
    misc.title = "misc";
    misc.save();
  }
});
