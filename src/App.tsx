import { FC } from "react";
import "./App.css";
import { BoardComponent } from "./components/BoardComponent";
import { ButtonsComponent } from "./components/ButtonsComponent";

export const App: FC = () => {
  return (
    <>
      <h1>Lumines Puzzle Solver</h1>
      <BoardComponent></BoardComponent>
      <ButtonsComponent />
    </>
  );
};
