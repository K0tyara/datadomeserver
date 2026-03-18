import axios from "axios";
import { parseProxy } from "../utils/proxy.js";

export const getIpInfoAsync = async (proxy) => {
    try {
        const config = { timeout: 10000 };

        if (proxy) {
            const parsed = parseProxy(proxy);

            config.proxy = {
                host: parsed.host,
                port: parsed.port,
                protocol: parsed.protocol,
                auth: parsed.auth
            };
        }

        const response = await axios.get("http://ip-api.com/json/", config);
        return response.data;

    } catch (error) {
        return null;
    }
};