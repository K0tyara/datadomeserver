import axios from "axios";

const point = process.env.BYPASS_POINT ? process.env.BYPASS_POINT : (() => { throw new Error("BYPASS_POINT is not defined in environment variables"); })();

export const sendPayloadToViagogoAsync = async (proxy) => {
    try {
        let data = {
            method: 'post',
            proxy: proxy,
            url: 'https://www.viagogo.com/Concert-Tickets/Rock-and-Pop/Oasis-Tickets/E-162174024?quantity=2&page=2',
            body: {
                "ShowAllTickets": true,
                "HideDuplicateTicketsV2": false,
                "Quantity": 2,
                "IsInitialQuantityChange": false,
                "PageVisitId": "ECF43B5D-9DAE-4EC8-AFB5-D4604EDCB674",
                "PageSize": 10,
                "CurrentPage": 2,
                "SortBy": "RECOMMENDED",
                "SortDirection": 1,
                "Sections": "",
                "Rows": "",
                "Seats": "",
                "SeatTypes": "",
                "TicketClasses": "",
                "ListingNotes": "",
                "PriceRange": "0,100",
                "InstantDelivery": false,
                "EstimatedFees": false,
                "BetterValueTickets": true,
                "PriceOption": "",
                "HasFlexiblePricing": false,
                "ExcludeSoldListings": false,
                "RemoveObstructedView": false,
                "PriceDropListingsOnly": false,
                "Favorites": false,
                "FilterSortSessionId": "74DC7FC7-F6A0-4A76-AB99-2C6D9373724F",
                "Method": "IndexShGridOnly",
                "CategoryId": 11655,
                "IsDirectFromPaidSearch": false
            },
            headers: {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br, zstd",
                "accept-language": "en-US;q=0.9,en;q=0.8,uk;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "origin": "https://www.viagogo.com",
                "pragma": "no-cache",
                "priority": "u=1, i",
                "referer": "https://www.viagogo.com/Concert-Tickets/Rock-and-Pop/Oasis-Tickets/E-162174024",
                "sec-ch-device-memory": "16",
                "sec-ch-ua": "\"Not-A.Brand\";v=\"99\", \"Google Chrome\";v=\"157\", \"Chromium\";v=\"157\"",
                "sec-ch-ua-arch": "\"x86\"",
                "sec-ch-ua-full-version-list": "\"Not-A.Brand\";v=\"99.0.0.0\", \"Google Chrome\";v=\"157.0.8103.51\", \"Chromium\";v=\"157.0.8103.51\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-model": "\"\"",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-ch-ua-platform-version": "\"14.0.0\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36",
                "connection": "keep-alive"
            },
        };

        const response = await axios.post(point, data);
        return response.data;
    } catch (error) {
        console.error("Error sending payload to Viagogo:", error.message);
        return null;
    }
}