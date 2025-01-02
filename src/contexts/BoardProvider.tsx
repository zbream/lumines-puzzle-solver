import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import {
  createInput,
  Input,
  toInputShiftDown,
  toInputShiftLeft,
  toInputShiftRight,
  toInputShiftUp,
  toInputToggle,
} from "../board/board-input";
import { BoardContext } from "./BoardContext";
import { toBoard } from "../board/board";

export const BoardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [input, setInput] = useState<Input>(() => createInput());
  const board = useMemo(() => toBoard(input), [input]);

  const clear = useCallback(() => {
    setInput(createInput());
  }, [setInput]);

  const shiftUp = useCallback(() => {
    setInput((previousInput) => toInputShiftUp(previousInput));
  }, [setInput]);
  const shiftDown = useCallback(() => {
    setInput((previousInput) => toInputShiftDown(previousInput));
  }, [setInput]);
  const shiftLeft = useCallback(() => {
    setInput((previousInput) => toInputShiftLeft(previousInput));
  }, [setInput]);
  const shiftRight = useCallback(() => {
    setInput((previousInput) => toInputShiftRight(previousInput));
  }, [setInput]);

  const toggle = useCallback(
    (row: number, col: number, value: boolean) => {
      setInput((previousInput) =>
        toInputToggle(previousInput, row, col, value)
      );
    },
    [setInput]
  );

  const value = useMemo(
    () => ({
      board,
      toggle,
      clear,
      shiftUp,
      shiftDown,
      shiftLeft,
      shiftRight,
    }),
    [board, toggle, clear, shiftUp, shiftDown, shiftLeft, shiftRight]
  );
  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
