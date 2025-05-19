import "../widget/widget.scss";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
//import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const Widget = ({ type }) => {
  const [outcome, setOutcome] = useState(null);
  const [income, setIncome] = useState(null);

  let balance = income - outcome;
  let data;

  switch (type) {
    case "balance":
      data = {
        title: "BALANCE",
        amount: balance,
        goal: "+ 2.500 €",
      };
      break;
    case "budget":
      data = {
        title: "BUDGET",
        amount: "4000",
        goal: "4000",
      };
      break;
    case "outcome":
      data = {
        title: "OUTCOME",
        amount: outcome,
        goal: "- 4.500 €",
      };
      break;
    case "income":
      data = {
        title: "INCOME",
        amount: income,
        goal: "+ 5.000 €",
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userID = authUser.uid;
        try {
          const fetchData = async () => {
            const outcomeList = [];
            const incomeList = [];

            // Query for all documents within the date range
            const expensesQuery = query(
              collection(db, `${userID}expenses`),
              where("day", "<=", "2025-05-31"),
              where("day", ">", "2025-04-30")
            );
            const expensesSnapshot = await getDocs(expensesQuery);

            // Filter results locally for non-null outcome and income
            expensesSnapshot.forEach((doc) => {
              const data = doc.data();
              if (data.outcome != null) {
                outcomeList.push(parseFloat(data.outcome, 10));
              }
              if (data.income != null) {
                incomeList.push(parseFloat(data.income, 10));
              }
            });

            // Calculate total outcome and income
            const totalOutcome = outcomeList.reduce(
              (total, item) => total + item,
              0
            );
            const totalIncome = incomeList.reduce(
              (total, item) => total + item,
              0
            );

            // Update state
            setOutcome(totalOutcome);
            setIncome(totalIncome);
          };

          await fetchData();
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      }
    });

    return () => unsub(); // Clean up listener
  }, []);

  return (
    <div className="widget">
      <div className="title">{data.title}</div>
      <div className="amount">{data.amount} €</div>
      <div className="goal">Goal: {data.goal}</div>
    </div>
  );
};

export default Widget;
