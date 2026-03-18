import { buildIpContextAsync } from "../builders/ipContext.js";
import { buildMetricsContext } from "../builders/metricsContext.js";
import { buildPayloadContext } from "../builders/payloadContext.js";
import { sendPayloadToDataDomeAsync } from "./dataDomeService.js";

export async function bypassAsync({ ua, targetUrl, hash, proxy }) {

    const ipInfo = await buildIpContextAsync(proxy);

    const fingerprint = buildMetricsContext(ipInfo, ua);

    const payload = buildPayloadContext(fingerprint, targetUrl, hash);

    return await sendPayloadToDataDomeAsync(payload, ua, proxy);
}
