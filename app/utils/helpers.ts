export function capitalizeFirstLetter(val: string): string {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

// Server side sleep
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Cient side delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));