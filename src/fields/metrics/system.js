// pf — выбираем из типичных платформ
// const platforms = ["Win32", "MacIntel", "Linux x86_64", "iPhone", "Android"];
// const pf = platforms[Math.floor(Math.random() * platforms.length)];
const pf = "\"Win32\"";
// hc — количество логических процессоров (обычно 2–16)
let hc;
if (pf.startsWith("Win") || pf.startsWith("Mac") || pf.startsWith("Linux")) {
    hc = Math.floor(Math.random() * 15) + 2; // 2–16
} else {
    hc = Math.floor(Math.random() * 6) + 2; // для мобильных 2–8
}

let dvm;
if (pf.startsWith("Win") || pf.startsWith("Mac") || pf.startsWith("Linux")) {
    dvm = [4, 8, 16][Math.floor(Math.random() * 3)]; // 4, 8 или 16 GB
} else {
    dvm = [1, 2, 3, 4, 8][Math.floor(Math.random() * 4)]; // мобильные 1–4 GB
}

const systemMetrics = { pf, hc, dvm };

export { systemMetrics };