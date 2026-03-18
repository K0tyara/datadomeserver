export const hashString = (str) => {
    try {
        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; // 32-bit int
        }

        return String(hash + 2147483648);
    } catch (e) {
        return "0";
    }
}