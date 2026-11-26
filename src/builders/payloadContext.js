
export const buildPayloadContext = (fingerprint, targetUrl, hash, cid = '.keep') => {

    const e = 9959949970;
    let ddjsKey = hash;
    let Un_t = 741130091;
    let t = !1;
    const c = function (n) {
        return (n = (n ^= n << 13) ^ n >> 17) ^ n << 5;
    };
    //для першого генератора 
    const _o = function () {
        let O_t = 0;
        for (var d = 0; d < ddjsKey.length; d++) {
            O_t = (O_t << 5) - O_t + ddjsKey.charCodeAt(d) | 0
        }

        const o = e ^ O_t ^ Un_t;
        return o;
    }

    // для другого генератора разом з cid
    const _w = function (val) {
        let O_t = 0;
        for (var d = 0; d < val.length; d++) {
            O_t = (O_t << 5) - O_t + val.charCodeAt(d) | 0
        }

        return O_t;
    }
    const generator = function (n, e) {
        var o = n,
            i = -1,
            r = e,
            a = Un_t;
        t = !1;
        var s = null;
        return function (n) {
            var e;
            return null !== s ? (e = s, s = null) : (2 < ++i && (o = c(o), i = 0), e = 255 & ((e = o >> 16 - 8 * i) ^ (a ? --r : 0)), n && (s = e)), e;
        };
    };

    function dWrite(n) {
        for (var e = [], t = 0, o = 0; o < n.length; o++) {
            var i = n.charCodeAt(o);
            i < 128 ? e[t++] = i : (i < 2048 ? e[t++] = i >> 6 | 192 : (55296 == (64512 & i) && o + 1 < n.length && 56320 == (64512 & n.charCodeAt(o + 1)) ? (i = 65536 + ((1023 & i) << 10) + (1023 & n.charCodeAt(++o)), e[t++] = i >> 18 | 240, e[t++] = i >> 12 & 63 | 128) : e[t++] = i >> 12 | 224, e[t++] = i >> 6 & 63 | 128), e[t++] = 63 & i | 128);
        }

        for (var c = 0; c < e.length; c++) e[c] ^= primaryGenerator();

        return e;
    }



    // console.log("ARG_FOR_SECOND_GENERATOR: " + ARG_FOR_SECOND_GENERATOR)
    // console.log("ARG_FOR_PRIMARY_GENERATOR: " + ARG_FOR_PRIMARY_GENERATOR)

    // для першого генератора ключ це токен каптчи через кодування, функція _o
    // const ARG_FOR_PRIMARY_GENERATOR = -1228499404
    const ARG_FOR_PRIMARY_GENERATOR = _o();

    // для другого генератора ключ це cid якщо куків немає то це .keep якщо є то вони 
    //1809053797 ^ w(n) - n = cid, 1809053797 ^ cid = 1768529110
    // const ARG_FOR_SECOND_GENERATOR = 1768529110;

    const ARG_FOR_SECOND_GENERATOR = 1809053797 ^ _w(cid);


    // const timestamp = -945233954;
    const timestamp = c(c(Date.now() >> 3 ^ 11027890091) * e);
    console.log("timestamp: " + timestamp)
    const primaryGenerator = generator(ARG_FOR_PRIMARY_GENERATOR, timestamp);

    const s = [];


    for (const [key, value] of fingerprint) {
        s.push(primaryGenerator() ^ (s.length ? 44 : 123));
        Array.prototype.push.apply(s, dWrite(key));
        s.push(58 ^ primaryGenerator());
        Array.prototype.push.apply(s, dWrite(value));
    }

    Un_t = false;

    const secondGenerator = generator(ARG_FOR_SECOND_GENERATOR, timestamp);
    const data = [];

    for (let c = 0; c < s.length; c++) {
        data.push(s[c] ^ secondGenerator());
    }

    data.push(125 ^ primaryGenerator(!0) ^ secondGenerator());

    const temp = data;
    const h = [];
    let p = timestamp;
    const i = function (n) {
        return 37 < n ? 59 + n : 11 < n ? 53 + n : 1 < n ? 46 + n : 50 * n + 45;
    }

    for (let index = 0; index < temp.length;) {
        var v = (255 & --p ^ temp[index++]) << 16 | (255 & --p ^ temp[index++]) << 8 | 255 & --p ^ temp[index++];
        h.push(String.fromCharCode(i(v >> 18 & 63)), String.fromCharCode(i(v >> 12 & 63)), String.fromCharCode(i(v >> 6 & 63)), String.fromCharCode(i(63 & v)));
    }

    let n = temp.length % 3;
    if (n) h.length -= (3 - n);
    const finalPayload = h.join("");
    const eventCounters = cid === '.keep' ? '[]' : '{"mousemove":29,"pointermove":29,"click":0,"scroll":0,"touchstart":0,"touchend":0,"touchcancel":0,"touchmove":0,"keydown":0,"keyup":0,"paste":0,"input":0,"change":0}';
    const jsType =  cid === '.keep' ? 'ch' : 'le'
    const payload = "jspl=" + encodeURIComponent(finalPayload)
        + '&eventCounters=' + eventCounters
        + "&jsType=" + jsType
        + `&cid=${cid}`
        + "&ddk=" + escape(encodeURIComponent(ddjsKey))
        + "&Referer=" + escape(encodeURIComponent(targetUrl))
        + "&request=" + escape(encodeURIComponent((new URL(targetUrl).pathname + new URL(targetUrl).search + new URL(targetUrl).hash).slice(0, 1024)))
        + "&responsePage=" + escape(encodeURIComponent('origin'))
        + "&ddv=" + '5.12.0'

    console.log(payload);
    return payload;
}