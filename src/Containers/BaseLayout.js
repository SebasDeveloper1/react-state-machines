import React from "react";
import { useMachine } from "@xstate/react";
import { Nav } from "../Components/Nav";
import { StepsLayout } from "./StepsLayout";
import bookingMachine from "../Machines/bookingMachine";
import { Welcome } from "../Components/Welcome";
import { Search } from "../Components/Search";
import { Passengers } from "../Components/Passengers";
import { Tickets } from "../Components/Tickets";
import "./BaseLayout.css";

export const BaseLayout = () => {
  const [state, send] = useMachine(bookingMachine);

  console.log("nuestra maquina", state.value, state.context);
  return (
    <div className="BaseLayout">
      <Nav state={state} send={send} />
      <StepsLayout>
        {state.matches("initial") ? (
          <Welcome send={send} />
        ) : state.matches("search") ? (
          <Search state={state} send={send} />
        ) : state.matches("tickets") ? (
          <Tickets state={state} send={send} />
        ) : state.matches("passengers") ? (
          <Passengers state={state} send={send} />
        ) : null}
        {/* {state.matches("initial") && <Welcome send={send} />}
        {state.matches("search") && <Search send={send} />}
        {state.matches("tickets") && <Tickets send={send} />}
        {state.matches("passengers") && <Passengers send={send} />} */}
      </StepsLayout>
    </div>
  );
};
