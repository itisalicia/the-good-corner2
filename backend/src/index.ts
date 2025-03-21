import express from "express";
import dataSource from "./config/db";
import Ad from "./entities/Ad";
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
  await Ad.delete({ id: Number.parseInt(req.params.id) });
  res.send("Ad has been removed");
});

/*
app.get("/ads", (_req, res) => {
  db.all("SELECT * FROM AD", (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

app.post("/ads", (req, res) => {
  const stmt = db.prepare(
    `INSERT INTO AD (
      TITLE,
      DESCRIPTION,
      OWNER,
      PRICE,
      CREATEDAT,
      PICTURE,
      LOCATION
    ) VALUES(?,?,?,?,?,?,?)`
  );
  stmt.run(
    [
      req.body.title,
      req.body.description,
      req.body.owner,
      req.body.price,
      req.body.createdAt,
      req.body.picture,
      req.body.location,
    ],
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send("ad has been created");
      }
    }
  );
});

app.delete("/ads/:id", (req, res) => {
  const stmt = db.prepare("DELETE FROM AD WHERE ID=?");
  stmt.run([req.params.id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("ad has been deleted");
    }
  });
});

app.put("/ads/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  const stmt = db.prepare(`UPDATE AD SET
    TITLE=?,
    DESCRIPTION=?,
    OWNER=?,
    PRICE=?,
    CREATEDAT=?,
    PICTURE=?,
    LOCATION=?
    WHERE ID=?
  `);
  stmt.run([
    req.body.title,
    req.body.description,
    req.body.owner,
    req.body.price,
    req.body.createdAt,
    req.body.picture,
    req.body.location,
    req.params.id,
  ]);
  res.send("ok");
});
*/

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await dataSource.initialize();
});
