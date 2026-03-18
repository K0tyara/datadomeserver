import { getIpInfoAsync } from "../services/ipService.js";
import { getTzOffset } from "../utils/timezone.js";

export const buildIpContextAsync = async (proxy) => {
    const ipData = await getIpInfoAsync(proxy);
    if (!ipData) return null;

    const timezone = ipData.timezone;
    const country = ipData.countryCode;

    return {
        ip: ipData.query,
        timezone,
        country,
        tz: parseInt(getTzOffset(timezone)),
        lang: "en" 
    };
};