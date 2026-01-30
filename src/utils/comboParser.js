/**
 * Parses combo-db.csv into an array of combo objects.
 */
export const parseComboCSV = (csvText) => {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

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

    return lines.slice(1).map(line => {
        const row = parseLine(line);
        return {
            id: row[0],
            keywords: row[1],
            artist: row[2],
            name: row[3],
            link: row[4],
            image: row[5]
        };
    });
};
