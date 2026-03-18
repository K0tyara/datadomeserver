import { DateTime } from "luxon";

const getTzOffset = (timezone) => {
    const dt = DateTime.now().setZone(timezone);
    return -dt.offset; //(-120 для Киева)
};

export { getTzOffset };