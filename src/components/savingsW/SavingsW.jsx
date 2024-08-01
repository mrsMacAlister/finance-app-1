import React from "react";
import "./savingsW.scss";
import { v4 as uuidv4 } from "uuid";

const SavingsW = () => {
  /*  const [outcome, setOutcome] = useState(null);
  const [income, setIncome] = useState(null);

  let balance = income - outcome;
  let data;

  switch (type) {
    case "balance":
      data = {
        title: "BALANCE",
        amount: balance,
        deadline: "+ 2.500 €",
      };
      break;
    case "budget":
      data = {
        title: "BUDGET",
        amount: "4000",
        deadline: "4000",
      };
      break;
    case "outcome":
      data = {
        title: "OUTCOME",
        amount: `${outcome}`,
        deadline: "- 4.500 €",
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
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;
          const fetchData = async () => {
            let outcomeList = [];
            let incomeList = [];

            const outcomeQuery = query(
              collection(db, `${userID}expenses`),
              where("outcome", "!=", null)
            );

            const outcomeQ = await getDocs(outcomeQuery);

            outcomeQ.forEach((doc) => {
              const outc = { outcome: doc.data().outcome };
              outcomeList.push(parseFloat(outc.outcome, 10));
            });
            //console.log("outcome list", outcomeList);
            const totalOutcome = outcomeList.reduce((total, item) => {
              return total + item;
            }, 0);

            console.log("Total OUTCOME", totalOutcome);
            setOutcome(totalOutcome);

            const incomeQuery = query(
              collection(db, `${userID}expenses`),
              where("income", "!=", null)
            );

            const incomeQ = await getDocs(incomeQuery);

            incomeQ.forEach((doc) => {
              const inc = { income: doc.data().income };
              incomeList.push(parseFloat(inc.income, 10));
            });
            //console.log("outcome list", outcomeList);
            const totalIncome = incomeList.reduce((total, item) => {
              return total + item;
            }, 0);

            console.log("Total OUTCOME", totalOutcome);
            setIncome(totalIncome);
          };
          fetchData();
        } catch (err) {
          console.log(err);
        }
      }
    });
  }, []);
*/
  let data = [
    {
      id: uuidv4(),
      title: "NORHTERN LIGHTS IN FINLAND",
      amount: "5.000 €",
      deadline: "September 2024",
    },
    {
      id: uuidv4(),
      title: "HOUSE DOWNPAYMENT",
      amount: "30.000 €",
      deadline: "August 2028",
    },
    {
      id: uuidv4(),
      title: "LIVE SEMINAR",
      amount: "2.500 €",
      deadline: "March 2023",
    },
  ];

  return (
    <div className="savingsW">
      {data.map((dt) => (
        <div className="widget" key={dt.id}>
          <div className="title">{dt.title}</div>
          <div className="amount">{dt.amount}</div>
          <div className="deadline">by {dt.deadline}</div>
        </div>
      ))}
    </div>
  );
};

export default SavingsW;
