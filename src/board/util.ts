/**
 * Return the positive modulo of `n` by `d`.
 * The result will be in the range `[0, d)` no matter the sign of `n`.
 *
 * This is useful for iterating an array from any starting index,
 * ensuring the index wraps around safely.
 *
 * @param n dividend
 * @param d divisor
 * @returns positive modulo
 */
export const getPositiveModulo = (n: number, d: number) => ((n % d) + d) % d;

/**
 * Returns a new array with all elements shifted by a given number of entries.
 *
 * Does not modify the original array.
 *
 * @param array array
 * @param steps steps to shift
 * @returns
 */
export const toArrayShifted = <T>(array: T[], steps: number): T[] => {
  return Array.from(
    array,
    (_, index) => array[getPositiveModulo(index - steps, array.length)]
  );
};
