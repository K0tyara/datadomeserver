import { buildIpContextAsync } from "../builders/ipContext.js";
import { buildMetricsContext } from "../builders/metricsContext2.js";
import { buildPayloadContext } from "../builders/payloadContext.js";
import { sendPayloadToDataDomeAsync } from "./dataDomeService.js";
import { sendPayloadToViagogoAsync } from "./viagogoService.js";
import { parseDatadomeCookie ,parseSetCookieString} from "./parseAnswer.js";

export async function bypassAsync({ ua, targetUrl, hash, proxy }) {

    const ipInfo = await buildIpContextAsync(proxy);

    const fingerprint = buildMetricsContext(ipInfo, ua);

    const payload1 = buildPayloadContext(fingerprint, targetUrl, hash);
    const response1 = await sendPayloadToDataDomeAsync(payload1, ua, proxy);


    // const payload2 = buildPayloadContext(fingerprint, targetUrl, hash, cid.value);
    // const response2 = await sendPayloadToDataDomeAsync(payload2, ua, proxy);

    return response1;
}
