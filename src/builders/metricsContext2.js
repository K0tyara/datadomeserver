import { webglMetrics } from "../fields/metrics/webgl.js";
import { renderingMetrics } from "../fields/metrics/rendering.js";
import { tcpMetrics } from "../fields/metrics/tcp.js";
import { trrd } from "../fields/trrd.js";

function weightedPick(items) {
    let total = 0;
    for (const it of items) total += it.w;
    let r = Math.random() * total;
    for (const it of items) { r -= it.w; if (r < 0) return it.v; }
    return items[items.length - 1].v;
}

// accept-language: "en-US;q=0.9,en;q=0.8,uk;q=0.7,..."
const ACCEPT_LANGUAGE = ["en-US", "en", "uk", "zh-TW", "zh-CN", "zh"];

// ============================================================
// ОКНО: пул самосогласованных конфигураций
//   Профиль 0 = эталон (2560×1440, maximized, DevTools docked right)
//   Профиль 1 = 2560×1440, maximized, без DevTools
//   ...
// ============================================================
const WINDOW_PROFILES = [
    { rs_w: 2560, rs_h: 1440, cg_w: 1604, cg_h: 237,
      br_ow: 2560, br_oh: 1400, pr: "1.100000023841858", w: 40 },
    { rs_w: 2560, rs_h: 1440, cg_w: 16,   cg_h: 151,
      br_ow: 2560, br_oh: 1400, pr: "1",                w: 20 },
    { rs_w: 1920, rs_h: 1080, cg_w: 1000, cg_h: 237,
      br_ow: 1920, br_oh: 1040, pr: "1",                w: 15 },
    { rs_w: 1920, rs_h: 1080, cg_w: 16,   cg_h: 151,
      br_ow: 1920, br_oh: 1040, pr: "1",                w: 15 },
    { rs_w: 1366, rs_h:  768, cg_w: 16,   cg_h: 151,
      br_ow: 1300, br_oh:  728, pr: "1",                w: 10 },
];

function pickWindow() {
    const total = WINDOW_PROFILES.reduce((a, p) => a + p.w, 0);
    let r = Math.random() * total, p = WINDOW_PROFILES[0];
    for (const cand of WINDOW_PROFILES) { r -= cand.w; if (r < 0) { p = cand; break; } }

    const TASKBAR = 40;
    const rs_cd  = 24;
    const ars_w  = p.rs_w;
    const ars_h  = p.rs_h - TASKBAR;
    const br_w   = p.br_ow - p.cg_w;
    const br_h   = p.br_oh - p.cg_h;
    const sg_w   = p.rs_w - p.br_ow;
    const sg_h   = p.rs_h - p.br_oh;
    const so     = p.rs_w >= p.rs_h ? "landscape-primary" : "portrait-primary";

    return {
        rs_w: p.rs_w, rs_h: p.rs_h, rs_cd,
        ars_w, ars_h,
        cg_w: p.cg_w, cg_h: p.cg_h,
        br_ow: p.br_ow, br_oh: p.br_oh,
        br_w, br_h, br_iw: br_w, br_ih: br_h,
        sg_w, sg_h,
        pr: p.pr,
        so,
    };
}

// ============================================================
// MAIN
// ============================================================
export const buildMetricsContext = (ipInfo, userAgent) => {

    // ========================================================
    // 1. КОНСТАНТЫ ИЗ ЗАГОЛОВКОВ
    // ========================================================
    const dvm    = 16;
    const hc     = 16;
    const pf     = "Win32";
    const nhiVal = '"x86,64,false,,Windows,14.0.0,158.0.8127.37,false"';

    const uaNormalized = String(userAgent).replace(
    /Chrome\/(\d+)\.\d+\.\d+\.\d+/,
    (_, major) => `Chrome/${major}.0.0.0`
);
    // ========================================================
    // 2. ЯЗЫКИ
    // ========================================================
    const lg = (ipInfo && ipInfo.lang) || ACCEPT_LANGUAGE[0] || "en-US";
    const lgsArr = (ipInfo && Array.isArray(ipInfo.languages) && ipInfo.languages.length)
        ? ipInfo.languages
        : [lg, ...ACCEPT_LANGUAGE.filter(x => x !== lg)];
    const lgsJSON = `"[${lgsArr.map(x => `\\"${x}\\"`).join(",")}]"`;

    // ========================================================
    // 3. ОКНО
    // ========================================================
    const W = pickWindow();

    // ========================================================
    // 4. УНИКАЛЬНЫЕ PER-SESSION
    // ========================================================
    const jsetVal = String(Math.floor(Date.now() / 1000));

    // ========================================================
    // 5. СБОРКА (порядок 1:1 с эталоном)
    // ========================================================
    const o = [];
    const put = (k, v) => { o.push([k, v]); };

    // --- 1..19 ---
    put('"r3n"', "33");
    put('"glvd"', webglMetrics.glvd);
    put('"glrd"', webglMetrics.glrd);
    put('"nddc"', "0");
    put('"exp8"', "0");
    put('"mcp"', "false");
    put('"bci"', "true");
    put('"bcl"', "1");
    put('"bct"', "0");
    put('"bdt"', "null");
    put('"spvl"', "1");
    put('"spvr"', "19");
    put('"spvlg"', "18");
    put('"spvd"', "2147483648");
    put('"dp0"', "false");
    put('"ccsT"', '"Error\nat rt (https://crowdcontrol.viagogo.com/d6631957--tags.js:2:132729)\nat H1.P (https://crowdcontrol.viagogo.com/d6631957--tags.js:2:94841)\nat http"');
    put('"ccsB"', '"631957--tags.js:2:94841)\nat https://crowdcontrol.viagogo.com/d6631957--tags.js:2:131544\nat https://crowdcontrol.viagogo.com/d6631957--tags.js:2:138965"');
    put('"ccsH"', "956708921");
    // put('"ccsV"', '",6bb61b98385c0b527f00cd01d107f7e73f087bc1852e5abfd4a51967c4ef3a87"');

    // --- 20..33 ---
    put('"wdifrm"', "false");
    put('"npmtm"', "false");
    put('"wdif"', "false");
    put('"cts"', "false");
    put('"hcovdr"', "false");
    put('"plovdr"', "false");
    put('"ftsovdr"', "false");
    put('"orf"', '""');
    put('"bfr"', "false");
    put('"hdn"', "false");
    put('"cssS"',   `"${renderingMetrics.cssS}"`);
    put('"css0"',   `"${renderingMetrics.css0}"`);
    put('"css1"',   `"${renderingMetrics.css1}"`);
    put('"cssH"',   `"${renderingMetrics.cssH}"`);

    // --- 34..49 ---
    put('"muev"', "false"); put('"pro_t"', "true"); put('"wglo"', "true");
    put('"prso"', "true");  put('"wbst"', "true");  put('"psn"', "true");
    put('"edp"', "true");   put('"addt"', "true");  put('"wsdc"', "true");
    put('"ccsr"', "true");  put('"nuad"', "true");  put('"bcda"', "false");
    put('"idn"', "true");   put('"capi"', "false"); put('"svde"', "false");
    put('"vpbq"', "true");

    // --- 50..64 ---
    put('"ckwa"', "true");
    put('"csssp"', '""');
    put('"spwn"', "false");
    put('"emt"', "false");
    put('"mq"', '"aptr:fine, ahvr:hover"');
    put('"mq2"', '"cg:srgb, dr:standard, dm:browser"');
    put('"mmt"', '"application/pdf,text/pdf"');
    put('"lg"', `"${lg}"`);
    put('"isb"', "false");
    put('"idp"', "true");
    put('"crt"', "50");
    put('"vnd"', webglMetrics.vnd);
    put('"bid"', '"NA"');
    put('"med"', '"defined"');
    put('"pltod"', "false");

    // --- 65..72 ---
    put('"shr"', "true");
    put('"plu"', '"PDF Viewer,Chrome PDF Viewer,Chromium PDF Viewer,Microsoft Edge PDF Viewer,WebKit built-in PDF"');
    put('"plgod"', "false");
    put('"plg"', "5");
    put('"plgne"', "true");
    put('"plgre"', "true");
    put('"plgof"', "false");
    put('"plggt"', "false");

    // --- 73..77 ---
    put('"tz"', "-120");
    put('"ihdn"', "false");
    put('"cdhf"', "false");
    put('"eva"', "40");
    put('"cokys"', '",loadTimes,csi,app"');

    // --- 78..81 ---
    put('"ecpc"', "false");
    put('"wop"', "false");
    put('"ftsa"', '"caption:Arial,icon:Arial,menu:\\"Segoe UI\\",message-box:Arial,small-caption:\\"Segoe UI\\",status-bar:\\"Segoe UI\\""');
    put('"dffls"', '"Inter"');

    // --- 82..90 ---
    put('"bchk"', '"3223aeb6721e0d0917e7928181193ac88dcd62fbd5cadfbe7a2b2b473ecf58ee70f018dbdb1a1832e8dc6528387b07459719bcd82384261e9a4e3f"');
    put('"trrd"', String(trrd));
    put('"wdifpnh"', '"2142410174"');
    put('"awe"', "false"); put('"phe"', "false"); put('"dat"', "false");
    put('"nm"', "false");  put('"geb"', "false"); put('"sqt"', "false");

    // --- 91..105: viewport / screen / DPR ---
    put('"br_w"',  String(W.br_w));
    put('"br_h"',  String(W.br_h));
    put('"br_iw"', String(W.br_iw));
    put('"br_ih"', String(W.br_ih));
    put('"ars_w"', String(W.ars_w));
    put('"ars_h"', String(W.ars_h));
    put('"rs_w"',  String(W.rs_w));
    put('"rs_h"',  String(W.rs_h));
    put('"rs_cd"', String(W.rs_cd));
    put('"cg_w"',  String(W.cg_w));
    put('"cg_h"',  String(W.cg_h));
    put('"sg_w"',  String(W.sg_w));
    put('"sg_h"',  String(W.sg_h));
    put('"pr"', W.pr);
    put('"so"', `"${W.so}"`);

    // --- 106..124: navigation timing ---
    put('"nt_tcp"',  String(tcpMetrics.nt_tcp));
    put('"nt_dns"',  "0");
    put('"nt_rd"',   "0");
    put('"nt_irt"',  String(tcpMetrics.nt_irt));
    put('"nt_rt"',   String(tcpMetrics.nt_rt));
    put('"nt_tls"',  String(tcpMetrics.nt_tls));
    put('"nt_ttf"',  String(tcpMetrics.nt_ttf));
    put('"nt_swt"',  String(tcpMetrics.nt_swt));
    put('"nt_csd"',  String(tcpMetrics.nt_csd));
    put('"nt_nhp"',  '"h2"');
    put('"nt_rdc"',  "0");
    put('"nt_it"',   '"navigation"');
    put('"nt_prs"',  String(tcpMetrics.nt_prs));
    put('"nt_esc"',  "0");
    put('"nt_ttrd"', "null");
    put('"nt_le"',   String(tcpMetrics.nt_le));
    put('"nt_dcle"', String(tcpMetrics.nt_dcle));
    put('"nt_di"',   String(tcpMetrics.nt_di));
    put('"nt_dc"',   String(tcpMetrics.nt_dc));

    // --- 125..128 ---
    put('"niet"', '"4g"');
    put('"nid"',  "10");
    put('"nisd"', "false");
    put('"ucdv"', "false");

    // --- 129..144: video codecs ---
    put('"vco"', '""');         put('"vcots"', "false");
    put('"vch"', '"probably"'); put('"vchts"', "true");
    put('"vcw"', '"probably"'); put('"vcwts"', "true");
    put('"vc3"', '"maybe"');    put('"vc3ts"', "false");
    put('"vcmp"', '""');        put('"vcmpts"', "false");
    put('"vc1"', '"probably"'); put('"vc1ts"', "true");
    put('"vcmk"', '"maybe"');   put('"vcmkuts"', "false");
    put('"vcq"', '""');         put('"vcqts"', "false");

    // --- 145..150 ---
    put('"exp3"', '"1,1,5"');
    put('"vh_txt"', '"0,102,204,255,255,255"');
    put('"pf"',     '"Win32"');
    put('"hc"',     String(hc));
    put('"br_oh"',  String(W.br_oh));
    put('"br_ow"',  String(W.br_ow));

    // --- 151..157 ---
    put('"ua"', `"${uaNormalized}"`);
    put('"wbd"',    "false");
    put('"ts_mtp"', "0");
    put('"mob"',    "false");
    put('"lgs"',    lgsJSON);
    put('"dvm"',    String(dvm));
    put('"nl_os"',  '"crlf"');

    // --- 158..180: audio codecs ---
    put('"aco"', '"probably"');   put('"acots"', "false");
    put('"acmp"', '"probably"');  put('"acmpts"', "true");
    put('"acmpu"', '"maybe"');    put('"acmputs"', "false");
    put('"acw"', '"probably"');   put('"acwts"', "false");
    put('"acma"', '"maybe"');     put('"acmats"', "false");
    put('"acaa"', '"probably"');  put('"acaats"', "true");
    put('"ac3"', '""');           put('"ac3ts"', "false");
    put('"acf"', '"probably"');   put('"acfts"', "false");
    put('"acmp4"', '"maybe"');    put('"acmp4ts"', "false");
    put('"acmp3"', '"probably"'); put('"acmp3ts"', "false");
    put('"acwm"', '"maybe"');     put('"acwmts"', "false");
    put('"ocpt"', "false");

    // --- 181..186 ---
    put('"nhi"',   nhiVal);
    put('"k_lyts"', "48");
    put('"k_lytk"', '"kg20va`l\\\\\'w8mh.71pdfoqcn[zy365x/\\\\,-4bt9siu=j;r]e"');
    put('"aitd"',  '"available"');
    put('"stqe"',  "10738184967");
    put('"stqu"',  "766727");

    // --- 187..195 ---
    put('"cpup"', "4");
    put('"isf"',  "false");
    put('"isf2"', "false");
    put('"pw"',   "false"); put('"pcb"', "false"); put('"arc"', "false");
    put('"fai"',  "false"); put('"gai"', "false"); put('"bbs3"', "false");

    // --- 196..198 ---
    put('"dt"',  "false");
    put('"dp1"', "true");
    put('"dpb"', "true");

    // --- 199..204 ---
    put('"fph"',  "748683156");
    put('"sgb"',  '"194793373"');
    put('"sgd"',  '"2022760486"');
    put('"sgc"',  '"3327307885"');
    put('"jset"', jsetVal);
    put('"bpc"',  "1");

    return o;
};