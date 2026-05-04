const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.IBM_API_KEY;
const URL = process.env.IBM_URL;

app.post("/synthesize", async (req, res) => {
    const text = req.body.text;

    try {
        const response = await axios.post(
            `${URL}/v1/synthesize?voice=en-US_AllisonV3Voice`,
            {
                text: text
            },
            {
                responseType: "arraybuffer",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "audio/mp3",
                    "Authorization":
                        "Basic " +
                        Buffer.from("apikey:" + API_KEY).toString("base64")
                }
            }
        );

        res.set("Content-Type", "audio/mp3");
        res.send(response.data);

    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.listen(3000, () => console.log("Server running"));