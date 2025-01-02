import { Input } from "./board-input";
import { HEIGHT, WIDTH } from "./common";

export const enum BoardState {
  /** Unused cell. */
  Neutral = 1,
  /** Primary cell, implements the design. */
  Primary,
  /** Prmary cell, implements the design. Vulnerable to accidental clear as part of a 4x4 square. */
  PrimaryVulnerable,
  /** Part of a tile that has a Primary cell. */
  Secondary,
  /** Part of a tile that has a Primary cell. Vulnerable to accidental clear as part of a 4x4 square. */
  SecondaryVulnerable,
}

/**
 * A representation of the cells as evaulated and displayed to the user.
 *
 * - Dimensions: 16x10
 * - Origin: bottom left
 */
export type Board = BoardState[][];

/** Is the cell `Primary` or `PrimaryVulnerable`? */
export const isPrimary = (state: BoardState) =>
  state === BoardState.Primary || state === BoardState.PrimaryVulnerable;

/** Is the cell `Secondary` or `SecondaryVulnerable`? */
export const isSecondary = (state: BoardState) =>
  state === BoardState.Secondary || state === BoardState.SecondaryVulnerable;

/** Convert a status to its equivalent Vulnerable status, if applicable. */
const toVulnerable = (state: BoardState) => {
  switch (state) {
    case BoardState.Primary:
      return BoardState.PrimaryVulnerable;
    case BoardState.Secondary:
      return BoardState.SecondaryVulnerable;
    default:
      return state;
  }
};

/**
 * Is the cell part of a tile that is used to support a Primary cell?
 */
const isCellSupport = (input: Board, row: number, col: number): boolean => {
  const tileRow = 2 * Math.floor(row / 2);
  const tileCol = 2 * Math.floor(col / 2);

  for (let c = tileCol; c <= tileCol + 1; c++) {
    for (let r = tileRow; r < HEIGHT; r++) {
      if (input[r][c] === BoardState.Primary) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Is the 2x2 tile (given its bottom-left coordinate) vulnerable to being cleared?
 *
 * A tile is vulnerable if all cells have the same non-neutral State.
 */
const isTileVulnerable = (input: Board, row: number, col: number): boolean => {
  if (row < 0 || row >= HEIGHT - 1 || col < 0 || col >= WIDTH - 1) {
    return false;
  }
  if (input[row][col] === BoardState.Neutral) {
    return false;
  }

  // Cells may or may not have already been marked vulnerable,
  // so normalize to vulnerable for consistency.
  const state = toVulnerable(input[row][col]);
  for (let r = row; r <= row + 1; r++) {
    for (let c = col; c <= col + 1; c++) {
      if (toVulnerable(input[r][c]) !== state) {
        return false;
      }
    }
  }

  return true;
};

/**
 * Is the cell vulnerable to being cleared?
 *
 * A cell is vulnerable if it's in some 2x2 tile of identical non-neutral States.
 */
const isCellVulnerable = (input: Board, row: number, col: number): boolean => {
  // chec top-right tile
  if (isTileVulnerable(input, row, col)) {
    return true;
  }
  // check top-left tile
  if (isTileVulnerable(input, row, col - 1)) {
    return true;
  }
  // check bottom-left tile
  if (isTileVulnerable(input, row - 1, col - 1)) {
    return true;
  }
  // check bottom-right tile
  if (isTileVulnerable(input, row - 1, col)) {
    return true;
  }
  return false;
};

/**
 * Convert the user's input into a presentational Board, showing the necessary
 * Primary/Secondary tiles needed to fulfil the design.
 */
export const toBoard = (input: Input): Board => {
  // Start each entry as either Primary or Neutral given the user selection.
  const result: Board = Array.from(input, (row) =>
    Array.from(row, (col) => (col ? BoardState.Primary : BoardState.Neutral))
  );

  // Mark all Secondary cells that are used to support a Primary cell.
  for (let r = 0; r < HEIGHT; r++) {
    for (let c = 0; c < WIDTH; c++) {
      if (result[r][c] === BoardState.Primary) {
        continue;
      }
      if (isCellSupport(result, r, c)) {
        result[r][c] = BoardState.Secondary;
      }
    }
  }

  // Now that all cells are classified as either Primary or Secondary,
  // check if each one is vulnerable and mark as such.
  for (let r = 0; r < HEIGHT; r++) {
    for (let c = 0; c < WIDTH; c++) {
      if (isCellVulnerable(result, r, c)) {
        result[r][c] = toVulnerable(result[r][c]);
      }
    }
  }

  return result;
};
