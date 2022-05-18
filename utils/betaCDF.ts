// Taken from https://www.math.ucla.edu/~tom/distributions/beta.html

function LogGamma(Z: number): number {
  const S =
    1 +
    76.18009173 / Z -
    86.50532033 / (Z + 1) +
    24.01409822 / (Z + 2) -
    1.231739516 / (Z + 3) +
    0.00120858003 / (Z + 4) -
    0.00000536382 / (Z + 5);
  const LG =
    (Z - 0.5) * Math.log(Z + 4.5) - (Z + 4.5) + Math.log(S * 2.50662827465);
  return LG;
}

function Betinc(x: number, a: number, b: number): number {
  let A0 = 0;
  let B0 = 1;
  let A1 = 1;
  let B1 = 1;
  let M9 = 0;
  let A2 = 0;
  let C9;
  while (Math.abs((A1 - A2) / A1) > 0.00001) {
    A2 = A1;
    C9 = (-(a + M9) * (a + b + M9) * x) / (a + 2 * M9) / (a + 2 * M9 + 1);
    A0 = A1 + C9 * A0;
    B0 = B1 + C9 * B0;
    M9 = M9 + 1;
    C9 = (M9 * (b - M9) * x) / (a + 2 * M9 - 1) / (a + 2 * M9);
    A1 = A0 + C9 * A1;
    B1 = B0 + C9 * B1;
    A0 = A0 / B1;
    B0 = B0 / B1;
    A1 = A1 / B1;
    B1 = 1;
  }
  return A1 / a;
}

export function betaCDF(a: number, b: number): number {
  const Z = 0.5;
  if (a <= 0) {
    throw new Error("alpha must be positive");
  } else if (b <= 0) {
    throw new Error("beta must be positive");
  } else {
    const s = a + b;
    const BT = Math.exp(
      LogGamma(s) -
        LogGamma(b) -
        LogGamma(a) +
        a * Math.log(Z) +
        b * Math.log(1 - Z)
    );
    if (Z < (a + 1) / (s + 2)) {
      return BT * Betinc(Z, a, b);
    } else {
      return 1 - BT * Betinc(1 - Z, b, a);
    }
  }
}
