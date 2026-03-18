function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const RESOLUTIONS = [
    { w: 1366, h: 768, type: "laptop" },
    { w: 1536, h: 864, type: "laptop" },
    { w: 1600, h: 900, type: "laptop" },
    { w: 1920, h: 1080, type: "desktop" },
    { w: 1920, h: 1200, type: "desktop" },
    { w: 2048, h: 1152, type: "desktop" },
    { w: 2560, h: 1440, type: "desktop" },
    { w: 2560, h: 1600, type: "laptop" },
    { w: 2880, h: 1800, type: "laptop" },
    { w: 3072, h: 1920, type: "laptop" },
    { w: 3440, h: 1440, type: "ultrawide" },
    { w: 3840, h: 2160, type: "desktop" }
];

// scaling (влияет на devicePixelRatio)
const SCALE_PRESETS = [
    { scale: 1, dpr: 1 },
    { scale: 1.25, dpr: 1.25 },
    { scale: 1.5, dpr: 1.5 },
    { scale: 2, dpr: 2 }
];

const res = pick(RESOLUTIONS);
const scale = pick(SCALE_PRESETS);

const rs_w = res.w;
const rs_h = res.h;

// taskbar (обычно 40-80px)
const taskbar = randomInt(40, 80);

const ars_w = rs_w;
const ars_h = rs_h - taskbar;

// браузерные рамки
const chromeWidthLoss = randomInt(0, 16);
const chromeHeightLoss = randomInt(80, 140);

// viewport (то что реально видит сайт)
let br_w = rs_w - chromeWidthLoss;
let br_h = ars_h - chromeHeightLoss;

br_w = Math.floor(br_w / 8) * 8;
br_h = Math.floor(br_h / 8) * 8;

const br_iw = br_w;
const br_ih = br_h;

const screenMetrics = {
    br_w,
    br_h,
    br_iw,
    br_ih,
    ars_w,
    ars_h,
    rs_w,
    rs_h,
    rs_cd: 24 + (Math.random() > 0.3 ? 8 : 0), // 24 или 32
    pr: scale.dpr
};
export { screenMetrics };