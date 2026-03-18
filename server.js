// server.js
import "./bootstrap.js";
import express from "express";
import { bypassAsync } from "./src/services/bypassService.js";
import { validateRequiredParams, validateProxyFormat } from "./src/utils/validation.js";


const app = express();
app.use(express.json());

app.post("/bypass", async (req, res) => {
    try {
        console.log("Received bypass request with body:");
        const { ua, targetUrl, hash, proxy } = req.body;

        validateRequiredParams(req.body, ["ua", "targetUrl", "hash", "proxy"]);
        // validateProxyFormat(proxy);
        const response = await bypassAsync({ ua, targetUrl, hash, proxy });


        res.json({
            success: true,
            data: JSON.parse(response.body)
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});