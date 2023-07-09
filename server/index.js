import express from "express";

import { createPost, readAllPost } from "./services/post/read.js";

const app = express();
const port = 3010;

app.listen(port, () => console.log(`Example app listening on port ${port}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.post("/api/post/create", async (req, res) => {
  res.json(await createPost(req.body));
});

app.get("/api/post", async (req, res) => {
  res.json(await readAllPost());
});
