import "./chart.scss";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
//import moment from "moment/moment";
/*import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";*/
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

//const [datas, setDatas] = useState([]);

/*
const CustomTooltip = ({ active, data }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        {data.map((dt) => (
          <div className="tooltips" key={dt.id}>
            <p className="title">{`${dt.Month}`}</p>
            <p className="balance">{`${dt.Balance}`}</p>
            <p className="desc">Anything you want can be displayed here.</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};
*/

const Chart = ({ aspect }) => {
  const [datas, setDatas] = useState([]);
  /* const data = [
    { id: 202204, Month: "April", Income: 3800, Outcome: 2560, Balance: 1240 },
    { id: 202205, Month: "May", Income: 4000, Outcome: 2400, Balance: 181 },
    { id: 202206, Month: "June", Income: 5000, Outcome: 2400, Balance: 1850 },
    { id: 202207, Month: "July", Income: 2050, Outcome: 2400, Balance: 340 },
    { id: 202208, Month: "Aug", Income: 4000, Outcome: 2400, Balance: 850 },
    { id: 202209, Month: "Sept", Income: 4000, Outcome: 2400, Balance: 1250 },
    {
      id: 202301,
      Month: "Jan",
      Income: 4000,
      Outcome: 2400,
      Balance: 1600,
    },
    { id: 202302, Month: "Feb", Income: 4000, Outcome: 4400, Balance: -200 },
    { id: 202303, Month: "Mar", Income: 3500, Outcome: 2400, Balance: 1100 },
  ];*/
  /* const gradientOffset = () => {
    const dataMax = Math.max(...datas.map((i) => i.Balance));
    const dataMin = Math.min(...datas.map((i) => i.Balance));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();*/

  useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        const userID = authUser.uid;
        const fetchData = async () => {
          /* const today = new Date(2023, 2, 8);
          const thisMonth = new Date(new Date().setMonth(today.getMonth())); //0-11, 2 = march
          const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
          const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));
          console.log(
            "TODAY IS: ",
            today,
            "THIS MONTH IS: ",
            thisMonth,
            "LAST MONTH IS: ",
            lastMonth,
            "PREVIOUS MONTH IS: ",
            prevMonth
          );

          //today = moment(today).format("L");
          console.log("TODAY IS", today);
*/
          //
          /*     const marchQ = query(
            collection(db, `${userID}expenses`),
            where("day", "<=", "2023-03-31"),
            where("day", ">", "2023-02-28")
          );

          const marchData = await getDocs(marchQ);
          // loop through and deduct 1 month each time
          //console.log(marchData.docs);
          let marchDocs = [];
          for (const marchSnapshot of marchData.docs) {
            const outcm = marchSnapshot.data().outcome;
            const incm = marchSnapshot.data().income;
            marchDocs.push({
              outcome: Number(outcm),
              income: Number(incm),
            });
          }
*/
          try {
            let augDoc = [];
            let julDoc = [];
            let junDoc = [];
            let mayDoc = [];
            let aprDoc = [];
            let marchDoc = [];

            //aug
            const augQuery = await getDocs(
              query(
                collection(db, `${userID}expenses`),
                where("day", "<=", "2024-08-31"),
                where("day", ">", "2024-07-31")
              )
            );
            augQuery.forEach((doc) => {
              const outcm = doc.data().outcome;
              const incm = doc.data().income;
              augDoc.push({
                outcome: Number(outcm),
                income: Number(incm),
              });
            });
            const augResults = augDoc.reduce(
              (total, amount) => {
                if (amount.outcome != null) {
                  return (total = {
                    outcome: total.outcome + amount.outcome,
                    income: total.income + amount.income,
                    id: uuidv4(),
                    Month: "Aug",
                  });
                }
                return total;
              },
              { outcome: 0, income: 0, id: uuidv4(), Month: "Aug" }
            );
            const augDt = {
              ...augResults,
              Balance: augResults.income - augResults.outcome,
            };
            //jul
            const julQuery = await getDocs(
              query(
                collection(db, `${userID}expenses`),
                where("day", "<=", "2024-07-31"),
                where("day", ">", "2024-06-30")
              )
            );
            julQuery.forEach((doc) => {
              const outcm = doc.data().outcome;
              const incm = doc.data().income;
              julDoc.push({
                outcome: Number(outcm),
                income: Number(incm),
              });
            });
            const julResults = julDoc.reduce(
              (total, amount) => {
                if (amount.outcome != null) {
                  return (total = {
                    outcome: total.outcome + amount.outcome,
                    income: total.income + amount.income,
                    id: uuidv4(),
                    Month: "Jul",
                  });
                }
                return total;
              },
              { outcome: 0, income: 0, id: uuidv4(), Month: "Jul" }
            );
            const julDt = {
              ...julResults,
              Balance: julResults.income - julResults.outcome,
            };
            //jun
            const junQuery = await getDocs(
              query(
                collection(db, `${userID}expenses`),
                where("day", "<=", "2024-06-30"),
                where("day", ">", "2024-05-31")
              )
            );
            junQuery.forEach((doc) => {
              const outcm = doc.data().outcome;
              const incm = doc.data().income;
              if (outcm == null && incm == null) {
                junDoc.push({
                  outcome: 0,
                  income: 0,
                });
              } else if (outcm != null || incm != null) {
                junDoc.push({
                  outcome: Number(outcm),
                  income: Number(incm),
                });
              }
            });
            console.log("jun doc", junDoc);

            const junResults = junDoc.reduce(
              (total, amount) => {
                if (amount.outcome != null || amount.income != null) {
                  return (total = {
                    outcome: total.outcome + amount.outcome,
                    income: total.income + amount.income,
                    id: uuidv4(),
                    Month: "Jun",
                  });
                }
                return total;
              },
              { outcome: 0, income: 0, id: uuidv4(), Month: "Dec" }
            );
            console.log("jun results", junResults);
            const junDt = {
              ...junResults,
              Balance: junResults.income - junResults.outcome,
            };
            //may
            const mayQuery = await getDocs(
              query(
                collection(db, `${userID}expenses`),
                where("day", "<=", "2024-05-31"),
                where("day", ">", "2024-04-30")
              )
            );
            mayQuery.forEach((doc) => {
              const outcm = doc.data().outcome;
              const incm = doc.data().income;
              mayDoc.push({
                outcome: Number(outcm),
                income: Number(incm),
              });
            });
            const mayResults = mayDoc.reduce(
              (total, amount) => {
                if (amount.outcome != null) {
                  return (total = {
                    outcome: total.outcome + amount.outcome,
                    income: total.income + amount.income,
                    id: uuidv4(),
                    Month: "May",
                  });
                }
                return total;
              },
              { outcome: 0, income: 0, id: uuidv4(), Month: "May" }
            );
            const mayDt = {
              ...mayResults,
              Balance: mayResults.income - mayResults.outcome,
            };
            //apr
            const aprQuery = await getDocs(
              query(
                collection(db, `${userID}expenses`),
                where("day", "<=", "2024-04-30"),
                where("day", ">", "2024-03-31")
              )
            );
            aprQuery.forEach((doc) => {
              const outcm = doc.data().outcome;
              const incm = doc.data().income;
              aprDoc.push({
                outcome: Number(outcm),
                income: Number(incm),
              });
            });
            const aprResults = aprDoc.reduce(
              (total, amount) => {
                if (amount.outcome != null) {
                  return (total = {
                    outcome: total.outcome + amount.outcome,
                    income: total.income + amount.income,
                    id: uuidv4(),
                    Month: "Apr",
                  });
                }
                return total;
              },
              { outcome: 0, income: 0, id: uuidv4(), Month: "Apr" }
            );
            const aprDt = {
              ...aprResults,
              Balance: aprResults.income - aprResults.outcome,
            };

            //march
            const marchQuery = await getDocs(
              query(
                collection(db, `${userID}expenses`),
                where("day", "<=", "2024-03-31"),
                where("day", ">", "2024-02-28")
              )
            );
            marchQuery.forEach((doc) => {
              const outcm = doc.data().outcome;
              const incm = doc.data().income;
              marchDoc.push({
                outcome: Number(outcm),
                income: Number(incm),
              });
            });
            const marchResults = marchDoc.reduce(
              (total, amount) => {
                if (amount.outcome != null) {
                  return (total = {
                    outcome: total.outcome + amount.outcome,
                    income: total.income + amount.income,
                    id: uuidv4(),
                    Month: "March",
                  });
                }
                return total;
              },
              { outcome: 0, income: 0, id: uuidv4(), Month: "March" }
            );
            const marchDt = {
              ...marchResults,
              Balance: marchResults.income - marchResults.outcome,
            };

            //
            setDatas([marchDt, aprDt, mayDt, junDt, julDt, augDt]);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      } else {
        console.log("not logged in");
      }
    });
    unsub1();
  }, []);

  console.log("DATAs", datas, "Datas balance", datas.Balance);
  return (
    <div className="chart">
      <div className="title">CHART</div>
      <div className="graph">
        {/*<ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={data}>
            <Bar dataKey="Income" fill="#8884d8" />
          </BarChart>
  </ResponsiveContainer>*/}
        <ResponsiveContainer aspect={aspect}>
          <BarChart
            width={500}
            height={400}
            data={datas}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month" />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke="#000" />
            <Bar
              dataKey="Balance"
              fill={
                datas.Balance < 0
                  ? "red"
                  : datas.Balance > 0
                  ? "green"
                  : "rgba(0, 128 ,0 , .45)"
              }
            />
          </BarChart>
        </ResponsiveContainer>

        {/* <ResponsiveContainer aspect={aspect}>
          <AreaChart
            width={500}
            height={400}
            data={datas}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month" />
            <YAxis />
            <Tooltip />
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="green" stopOpacity={0.5} />
                <stop offset={off} stopColor="red" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="Balance"
              stroke="gray"
              fill="url(#splitColor)"
            />
          </AreaChart>
          </ResponsiveContainer>*/}
      </div>
    </div>
  );
};

export default Chart;
