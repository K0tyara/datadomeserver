    // cssS — отступы, padding, borderTopWidth
    const cssS = Array.from({length: 9}, () => (Math.random() * 12).toFixed(2)).join(',');

    // css0 — цвет текста RGB
    const css0 = Array.from({length: 3}, () => Math.floor(Math.random() * 256)).join(', ');

    // css1 — трансформация matrix(a,b,c,d,e,f)
    const css1 = Array.from({length: 16}, () => (Math.random() * 10 - 5).toFixed(6)).join(', ');

    // cssH — высота элемента
    // const cssH = Math.floor(Math.random() * 50) + 'px';
    const cssH = 0;

    const renderingMetrics = {
        cssS,
        css0,
        css1,
        cssH
    };

    export  { renderingMetrics };