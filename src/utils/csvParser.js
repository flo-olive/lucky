/**
 * Parses CSV text into an array of fortune objects.
 * Handles comma-separated values, ignoring commas inside quotes.
 * 
 * Mapping:
 * - "총 운세 옵션 2" -> message
 * - "행운 항목 1" -> luckyItems[0].label, "행운 결과 1" -> luckyItems[0].value
 * - "행운 항목 2" -> luckyItems[1].label, "행운 결과 2" -> luckyItems[1].value
 * - "행운 항목 3" -> luckyItems[2].label, "행운 결과 3" -> luckyItems[2].value
 * - "추천 음악 제목" -> music.title
 * - "추천 아티스트" -> music.artist
 */
export const parseFortuneCSV = (csvText) => {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    // Simple CSV parser that handles quotes
    const parseLine = (line) => {
        const values = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());
        return values;
    };

    const rows = lines.slice(1).map(line => parseLine(line));

    return rows.map(row => ({
        message: row[1],
        luckyItems: [
            { label: row[2], value: row[3] },
            { label: row[4], value: row[5] },
            { label: row[6], value: row[7] }
        ],
        music: {
            title: row[8],
            artist: row[9]
        },
        targetProductCode: row[10]
    }));
};
