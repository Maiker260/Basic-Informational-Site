import express from "express";
import { readFile } from "node:fs"
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
    const filename = path.join(__dirname, "index.html");

    readFile(filename, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error loading index page.");
        }

        res.type("html");
        return res.status(200).send(data);
    });
});

app.get("/:page", (req, res) => {
    const page = req.params.page;
    const filename = path.join(__dirname, `${page}.html`);

    readFile(filename, (err, data) => {
        if (err) {
            console.log(`${filename} not Found`);

            readFile("404.html", (err404, data404) => {
                if (err404) {
                    console.log("404 Not Found");
                }

                res.type("html");
                return res.status(404).send(data404);
            });

            return;
        }

        res.type("html");
        res.status(200).send(data);

    });
});

app.listen(3000, () => {
    console.log("Listening on Port 3000.")
})