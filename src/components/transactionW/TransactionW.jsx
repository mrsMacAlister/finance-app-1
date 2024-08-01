import React from "react";
import "./transactionW.scss";

const TransactionsW = ({ type }) => {
  let data;

  switch (type) {
    case "balance":
      data = {
        title: "BALANCE",
        amount: "+ 3.657 €",
        goal: "+ 2.500 €",
      };
      break;

    case "budget":
      data = {
        title: "BUDGET",
        amount: "+ 7.400 €",
        goal: "+ 5.000 €",
      };
      break;
    default:
      break;
  }
  return (
    <div className="transactionsW">
      <div className="title">{data.title}</div>
      <div className="amount">{data.amount}</div>
      <div className="goal">{data.goal}</div>
    </div>
  );
};

export default TransactionsW;
