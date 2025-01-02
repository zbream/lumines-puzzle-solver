import { createContext, useContext } from "react";
import { Board } from "../board/board";

export interface BoardContextType {
  board: Board;
  toggle: (row: number, col: number, value: boolean) => void;
  clear: () => void;
  shiftUp: () => void;
  shiftDown: () => void;
  shiftLeft: () => void;
  shiftRight: () => void;
}

export const BoardContext = createContext<BoardContextType>(
  undefined as unknown as BoardContextType
);

export const useBoard = () => useContext(BoardContext);
