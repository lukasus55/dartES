// The standard clockwise order of a dartboard starting from the top (12 o'clock)
const SLICES = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

// Standard dartboard dimensions (radius from exact center in millimeters)
const RINGS = {
    DBULL: 6.35,              // Inner Bullseye
    BULL: 15.9,               // Outer Bullseye
    INNER_SINGLE_MAX: 99,     // Inner edge of Treble ring
    TREBLE_MAX: 107,          // Outer edge of Treble ring
    OUTER_SINGLE_MAX: 162,    // Inner edge of Double ring
    DOUBLE_MAX: 170           // Outer edge of Double ring (board edge)
};

/**
 * Standard Box-Muller transform to generate a Gaussian random number.
 * Returns a number clustered around the 'mean' with a spread of 'stdev'.
 */
function randomGaussian(mean: number = 0, stdev: number = 1): number {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
}


// Translates a bot level (1-10) into a physical accuracy spread (standard deviation in mm).
function getAccuracySpread(botLevel: number): number {
    // Invert the scale so higher level = lower spread

    const spreadByLevel: Record<number, number> = {
        1: 43, //21 - 25 avg
        2: 39, //26 - 30 avg
        3: 30, //31 - 35 avg
        4: 24.8, //36 - 40 avg
        5: 19.2, //41 - 50 avg
        6: 14.6, //51 - 61 avg
        7: 13, //61 - 70 avg
        8: 10.2, //71 - 80 avg
        9: 8.7, //81 - 90 avg
        10: 7.1, //91 - 100 avg
    }

    return spreadByLevel[botLevel] || 29;
}

/**
 * Finds the ideal physical X,Y coordinate for a target string.
 * (0,0) is the exact center of the bullseye. Positive Y is UP.
 */
function getIdealCoordinates(target: string): { x: number, y: number } {
    if (target === "BULL") return { x: 0, y: 0 };
    if (target === "25") return { x: 0, y: 11 }; // Arbitrary point in outer bull

    let multiplier = 1;
    let baseNumberStr = target;
    let radius = 134; // Default aim is the fat part of the outer single

    if (target.startsWith("T")) {
        multiplier = 3;
        baseNumberStr = target.substring(1);
        radius = 103; // Middle of the treble ring
    } else if (target.startsWith("D")) {
        multiplier = 2;
        baseNumberStr = target.substring(1);
        radius = 166; // Middle of the double ring
    }

    const numberValue = parseInt(baseNumberStr);
    const sliceIndex = SLICES.indexOf(numberValue);
    
    if (sliceIndex === -1) return { x: 0, y: 0 }; // Fallback to bull if target is invalid

    // Calculate angle. 0 degrees is Top (20). Clockwise.
    // Each slice is 360 / 20 = 18 degrees.
    const angleDegrees = sliceIndex * 18;
    const angleRadians = angleDegrees * (Math.PI / 180);

    // Convert polar to cartesian. 
    // Since 0 degrees is UP (Y-axis), we use sin for X and cos for Y.
    const x = radius * Math.sin(angleRadians);
    const y = radius * Math.cos(angleRadians);

    return { x, y };
}

/**
 * Converts a physical X,Y coordinate back into a dartboard score string.
 */
function calcHitResult(x: number, y: number): string {
    const distance = Math.sqrt(x * x + y * y);

    if (distance > RINGS.DOUBLE_MAX) return "0"; // missed dartboard
    if (distance <= RINGS.DBULL) return "BULL";
    if (distance <= RINGS.BULL) return "25";

    // calculate the angle to find the number slice
    // Math.atan2(x, y) treats UP as 0 degrees, returning between -PI and PI
    let angleRad = Math.atan2(x, y);
    if (angleRad < 0) angleRad += 2 * Math.PI; // Normalize to 0 -> 2PI

    const angleDeg = angleRad * (180 / Math.PI);

    // Shift by 9 degrees because the '20' slice is centered on 0, meaning it goes from 351 to 9.
    const sliceIndex = Math.floor((angleDeg + 9) / 18) % 20;
    const hitNumber = SLICES[sliceIndex];

    // Check which ring the dart landed in
    if (distance > RINGS.OUTER_SINGLE_MAX && distance <= RINGS.DOUBLE_MAX) {
        return `D${hitNumber}`;
    }
    if (distance > RINGS.INNER_SINGLE_MAX && distance <= RINGS.TREBLE_MAX) {
        return `T${hitNumber}`;
    }
    
    // single
    return `${hitNumber}`;
}

export default class Dart {
    ideal: { x: number, y: number };
    spread: number;
    x: number;
    y: number;
    hitResult: string;

    constructor(target: string, botLevel: number) {
        this.ideal = getIdealCoordinates(target);
        this.spread = getAccuracySpread(botLevel);

        // Apply Gaussian scatter (simulate the physical throw)
        this.x = randomGaussian(this.ideal.x, this.spread);
        this.y = randomGaussian(this.ideal.y, this.spread);

        this.hitResult = calcHitResult(this.x, this.y);
    }
}
