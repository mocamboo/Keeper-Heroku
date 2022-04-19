require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.PORT || 3001;
const URI = process.env.ATLAS_URI;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(URI, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB Database Connection establised successfully");
});

const notesRouter = require("./routes/note");
app.use(notesRouter);

if (process.end.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(port, () => {
	console.log(`Server is running on Port ${port}`);
});
