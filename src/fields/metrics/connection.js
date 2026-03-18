const networkTypes = [
    { type: "wifi", min: 50, max: 300 },
    { type: "4g", min: 5, max: 30 },
    { type: "3g", min: 0.5, max: 2 },
    // { type: "ethernet", min: 100, max: 1000 },
    // { type: "slow-2g", min: 0.05, max: 0.2 }
];

const selected = networkTypes[Math.floor(Math.random() * networkTypes.length)];

// Генерируем "nid" в Мбит/с в пределах диапазона
const nid = parseFloat((Math.random() * (selected.max - selected.min) + selected.min).toFixed(1));

// Симулируем saveData (экономия трафика) с вероятностью 10%
const nisd = Math.random() < 0.1;

const connectionMetrics = {
    "niet": selected.type,
    "nid": nid,
    "nisd": nisd
};

export { connectionMetrics };