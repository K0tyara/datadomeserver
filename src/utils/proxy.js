export const parseProxy = (proxy) => {
    const url = new URL(proxy);

    return {
        protocol: url.protocol.replace(':', ''),
        host: url.hostname,
        port: Number(url.port),
        auth: url.username
            ? {
                username: url.username,
                password: url.password
            }
            : undefined
    };
};
