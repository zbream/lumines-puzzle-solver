import { HEIGHT, WIDTH } from "./common";
import { toArrayShifted } from "./util";

/**
 * A representation of the cells the user has selected.
 *
 * - Dimensions: 16x10
 * - Origin: bottom left
 */
export type Input = boolean[][];

/**
 * Create an empty board.
 */
export const createInput = (): Input => {
  return Array.from(new Array(HEIGHT), () => new Array(WIDTH).fill(false));
};

/**
 * Return a new board with the given cell set to the given value.
 *
 * Does not modify the original board.
 */
export const toInputToggle = (
  input: Input,
  row: number,
  col: number,
  value: boolean
) => {
  return [
    ...input.slice(0, row),
    [...input[row].slice(0, col), value, ...input[row].slice(col + 1)],
    ...input.slice(row + 1),
  ];
};

/**
 * Return a new board with all columns shifted up by 1, with wrap-around.
 *
 * Does not modify the original board.
 */
export const toInputShiftUp = (input: Input): Input => {
  return toArrayShifted(input, 1);
};

/**
 * Return a new board with all columns shifted down by 1, with wrap-around.
 *
 * Does not modify the original board.
 */
export const toInputShiftDown = (input: Input): Input => {
  return toArrayShifted(input, -1);
};

/**
 * Return a new board with all columns shifted left by 1, with wrap-around.
 *
 * Does not modify the original board.
 */
export const toInputShiftLeft = (input: Input): Input => {
  return input.map((row) => toArrayShifted(row, -1));
};

/**
 * Return a new board with all columns shifted right by 1, with wrap-around.
 *
 * Does not modify the original board.
 */
export const toInputShiftRight = (input: Input): Input => {
  return input.map((row) => toArrayShifted(row, 1));
};
