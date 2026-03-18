const rand = (min, max) => Math.random() * (max - min) + min;

const tcpMetrics = {
    nt_tcp: parseFloat(rand(10, 30).toFixed(14)),          
    nt_dns: parseFloat(rand(5, 60).toFixed(14)),           
    nt_rd: 0,                                             
    nt_irt: parseFloat(rand(-60, 5).toFixed(14)),          
    nt_rt: parseFloat(rand(50, 300).toFixed(14)),          
    nt_tls: parseFloat(rand(0, 5).toFixed(14)),            
    nt_ttf: parseFloat(rand(100, 300).toFixed(14)),        
    nt_swt: parseFloat(rand(0, 5)),            
    nt_csd: Math.floor(rand(0, 60000).toFixed(14)),                   
    nt_nhp: "h3",                                         
    nt_rdc: 0,                                            
    nt_it: "navigation",                                  
    nt_prs: parseFloat(rand(-30, 10).toFixed(14)),         
    nt_esc: parseFloat(rand(0, 2).toFixed(14)),            
    nt_ttrd: parseFloat(rand(-1, 0).toFixed(14)),          
    nt_le: parseFloat(rand(0, 100).toFixed(14)),           
    nt_dcle: parseFloat(rand(0, 50).toFixed(14)),          
    nt_di: parseInt(rand(5000, 200000).toFixed(0)),         
    nt_dc: parseFloat(rand(200, 1000).toFixed(0))         
};

export { tcpMetrics };