import * as XLSX from 'xlsx';

interface Player {
    id: number;
    name: string;
    throws: number[]; 
    sets: number;
    legs: number;
    isEnabled: boolean;
    country?: string;
    matchHistory: number[];
    checkoutHistory: number[];
}

export const exportMatchToExcel = () => {

    // LOAD DATA FROM STORAGE
    const MATCH_STORAGE_KEY = "darts_match_snapshot";
    const matchStr = localStorage.getItem(MATCH_STORAGE_KEY);

    if (!matchStr) {
        window.alert(`No ongoing game found.`);
        return;
    }

    const savedMatch = JSON.parse(matchStr);
    const restoredPlayers: Player[] = savedMatch.players;
    const players = restoredPlayers.filter(p => p.isEnabled);

    // PREPARE SUMMARY STATISTICS
    const summaryData = players.map((p) => {
        const totalScore = p.matchHistory.reduce((a, b) => a + b, 0);
        const totalDarts = p.matchHistory.length * 3; 
        const average = totalDarts > 0 ? (totalScore / totalDarts) * 3 : 0;
        
        const tons = p.matchHistory.filter(s => s >= 100 && s < 140).length;
        const tonForties = p.matchHistory.filter(s => s >= 140 && s < 180).length;
        const oneEighties = p.matchHistory.filter(s => s === 180).length;
        const highestCheckout = p.checkoutHistory.length > 0 ? Math.max(...p.checkoutHistory) : "-";

        return {
            "Player": p.name,
            "Sets": p.sets,
            "Legs": p.legs,
            "Avg": parseFloat(average.toFixed(2)),
            "Total Score": totalScore,
            "Darts Thrown": totalDarts,
            "Highest Visit": Math.max(...p.matchHistory, 0),
            "Highest Checkout": highestCheckout,
            "100+": tons,
            "140+": tonForties,
            "180": oneEighties,
            "Checkouts Count": p.checkoutHistory.length
        };
    });

    // Explicit header order to prevent "180" sorting to the front
    const summaryHeaders = [
        "Player", "Sets", "Legs", "Avg", "Total Score", "Darts Thrown", 
        "Highest Visit", "Highest Checkout", "100+", "140+", "180", "Checkouts Count"
    ];

    // PREPARE THROW LOG (DETAILS)
    const maxVisits = Math.max(...players.map(p => p.matchHistory.length));
    const detailsData: any[] = [];

    for (let i = 0; i < maxVisits; i++) {
        const row: Record<string, string | number> = {
            "Visit #": i + 1
        };
        players.forEach(p => {
            const score = p.matchHistory[i];
            row[p.name] = score !== undefined ? score : ""; 
        });
        detailsData.push(row);
    }
    
    // Header for details is dynamic based on player names
    const detailsHeaders = ["Visit #", ...players.map(p => p.name)];

    // PREPARE CHECKOUTS LOG
    const checkoutData = players.flatMap(p => {
        return p.checkoutHistory.map((co, index) => ({
            "Player": p.name,
            "Checkout Score": co,
            "Checkout #": index + 1
        }));
    }).sort((a, b) => b["Checkout Score"] - a["Checkout Score"]);

    // PREPARE SCORE DISTRIBUTION
    const distributionData = players.map(p => {
        const scores = p.matchHistory;
        return {
            "Player": p.name,
            "0 - 40": scores.filter(s => s <= 40).length,
            "41 - 60": scores.filter(s => s > 40 && s <= 60).length,
            "61 - 99": scores.filter(s => s > 60 && s <= 99).length,
            "100 - 139": scores.filter(s => s >= 100 && s < 140).length,
            "140 - 179": scores.filter(s => s >= 140 && s < 180).length,
            "180": scores.filter(s => s === 180).length,
        };
    });

    const distHeaders = ["Player", "0 - 40", "41 - 60", "61 - 99", "100 - 139", "140 - 179", "180"];

    // CREATE WORKBOOK & APPEND SHEETS
    const workbook = XLSX.utils.book_new();

    //Summary Sheet
    const wsSummary = XLSX.utils.json_to_sheet(summaryData, { header: summaryHeaders });
    wsSummary['!cols'] = [{ wch: 20 }, { wch: 8 }, { wch: 8 }, { wch: 10 }, { wch: 12 }, { wch: 15 }, { wch: 15 }, { wch: 18 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(workbook, wsSummary, "Summary Stats");

    // Details Sheet
    const wsDetails = XLSX.utils.json_to_sheet(detailsData, { header: detailsHeaders });
    XLSX.utils.book_append_sheet(workbook, wsDetails, "Throw Log");

    // Checkouts Sheet (Only if data exists)
    if (checkoutData.length > 0) {
        const wsCheckouts = XLSX.utils.json_to_sheet(checkoutData);
        wsCheckouts['!cols'] = [{ wch: 20 }, { wch: 15 }, { wch: 12 }];
        XLSX.utils.book_append_sheet(workbook, wsCheckouts, "Checkouts");
    }

    // Distribution Sheet
    const wsDist = XLSX.utils.json_to_sheet(distributionData, { header: distHeaders });
    wsDist['!cols'] = [{ wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 8 }];
    XLSX.utils.book_append_sheet(workbook, wsDist, "Score Distribution");

    // DOWNLOAD FILE
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');    

    XLSX.writeFile(workbook, `DartES_${date}_${time}.xlsx`, { compression: true });
};