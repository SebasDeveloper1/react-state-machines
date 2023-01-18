import { createMachine, assign } from "xstate";
import { fetchCountries } from "../Utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "getCountries",
        src: () => fetchCountries,
        onDone: {
          target: "success",
          actions: assign({
            countries: (context, event) => event.data,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: "Fallo el request",
          }),
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "initial",
    context: {
      passengers: [],
      selectedCountry: "",
      countries: [],
      error: "",
    },
    states: {
      initial: {
        on: {
          START: {
            target: "search",
            // actions: "printHome",
          },
        },
        ...fillCountries,
      },
      search: {
        // entry: "printEntry",
        // exit: "printExit",
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: (context, event) => event.selectedCountry,
            }),
          },
          CANCEL: {
            target: "initial",
            actions: "cleanContext",
          },
        },
      },
      tickets: {
        after: {
          5000: {
            target: "initial",
            actions: "cleanContext",
          },
        },
        on: {
          FINISH: {
            target: "initial",
            actions: "cleanContext",
          },
        },
      },
      passengers: {
        on: {
          DONE: { target: "tickets", cond: "moreThanOnePassenger" },
          CANCEL: {
            target: "initial",
            actions: "cleanContext",
          },
          ADD: {
            target: "passengers",
            actions: assign((context, event) =>
              context.passengers.push(event.newPassenger)
            ),
          },
        },
      },
    },
  },
  {
    actions: {
      printHome: () => {
        console.log("print home!");
      },
      printEntry: () => {
        console.log("print entry!");
      },
      printExit: () => {
        console.log("print exit!");
      },
      cleanContext: assign((context) => {
        context.passengers = [];
        context.selectedCountry = "";
        context.countries = [];
        context.error = "";
        return context;
      }),
    },
    guards: {
      moreThanOnePassenger: (context) => {
        return context.passengers.length > 0;
      },
    },
  }
);

export default bookingMachine;
