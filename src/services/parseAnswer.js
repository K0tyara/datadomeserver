/**
 * Парсит DataDome cookie из ответа API (crowdcontrol.viagogo.com/d6631957--js/)
 * 
 * Входная структура ответа:
 * {
 *   body: "{\"status\":200,\"cookie\":\"datadome=...; Max-Age=...; ...\"}",
 *   status_code: 200,
 *   headers: { ... },
 *   ...
 * }
 * 
 * Возвращает:
 * {
 *   name: 'datadome',
 *   value: 'p_aLpA8...',
 *   maxAge: 31536000,
 *   domain: '.viagogo.com',
 *   path: '/',
 *   secure: true,
 *   sameSite: 'Lax',
 *   httpOnly: false,
 *   raw: 'datadome=...; Max-Age=...; ...',
 *   cookieHeader: 'datadome=p_aLpA8...'  // для использования в запросах
 * }
 */

export function parseDatadomeCookie(response) {
    if (!response) {
        throw new Error('[parseDatadomeCookie] response is null/undefined');
    }

    const statusCode = response.status_code ?? response.status;
    if (statusCode !== 200) {
        throw new Error(`[parseDatadomeCookie] non-200 status: ${statusCode}`);
    }

    // body может быть: string (JSON-строка), object (уже распарсенный), либо Buffer
    let body = response.body;
    if (Buffer.isBuffer(body)) {
        body = body.toString('utf8');
    }
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch (e) {
            throw new Error(`[parseDatadomeCookie] body is not valid JSON: ${e.message}`);
        }
    }
    if (!body || typeof body !== 'object') {
        throw new Error('[parseDatadomeCookie] body is not an object');
    }

    const cookieStr = body.cookie;
    if (typeof cookieStr !== 'string' || !cookieStr.trim()) {
        throw new Error('[parseDatadomeCookie] body.cookie is missing or empty');
    }

    return parseSetCookieString(cookieStr);
}

/**
 * Разбирает строку Set-Cookie в структуру.
 */
export function parseSetCookieString(setCookieStr) {
    const parts = setCookieStr.split(';').map(s => s.trim()).filter(Boolean);
    if (!parts.length) {
        throw new Error('[parseSetCookieString] empty cookie string');
    }

    // Первая часть: name=value
    const firstEq = parts[0].indexOf('=');
    if (firstEq <= 0) {
        throw new Error(`[parseSetCookieString] invalid name=value: ${parts[0]}`);
    }
    const name = parts[0].slice(0, firstEq).trim();
    const value = parts[0].slice(firstEq + 1).trim();

    const result = {
        name,
        value,
        maxAge: null,
        domain: null,
        path: null,
        secure: false,
        httpOnly: false,
        sameSite: null,
        expires: null,
        raw: setCookieStr,
        cookieHeader: `${name}=${value}`,
    };

    for (let i = 1; i < parts.length; i++) {
        const part = parts[i];
        const eq = part.indexOf('=');
        if (eq === -1) {
            // флаг без значения: Secure, HttpOnly
            const flag = part.toLowerCase();
            if (flag === 'secure') result.secure = true;
            else if (flag === 'httponly') result.httpOnly = true;
            continue;
        }
        const key = part.slice(0, eq).trim().toLowerCase();
        const val = part.slice(eq + 1).trim();
        switch (key) {
            case 'max-age':
                result.maxAge = parseInt(val, 10);
                break;
            case 'domain':
                result.domain = val;
                break;
            case 'path':
                result.path = val;
                break;
            case 'samesite':
                result.sameSite = val;
                break;
            case 'expires':
                result.expires = val;
                break;
            case 'secure':
                result.secure = true;
                break;
            case 'httponly':
                result.httpOnly = true;
                break;
        }
    }

    return result;
}