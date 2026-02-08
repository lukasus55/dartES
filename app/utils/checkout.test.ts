import { getCheckoutGuide } from "./checkout";

test('Calculate checkout for different scores', () => {
  expect(getCheckoutGuide(177)).toStrictEqual(null);
  expect(getCheckoutGuide(170)).toStrictEqual(["T20", "T20", "BULL"]);
  expect(getCheckoutGuide(169)).toStrictEqual(null);
  expect(getCheckoutGuide(168)).toStrictEqual(null);
  expect(getCheckoutGuide(104)).toStrictEqual(["T18", "18", "D16"]);
  expect(getCheckoutGuide(77)).toStrictEqual(["T19", "D10"]);
  expect(getCheckoutGuide(57)).toStrictEqual(["18", "D20"]);
  expect(getCheckoutGuide(51)).toStrictEqual(["12", "D20"]);
  expect(getCheckoutGuide(50)).toStrictEqual(["BULL"]);
  expect(getCheckoutGuide(40)).toStrictEqual(["D20"]);
  expect(getCheckoutGuide(15)).toStrictEqual(["5", "D5"]);
  expect(getCheckoutGuide(12)).toStrictEqual(["D6"]);
  expect(getCheckoutGuide(4)).toStrictEqual(["D2"]);
  expect(getCheckoutGuide(1)).toStrictEqual(null);
});