import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const articleDetailsPath = join(__dirname, "views/view.ejs");
const editPath = join(__dirname, "views/edit.ejs");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("home.ejs", {
      articleList: articleList,
    });
});

app.get("/post", (req,res) => {
    res.render("post.ejs");
});

app.get("/edit/:id", (req, res) => {
    const articleId = req.params.id;
    const articleDetails = articleList.find((x) => x.id === parseInt(articleId));
    res.render(editPath, {
      articleDetails: articleDetails,
    });
});

app.get("/view/:id", (req, res) => {
    const articleId = req.params.id;
    const articleDetails = articleList.find((x) => x.id === parseInt(articleId));
    res.render(articleDetailsPath, {
      articleDetails: articleDetails,
    });
});

app.post("/", (req,res) => {
    const articleTitle = req.body["title"];
    const articleContent = req.body["content"];
    articleList.push({
        id: generateID(),
        title: articleTitle,
        content: articleContent,
    });
    res.render("home.ejs", {
        articleList : articleList,
    });

});

app.post("/edit/:id", (req, res) => {
    const articleId = req.params.id;
    const articleIndex = articleList.findIndex((x) => x.id === parseInt(articleId));
    if (articleIndex === -1) {
      res.send("<h1> Something went wrong </h1>");
    }
    
    articleList[articleIndex].title = req.body.title;
    articleList[articleIndex].content = req.body.content;
  
    res.render("home.ejs", {
        articleList: articleList
    });
});

app.post("/delete/:id", (req, res) => {
    const articleId = req.params.id;
    articleList = articleList.filter((x) => x.id !== parseInt(articleId));
    res.send(
      '<script>alert("Blog deleted successfully"); window.location="/";</script>'
    );
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function generateID() {
    return Math.floor(Math.random() * 10000);
  }

var articleList = [];