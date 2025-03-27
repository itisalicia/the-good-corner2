import express from "express";
import cors from "cors";
import dataSource from "./config/db";
import Ad from "./entities/Ad";
import Category from "./entities/Category";
import Tag from "./entities/Tag";
import type { FindManyOptions } from "typeorm";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

// ROUTES POST

app.post("/ads", async (req, res) => {
	const ad = new Ad();
	ad.title = req.body.title;
	ad.description = req.body.description;
	ad.owner = req.body.owner;
	ad.price = req.body.price;
	ad.picture = req.body.picture;
	ad.location = req.body.location;
	ad.category = req.body.category;
	ad.tags = req.body.tags.map((tag: string) => ({ id: Number.parseInt(tag) }));
	try {
		await ad.save();
		res.status(201).send("ad has been created");
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

app.post("/categories", async (req, res) => {
	const newCategory = new Category();
	newCategory.title = req.body.title;
	try {
		await newCategory.save();
		res.status(201).send("Category has been created");
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

app.post("/tags", async (req, res) => {
	const newTag = new Tag();
	newTag.title = req.body.title;
	await newTag.save();
	res.status(201).send("Tag has been created");
});

// ROUTES GET

app.get("/ads", async (req, res) => {
	console.log(req.query);
	let findOptions: FindManyOptions<Ad> = {
		relations: { category: true, tags: true },
	};
	if (req.query.category !== undefined) {
		findOptions = {
			...findOptions,
			where: {
				category: { id: Number.parseInt(req.query.category as string) },
			},
		};
	}
	const allAds = await Ad.find(findOptions);
	res.send(allAds);
});

app.get("/ads/:id", async (req, res) => {
	const result = await Ad.findOneByOrFail({
		id: Number.parseInt(req.params.id),
	});
	res.send(result);
});

app.get("/categories", async (_req, res) => {
	const categories = await Category.find();
	res.send(categories);
});

app.get("/tags", async (_req, res) => {
	const tags = await Tag.find();
	res.send(tags);
});

// ROUTES DELETE

app.delete("/ads/:id", async (req, res) => {
	try {
		await Ad.delete({ id: Number.parseInt(req.params.id) });
		res.send("Ad has been removed");
	} catch (err) {
		console.log("err", err);
		res.status(500).send(err);
	}
});

// ROUTES PUT

app.put("/ads/:id", async (req, res) => {
	await Ad.update({ id: Number.parseInt(req.params.id) }, req.body);
	res.send("Ad has been updated");
});

app.put("/categories/:id", async (req, res) => {
	await Category.update({ id: Number.parseInt(req.params.id) }, req.body);
	res.send("Category updated !");
});

app.put("/tags/:id", async (req, res) => {
	await Tag.update({ id: Number.parseInt(req.params.id) }, req.body);
	res.send("Tag has been updated");
});

// ------------------------------------------- //

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
