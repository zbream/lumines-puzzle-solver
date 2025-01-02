import { FC } from "react";
import { useBoard } from "../contexts/BoardContext";

export const ButtonsComponent: FC = () => {
  const { shiftUp, shiftDown, shiftLeft, shiftRight, clear } = useBoard();
  return (
    <div className="buttons">
      <div>
        <div>
          <button onClick={shiftUp}>Up</button>
        </div>
        <div>
          <button onClick={shiftLeft}>Left</button>
          <button onClick={shiftRight}>Right</button>
        </div>
        <div>
          <button onClick={shiftDown}>Down</button>
        </div>
      </div>
      <button onClick={clear}>Clear</button>
    </div>
  );
};
