import { webglMetrics }     from "../fields/metrics/webgl.js";
import { renderingMetrics } from "../fields/metrics/rendering.js";
import { tcpMetrics }       from "../fields/metrics/tcp.js";
import { trrd }             from "../fields/trrd.js";
import { pickWindow, pickLanguages } from "./helpers.js";

export const buildMetricsContextJson = (ipInfo, userAgent) => {
    const dvm = 16, hc = 16;
    const nhiVal = '"x86,64,false,,Windows,14.0.0,157.0.8103.79,false"';
    const { lg, lgsJSON } = pickLanguages(ipInfo);
    const W = pickWindow();
    const jsetVal = String(Math.floor(Date.now() / 1000));
    const uishVal = String(Math.floor(1e9 + Math.random() * 9e9));

    const o = [];
    const put = (k, v) => o.push([k, v]);

    // --- 1..14 ---
    put('"nddc"', "0");
    put('"r3n"',  "33");
    put('"exp8"', "0");
    put('"mcp"',  "false");
    put('"spvl"', "0");                 // ← дубль 1
    put('"spvr"', "0");
    put('"spvlg"', "0");
    put('"spvd"', "0");
    put('"dp0"',  "false");
    put('"ccsT"', '"Error\\nat E1 (https://crowdcontrol.viagogo.com/d6631957--tags.js:2:130795)\\nat y1._ (https://crowdcontrol.viagogo.com/d6631957--tags.js:2:86102)\\nat http"');
    put('"ccsB"', '"631957--tags.js:2:86102)\\nat https://crowdcontrol.viagogo.com/d6631957--tags.js:2:129767\\nat https://crowdcontrol.viagogo.com/d6631957--tags.js:2:136402"');
    put('"ccsH"', "3525713459");

    // --- 15..28 ---
    put('"wdifrm"', "false"); put('"npmtm"', "false"); put('"wdif"', "false");
    put('"cts"', "false");    put('"hcovdr"', "false"); put('"plovdr"', "false");
    put('"ftsovdr"', "false"); put('"orf"', '""'); put('"bfr"', "false");
    put('"hdn"', "false");
    put('"cssS"', `"${renderingMetrics.cssS}"`);
    put('"css0"', `"${renderingMetrics.css0}"`);
    put('"css1"', `"${renderingMetrics.css1}"`);
    put('"cssH"', `"${renderingMetrics.cssH}"`);

    // --- 29..44 ---
    put('"muev"', "false"); put('"pro_t"', "true"); put('"wglo"', "true");
    put('"prso"', "true");  put('"wbst"', "true");  put('"psn"', "true");
    put('"edp"', "true");   put('"addt"', "true");  put('"wsdc"', "true");
    put('"ccsr"', "true");  put('"nuad"', "true");  put('"bcda"', "false");
    put('"idn"', "true");   put('"capi"', "false"); put('"svde"', "false");
    put('"vpbq"', "true");

    // --- 45..59 ---
    put('"ckwa"', "true");  put('"csssp"', '""'); put('"spwn"', "false");
    put('"emt"', "false");
    put('"mq"',  '"aptr:fine, ahvr:hover"');
    put('"mq2"', '"cg:srgb, dr:standard, dm:browser"');
    put('"mmt"', '"application/pdf,text/pdf"');
    put('"lg"', `"${lg}"`);
    put('"isb"', "false"); put('"idp"', "true"); put('"crt"', "50");
    put('"vnd"', webglMetrics.vnd);
    put('"bid"', '"NA"'); put('"med"', '"defined"'); put('"pltod"', "false");

    // --- 60..67 ---
    put('"shr"', "true");
    put('"plu"', '"PDF Viewer,Chrome PDF Viewer,Chromium PDF Viewer,Microsoft Edge PDF Viewer,WebKit built-in PDF"');
    put('"plgod"', "false"); put('"plg"', "5"); put('"plgne"', "true");
    put('"plgre"', "true");  put('"plgof"', "false"); put('"plggt"', "false");

    // --- 68..72 (обрати внимание: cdhf=true) ---
    put('"tz"', "-120");   put('"ihdn"', "false"); put('"cdhf"', "true");
    put('"eva"', "40");    put('"cokys"', '",loadTimes,csi,app"');

    // --- 73..76 ---
    put('"ecpc"', "false"); put('"wop"', "false");
    put('"ftsa"', '"caption:Arial,icon:Arial,menu:\\"Segoe UI\\",message-box:Arial,small-caption:\\"Segoe UI\\",status-bar:\\"Segoe UI\\""');
    put('"dffls"', '"Inter"');

    // --- 77..85 ---
    put('"bchk"', '"3223aeb6721e0d0917e7928181193ac88dcd62fbd5cadfbe7a2b2b473ecf58ee70f018dbdb1a1832e8dc6528387b07459719bcd82384261e9a4e3f"');
    put('"trrd"', String(trrd));
    put('"wdifpnh"', '"2142410174"');
    put('"awe"', "false"); put('"phe"', "false"); put('"dat"', "false");
    put('"nm"', "false");  put('"geb"', "false"); put('"sqt"', "false");

    // --- viewport ---
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

    // --- navigation timing (nt_le/nt_dcle/nt_dc = 0, как в File 2) ---
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
    put('"nt_le"',   "0");
    put('"nt_dcle"', "0");
    put('"nt_di"',   String(tcpMetrics.nt_di));
    put('"nt_dc"',   "0");

    put('"niet"', '"4g"'); put('"nid"', "10");
    put('"nisd"', "false"); put('"ucdv"', "false");

    // --- video codecs ---
    put('"vco"', '""');         put('"vcots"', "false");
    put('"vch"', '"probably"'); put('"vchts"', "true");
    put('"vcw"', '"probably"'); put('"vcwts"', "true");
    put('"vc3"', '"maybe"');    put('"vc3ts"', "false");
    put('"vcmp"', '""');        put('"vcmpts"', "false");
    put('"vc1"', '"probably"'); put('"vc1ts"', "true");
    put('"vcmk"', '"maybe"');   put('"vcmkuts"', "false");
    put('"vcq"', '""');         put('"vcqts"', "false");

    put('"exp3"',   '"1,1,5"');
    put('"vh_txt"', '"0,102,204,255,255,255"');
    put('"pf"',     '"Win32"');
    put('"hc"',     String(hc));
    put('"br_oh"',  String(W.br_oh));
    put('"br_ow"',  String(W.br_ow));
    put('"ua"',     `"${userAgent}"`);
    put('"wbd"',    "false");
    put('"ts_mtp"', "0");
    put('"mob"',    "false");
    put('"lgs"',    lgsJSON);
    put('"dvm"',    String(dvm));
    put('"nl_os"',  '"crlf"');

    // --- audio codecs ---
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

    put('"nhi"',   nhiVal);
    put('"k_lyts"', "48");
    put('"k_lytk"', '"kg20va`l\\\\\'w8mh.71pdfoqcn[zy365x/\\\\,-4bt9siu=j;r]e"');
    put('"aitd"',  '"available"');

    // --- spv-реальные (ДУБЛЬ: те же ключи, другие значения) ---
    put('"spvl"', "1");
    put('"spvr"', "19");
    put('"spvlg"', "18");
    put('"spvd"', "2147483648");

    // --- bci/bcl/bct/bdt — в File 2 стоят ЗДЕСЬ ---
    put('"bci"', "true");
    put('"bcl"', "1");
    put('"bct"', "0");
    put('"bdt"', "null");

    put('"stqe"', "10738766599");
    put('"stqu"', "1348359");
    put('"emd"',  '""');
    put('"ais"',  '"available"');
    put('"iccsH"', "3112050119");
    put('"iccsV"', '",59769b0c6f43d5fb07d5fd7dcac444e12328535f98649b7690678644bd8d4b63,2edb6d4f059fcebee3a0060df2be766887a963e629d6a69a9ce8fb3543f11280,41e41b3f2da75f8748211571be35a3555f2d46c453da7aa21340499a5ffa54cf,2edb6d4f059fcebee3a0060df2be766887a963e629d6a69a9ce8fb3543f11280"');

    // --- tail: glvd/glrd/tzp/cpup перенесены сюда ---
    put('"wwl"',  "false");
    put('"glvd"', webglMetrics.glvd);
    put('"glrd"', webglMetrics.glrd);
    put('"tzp"',  '"Africa/Khartoum"');
    put('"cpup"', "4");
    put('"isf"',  "false");
    put('"isf2"', "false");

    put('"pw"', "false"); put('"pcb"', "false"); put('"arc"', "false");
    put('"fai"', "false"); put('"gai"', "false"); put('"bbs3"', "false");

    put('"cfpfe"', '"ZnVuY3Rpb24obix0LGUpe24oaygxMTkxKSwhIShNW2soMTE5MildfHxNW0coMjIzKV18fE1baygxMTkzKV18fE1bRygyMjQpXXx8TVtHKDIyNSldKSk7dmFyIGk9TVtHKDEzKV1bayg2MDEpXShrKDY1NSkpLGM9KGlbayhFKDQ1Miw1MjMpKV09aygxMTk0KSxpW2so"');
    put('"stcfp"', '"cm93ZGNvbnRyb2wudmlhZ29nby5jb20vZDY2MzE5NTctLXRhZ3MuanM6MjoxMzY0MDIKYXQgciAoaHR0cHM6Ly9jZG4uc3R1Ymh1YnN0YXRpYy5jb20vc2l0ZS1hc3NldHMvd3d3L1NjcmlwdHMvZC9lL3Yvc2VudHJ5LkJvdURXVmhJLmNodW5rLmpzOjI6NTU5MzUp"');

    put('"dt"', "false"); put('"dp1"', "true"); put('"dpb"', "true");

    put('"fph"',  "2560250357");
    put('"sgb"',  '"3192781678"');
    put('"sgd"',  '"2022760486"');
    put('"sgc"',  '"3193645725"');
    put('"jset"', jsetVal);
    put('"bpc"',  "1");                 // ← bpc #1

    // ============================================================
    // dcok + биометрия
    // ============================================================
    put('"dcok"', '".viagogo.com"');

    put('"m_scw"', "107"); put('"m_sch"', "189");
    put('"m_pp"',  "0.5"); put('"m_fmi"', "false"); put('"mdhf"', "false");

    put('"es_sigmdn"',  "0.0021574437973739466");
    put('"es_mumdn"',   "10.712599847241679");
    put('"es_distmdn"', "68.86566830920738");
    put('"es_angsmdn"', "0.008535756058814403");
    put('"es_angemdn"', "3.141592653589793");

    put('"m_cnt"',   "336");
    put('"m_spdA"',  "660.7147539524656");
    put('"m_spdSD"', "416.73931970388946");
    put('"m_xSpdA"', "560.4148518798312");
    put('"m_xSpdSD"',"426.02965297259414");
    put('"m_ySpdA"', "237.32248504373115");
    put('"m_ySpdSD"',"236.1641437493691");
    put('"m_str8"',  "0.1202757885445297");
    put('"m_durmdn"',"1774.5");
    put('"m_crdU"',  "304"); put('"m_crdD"', "387");
    put('"m_crdL"',  "810"); put('"m_crdR"', "820");

    put('"k_hA"', "null");  put('"k_hSD"', "null");
    put('"k_pA"', "null");  put('"k_pSD"', "null");
    put('"k_rA"', "null");  put('"k_rSD"', "null");
    put('"k_ikA"',"null");  put('"k_ikSD"',"null");
    put('"k_kdc"',"0");     put('"k_kuc"', "0");

    put('"p_fc"',   "100");
    put('"m_clsdcnt"', "101");
    put('"p_cf"',   "100");
    put('"p_cmx"',  "2");
    put('"p_ps"',   "0");
    put('"p_pf"',   "0");

    put('"sc_vA"',  "null"); put('"sc_vSD"', "null");
    put('"sc_du"',  "0");    put('"sc_su"',  "0");
    put('"sc_smSD"',"null"); put('"sc_bc"',  "0");

    put('"t_cnt"',   "0");
    put('"t_spdA"',  "null"); put('"t_spdSD"', "null");
    put('"t_xSpdA"', "null"); put('"t_xSpdSD"', "null");
    put('"t_ySpdA"', "null"); put('"t_ySpdSD"', "null");
    put('"t_str8"',  "null");
    put('"t_crdU"',  "0");    put('"t_crdD"', "0");
    put('"t_crdL"',  "0");    put('"t_crdR"', "0");
    put('"t_forA"',  "null"); put('"t_forSD"', "null");
    put('"t_radsA"', "null"); put('"t_radsSD"', "null");
    put('"t_sigmdn"',"null"); put('"t_mumdn"', "null");
    put('"t_distmdn"',"null");put('"t_durmdn"', "null");
    put('"t_isgmdn"',"null"); put('"t_cncmx"', "0");

    put('"m_s_c"',  "0");
    put('"m_m_c"',  "336");
    put('"m_c_c"',  "1");
    put('"m_cm_r"', "0.002976190476190476");
    put('"m_ms_r"', "-1");

    put('"pst_cnt"',    "0"); put('"pst_untrcnt"', "0");
    put('"inp_cnt"',    "0"); put('"inp_untrcnt"', "0");
    put('"chg_cnt"',    "0"); put('"chg_untrcnt"', "0");

    put('"uish"', uishVal);

    return o;
};