const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const PROFILES = [
    { hc: 4,  dvm: 8,  cpup: 2 },
    { hc: 8,  dvm: 8,  cpup: 3 },
    { hc: 8,  dvm: 16, cpup: 3 },
    { hc: 12, dvm: 16, cpup: 3 },
    { hc: 16, dvm: 16, cpup: 4 },
    { hc: 16, dvm: 32, cpup: 4 },
    { hc: 20, dvm: 32, cpup: 4 },
];

export const generateSystemMetrics = () => {
    const { hc, dvm, cpup } = pick(PROFILES);

    return {
        pf: "Win32",
        hc,
        dvm,
        cpup,
    };
};