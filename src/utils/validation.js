export const validateRequiredParams = (params, requiredFields) => {
    const missing = requiredFields.filter(field => !params[field]);
    if (missing.length) {
        throw new Error(`Missing required parameter(s): ${missing.join(", ")}`);
    }
};
export const validateProxyFormat = (proxy) => {
    const proxyRegex = /^(http|https):\/\/(\d{1,3}\.){3}\d{1,3}:\d{1,5}$/;
    if (!proxyRegex.test(proxy)) {
        throw new Error("Invalid proxy format. Example: http://123.45.67.89:8080");
    }
};