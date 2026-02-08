import { getCheckoutGuide } from "./checkout";

describe('Calculate checkout for different scores', () => {
  test('Should return null for 177', () => {
    expect(getCheckoutGuide(177)).toStrictEqual(null);
  });

  test('Should return ["T20","T20","BULL"] for 170', () => {
    expect(getCheckoutGuide(170)).toStrictEqual(["T20", "T20", "BULL"]);
  });

  test('Should return null for 169', () => {
    expect(getCheckoutGuide(169)).toStrictEqual(null);
  });

  test('Should return null for 168', () => {
    expect(getCheckoutGuide(168)).toStrictEqual(null);
  });

  test('Should return ["T18","18","D16"] for 104', () => {
    expect(getCheckoutGuide(104)).toStrictEqual(["T18", "18", "D16"]);
  });

  test('Should return ["T19","D10"] for 77', () => {
    expect(getCheckoutGuide(77)).toStrictEqual(["T19", "D10"]);
  });

  test('Should return ["18","D20"] for 57', () => {
    expect(getCheckoutGuide(57)).toStrictEqual(["18", "D20"]);
  });

  test('Should return ["12","D20"] for 51', () => {
    expect(getCheckoutGuide(51)).toStrictEqual(["12", "D20"]);
  });

  test('Should return ["BULL"] for 50', () => {
    expect(getCheckoutGuide(50)).toStrictEqual(["BULL"]);
  });

  test('Should return ["D20"] for 40', () => {
    expect(getCheckoutGuide(40)).toStrictEqual(["D20"]);
  });

  test('Should return ["5","D5"] for 15', () => {
    expect(getCheckoutGuide(15)).toStrictEqual(["5", "D5"]);
  });

  test('Should return ["D6"] for 12', () => {
    expect(getCheckoutGuide(12)).toStrictEqual(["D6"]);
  });

  test('Should return ["D2"] for 4', () => {
    expect(getCheckoutGuide(4)).toStrictEqual(["D2"]);
  });

  test('Should return null for 1', () => {
    expect(getCheckoutGuide(1)).toStrictEqual(null);
  });

});