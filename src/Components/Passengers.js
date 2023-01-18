import React, { useState } from "react";
import "./Passengers.css";

export const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState("");
  const passengers = state.context.passengers;

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    send("ADD", { newPassenger: value });
    changeValue("");
  };

  const goToTicket = () => {
    send("DONE");
  };

  return (
    <form onSubmit={submit} className="Passengers">
      <p className="Passengers-title title">
        {!passengers.length
          ? "Agrega a las personas que van a volar ✈️"
          : "Lista de personas que van a volar ✈️"}
      </p>
      {passengers.length ? (
        <div className="Passengers-list">
          {passengers.map((passenger) => (
            <span className="Passenger-name" key={`passenger__${passenger}`}>
              {passenger}
            </span>
          ))}
        </div>
      ) : null}

      <input
        id="name"
        name="name"
        type="text"
        placeholder="Escribe el nombre completo"
        required
        value={value}
        onChange={onChangeInput}
      />
      <div className="Passengers-buttons">
        <button className="Passengers-add button-secondary" type="submit">
          Agregar Pasajero
        </button>
        <button
          onClick={goToTicket}
          className="Passenger-pay button"
          type="button"
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};
