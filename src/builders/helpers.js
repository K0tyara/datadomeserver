export function weightedPick(items) {
    let total = 0;
    for (const it of items) total += it.w;
    let r = Math.random() * total;
    for (const it of items) { r -= it.w; if (r < 0) return it.v; }
    return items[items.length - 1].v;
}

export const ACCEPT_LANGUAGE = ["en-US", "en", "uk", "zh-TW", "zh-CN", "zh"];

// Профили 0 и 1 — два эталона (cg_w=1604 для File 1, cg_w=1479 для File 2).
export const WINDOW_PROFILES = [
    { rs_w: 2560, rs_h: 1440, cg_w: 1604, cg_h: 237, br_ow: 2560, br_oh: 1400, pr: "1.100000023841858", w: 25 },
    { rs_w: 2560, rs_h: 1440, cg_w: 1479, cg_h: 237, br_ow: 2560, br_oh: 1400, pr: "1.100000023841858", w: 25 },
    { rs_w: 2560, rs_h: 1440, cg_w: 16,   cg_h: 151, br_ow: 2560, br_oh: 1400, pr: "1",                w: 15 },
    { rs_w: 1920, rs_h: 1080, cg_w: 16,   cg_h: 151, br_ow: 1920, br_oh: 1040, pr: "1",                w: 20 },
    { rs_w: 1366, rs_h:  768, cg_w: 16,   cg_h: 151, br_ow: 1300, br_oh:  728, pr: "1",                w: 15 },
];

export function pickWindow() {
    const total = WINDOW_PROFILES.reduce((a, p) => a + p.w, 0);
    let r = Math.random() * total, p = WINDOW_PROFILES[0];
    for (const c of WINDOW_PROFILES) { r -= c.w; if (r < 0) { p = c; break; } }
    const TASKBAR = 40, rs_cd = 24;
    return {
        rs_w: p.rs_w, rs_h: p.rs_h, rs_cd,
        ars_w: p.rs_w, ars_h: p.rs_h - TASKBAR,
        cg_w: p.cg_w, cg_h: p.cg_h,
        br_ow: p.br_ow, br_oh: p.br_oh,
        br_w: p.br_ow - p.cg_w, br_h: p.br_oh - p.cg_h,
        br_iw: p.br_ow - p.cg_w, br_ih: p.br_oh - p.cg_h,
        sg_w: p.rs_w - p.br_ow, sg_h: p.rs_h - p.br_oh,
        pr: p.pr,
        so: p.rs_w >= p.rs_h ? "landscape-primary" : "portrait-primary",
    };
}

export function pickLanguages(ipInfo) {
    const lg = (ipInfo && ipInfo.lang) || ACCEPT_LANGUAGE[0] || "en-US";
    const lgsArr = (ipInfo && Array.isArray(ipInfo.languages) && ipInfo.languages.length)
        ? ipInfo.languages
        : [lg, ...ACCEPT_LANGUAGE.filter(x => x !== lg)];
    const lgsJSON = `"[${lgsArr.map(x => `\\"${x}\\"`).join(",")}]"`;
    return { lg, lgsJSON };
}