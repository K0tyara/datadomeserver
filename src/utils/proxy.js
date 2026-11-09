export const parseProxy = (proxy) => {
    const withScheme = /^[a-z]+:\/\//i.test(proxy) ? proxy : `http://${proxy}`;
    const u = new URL(withScheme);

    return {
        protocol: u.protocol.replace(":", ""),
        host: u.hostname,
        port: Number(u.port) || 80,
        auth: u.username
            ? {
                  username: decodeURIComponent(u.username),
                  password: decodeURIComponent(u.password),
              }
            : undefined,
    };
};