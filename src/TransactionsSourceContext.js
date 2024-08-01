import { createContext, useReducer } from "react";
//try reverse-flex-direction for table rows to be reversed, so the most recently added is on top (not bottom by default)
const AppReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialState = {
  rows: [
    {
      id: 123456,
      date: "04/03/2023",
      description: "lunch with a friend",
      category: "food",
      paymentM: "Mastercard",
      income: "",
      outcome: 36,
    },
    {
      id: 123467,
      date: "03/03/2023",
      description: "Netlix subscription",
      category: "entertainment",
      paymentM: "Visa",
      income: "",
      outcome: 17.99,
    },
    {
      id: 122556,
      date: "03/03/2023",
      description: "groceries",
      category: "food",
      paymentM: "Visa",
      income: "",
      outcome: 56.73,
    },
    {
      id: 907654,
      date: "04/03/2023",
      description: "return plane ticket to Amsterdam",
      category: "travel",
      paymentM: "Visa",
      income: "",
      outcome: 392,
    },
  ],
};

export const TransactionsSourceContext = createContext();

export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <TransactionsSourceContext.Provider
      value={{
        rows: state.rows,
        dispatch,
      }}
    >
      {props.children}
    </TransactionsSourceContext.Provider>
  );
};
/*id: state.id,
        date: state.date,
        description: state.description,
        category: state.category,
        paymentM: state.paymentM,
        income: state.income,
        outcome: state.outcome,
        dispatch, */
