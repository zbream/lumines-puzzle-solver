import { FC, useCallback, useMemo } from "react";
import { BoardState, isPrimary } from "../board/board";
import { useBoard } from "../contexts/BoardContext";

interface CellComponentProps {
  state: BoardState;
  row: number;
  col: number;
}

const CellComponent: FC<CellComponentProps> = ({ state, row, col }) => {
  const { toggle } = useBoard();

  const handleClick = useCallback(() => {
    toggle(row, col, !isPrimary(state));
  }, [toggle, row, col, state]);

  return (
    <td data-state={state} onClick={handleClick}>
      <div />
    </td>
  );
};

export const BoardComponent: FC = () => {
  const { board } = useBoard();

  // Origin is in the bottom-left.
  const renderedBoard = useMemo(() => board.slice().reverse(), [board]);
  const height = renderedBoard.length;

  return (
    <table className="board">
      <tbody>
        {renderedBoard.map((rowData, row) => (
          <tr key={row}>
            {rowData.map((colData, col) => (
              <CellComponent
                key={col}
                state={colData}
                row={height - 1 - row}
                col={col}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
