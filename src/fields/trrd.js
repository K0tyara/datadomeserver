
let e = Math.SQRT2;

var t = Math.sqrt(
    Math.abs(
        Math.sin(Math.PI / 90 * 100 - 40 * Math.random() * (Math.PI / 180) / 2) +
        Math.cos(100 * e * (Math.PI / 180)) *
        Math.sin(Math.PI / 180 * 40 - 100 * Math.random() * (Math.PI / 75) / 2)
    )
);

e = Math.random() * Math.sqrt(
    Math.abs(
        1 - Math.sin(40 * Math.random() * (Math.PI / 90) - 100 * e * (Math.PI / 180) / 2) +
        Math.cos(3.7055555555555557) *
        Math.random() *
        Math.sin(Math.PI / 180 * 60 - Math.PI / 45 * 100 / 2)
    )
);

const trrd = Math.atan2(t, e).toFixed(16);

export { trrd };