import axios from "axios";

const point = process.env.BYPASS_POINT ? process.env.BYPASS_POINT : (() => { throw new Error("BYPASS_POINT is not defined in environment variables"); })();

export const sendPayloadToDataDomeAsync = async (payload, userAgent, proxy) => {
    try {
        let data = {
            method: 'post',
            proxy: proxy,
            url: 'https://jstag.oneboxtds.com/js/',
            headers: {
                'sec-ch-ua-platform': '"Windows"',
                'User-Agent': userAgent,
                'sec-ch-ua': '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
                'Content-type': 'application/x-www-form-urlencoded',
                'sec-ch-ua-mobile': '?0',
                'Accept': '*/*',
                'Sec-Fetch-Site': 'cross-site',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'host': 'jstag.oneboxtds.com'
            },
            body: payload
        };

        const response = await axios.post(point, data );
        return response.data;
    } catch (error) {
        console.error("Error sending payload to DataDome:", error.message);
        return null;
    }
}