const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let posts = [
    { id: uuidv4(), username: "Anil Yadav", content: "I love coding" },
    { id: uuidv4(), username: "Rohit Habibkar", content: "Hard work is important to achieve success" },
    { id: uuidv4(), username: "Jatin", content: "I got selected for my 1st internship" }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((post) => id === post.id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((post) => id === post.id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    console.log("Editing Post ID:", id);  // Debugging log
    let post = posts.find((post) => id === post.id);
    if (!post) {
        console.log("Post not found for editing:", id);
        return res.status(404).send('Post not found');
    }
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((post) => id !== post.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
