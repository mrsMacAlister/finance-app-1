import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
//import {  Sector } from "recharts";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
//import {  docs,  onSnapshot,} from "firebase/firestore";
//import { ErrorOutlineSharp } from "@mui/icons-material";

const PieExpenses = () => {
  const [cats, setCats] = useState([]);
  /*  const [expenses, setExpenses] = useState([]);
  //const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [colors, setColors] = useState([]);
  const [outcome, setOutcome] = useState([]);
  const [income, setIncome] = useState([]);
*/
  useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        const userID = authUser.uid;
        const fetchData = async () => {
          try {
            const categories = query(
              collection(db, `${userID}expenses`),
              where("category", "!=", null)
            );
            const querySnapshotC = await getDocs(categories);

            let categoryName = [];
            for (const documentSnapshotC of querySnapshotC.docs) {
              //const category = documentSnapshotC.data();

              //  console.log("category data()", category);
              categoryName.push({
                category: documentSnapshotC.data().category,
              });
            }
            //  console.log(categoryName);
            let list6 = [];
            categoryName.map((cat) => {
              //  console.log("well hello there", cat.category);
              const fetchExpenses = async () => {
                //console.log("FETCH EXPENSE CAT HERE", cat);
                try {
                  const expenses = query(
                    collection(db, `${userID}expenses`),
                    where("category", "==", cat.category)
                  );
                  const querySnapshotE = await getDocs(expenses);
                  let outcome = [];
                  for (const documentSnapshotE of querySnapshotE.docs) {
                    //const expense = documentSnapshotE.data();

                    //console.log("expense data()", expense);
                    outcome.push({
                      amount: documentSnapshotE.data().outcome,
                      category: documentSnapshotE.data().category,
                      catColor: documentSnapshotE.data().catColor,
                    });
                  }
                  //console.log("OUTCOME", outcome);
                  const totalExpenses = outcome.reduce((total, number) => {
                    let amount = Number(number.amount);
                    return total + amount;
                  }, 0);

                  //console.log(totalExpenses);

                  list6.push({
                    totalExpense: totalExpenses,
                    category: outcome.category,
                    catColor: outcome.catColor,
                  });
                  /* const lolz = outcome.reduce(
                    (total, number) => ({
                      amount: total.amount + number.amount,
                    }),
                    0
                  );*/

                  //console.log(lolz);
                  /*
                  list6.push({
                    catName: cat.category,
                    totalOutcome: totalExpenses,
                  });*/
                } catch (err) {
                  console.log(err);
                }
              };
              fetchExpenses();
              return 1;
            });
            //console.log("LIST 6", list6);
            /* querySnapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });*/

            //console.log("LIST 6", list6);
            setCats(categoryName);
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

  // console.log(cats);

  /* useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        const userID = authUser.uid;
        const unsub2 = onSnapshot(
          collection(db, `${userID}expenses`),
          where("category", "!=", null),
          (snapshot) => {
            let list1 = [];
            snapshot.docs.forEach((doc) => {
              list1.push({ id: doc.id, ...doc.data() });
            }, setCats(list1));
            console.log(list1);
          },
          (error) => {
            console.log(error);
          }
        );
        const unsub3 = onSnapshot();
        return () => {
          unsub2();
        };
      } else {
        console.log("not logged in");
      }
    });
    unsub1();
  }, []);
*/
  // console.log(cats);

  /* const categoryExpense = expenses.map((expense) => {
    let list3 = [];
    cats.map((cat) => {
      let list4 = [];
      if (expense.category == cat.catName) {
        list4.push(parseInt(expense.outcome));
        //console.log("THIS THING WORKS!");
        const totalOutcome = list4.reduce((total, item) => {
          return (total += item);
        }, 0);
        list3.push(totalOutcome);
      } else {
        //console.log("cats not the same");
        return;
      }
      //console.log(list4, "total outcome", totalOutcome);

      //setDatas(...datas, totalOutcome);
    });
    console.log(list3);
    //console.log("expense map", expense);
  });
*/
  //categoryExpense();

  //

  /* useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;
          const fetchData = async () => {
            let outcomeList = [];
            let incomeList = [];
            let catsList = [];

            const querySnapshot = await getDocs(
              collection(db, `${userID}category`)
            );
            querySnapshot.forEach((doc) => {
              catsList.push({ id: doc.id, ...doc.data() });
            });
            setCats(catsList);
            console.log(cats);
            const outcomeQuery = query(
              collection(db, `${userID}expenses`),
              where("outcome", "!=", null)
              //where("category", "==", cat)
            );

            const outcomeQ = await getDocs(outcomeQuery);
            cats.map((cat) => {
              let outcomesList = [];
              outcomeQ.forEach((doc) => {
                console.log(doc.data().category);*/
  ////

  /* if (doc.data().category == cat.catName) {
                  const outc = { id: doc.id, outcome: doc.data().outcome };
                  outcomesList.push(parseFloat(outc.outcome, 10));
                  console.log("cat is inside thee expenses");
                } else {
                  console.log("error");
                }
              });
              // console.log("outcome list", outcomeList);
              const totalOutcome = outcomeList.reduce((total, item) => {
                return total + item;
              }, 0);

              //console.log("Total OUTCOME", totalOutcome);
              setOutcome(totalOutcome);
            });

            //let outcomes = cats.map((cat) => {});
            /*  const outcomeQuery = query(
              collection(db, `${userID}expenses`),
              where("outcome", "!=", null),
              where("category", "==", cat)
            );

            const outcomeQ = await getDocs(outcomeQuery);
            //MAP THORUGH CATEGORIES
            outcomeQ.forEach((doc) => {
           
              const outc = { outcome: doc.data().outcome };
              outcomeList.push(parseFloat(outc.outcome, 10));
            });

            const outcomes = cats.map();

           // console.log("testing outcome query", outcomeList);
            //console.log("outcome list", outcomeList);
            const totalOutcome = outcomeList.reduce((total, item) => {
              return total + item;
            }, 0);

            //console.log("Total OUTCOME", totalOutcome);
            setOutcome(totalOutcome);
*/
  /*  const incomeQuery = query(
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

            //console.log("Total INCOME", totalIncome);
            setIncome(totalIncome);
          };
          fetchData();
        } catch (err) {
          console.log(err);
        }
      }
    });
  }, []);*/

  //////////////////////
  /* useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        const userID = authUser.uid;
        const unsub2 = onSnapshot(
          collection(db, `${userID}category`),
          (snapshot) => {
            let list1 = [];
            snapshot.docs.forEach((doc) => {
              list1.push({ id: doc.id, ...doc.data() });
            });
            setCats(list1);
          },
          (error) => {
            console.log(error);
          }
        );
        const q = query(
          collection(db, `${userID}expenses`),
          where("outcome", "!=", null)
        );
        const unsub3 = onSnapshot(
          q,
          (querySnapshot) => {
            let list2 = [];
            querySnapshot.docs.forEach((doc) => {
              console.log(doc.data().category, "doc category");
*/

  /*    cats.map((cat) => {
                let list3 = [];
                console.log(cat.catName);
                if (doc.data().category == cat.catName) {
                  console.log("cats map is working");
                  list3.push(doc.data().outcome);
                }
                console.log("this is outcome  map", list3);
                const categoryOutcome = list3.reduce((total, item) => {
                  return total + item;
                }, 0);
                setDatas(...datas, categoryOutcome);
                console.log("DATASS", datas);
              });*/
  /*   list2.push({ id: doc.id, ...doc.data() });
              //console.log("IT WORKS!!", doc.data());
            });
            setExpenses(list2);
          },*/
  /*
          (snapshot) => {
            let list2 = [];
            cats.map((cat) => {
              snapshot.docs.forEach((doc) => {
                if (doc.data().category === cat.catName) {
                  list2.push({ id: doc.id, ...doc.data() });
                  console.log("somehow it works");
                } else {
                  console.log("try ");
                }
              });
              setDatas(list2);
            });
            console.log("datas here", datas);*/
  /*       (error) => {
            console.log(error);
          }
        );

        return () => {
          unsub2();
          unsub3();
        };
      } else {
        console.log("not logged in");
      }
    });
    unsub1();
  }, []);*/

  ////

  console.log("cats here", cats);

  //console.log("expenses here", expenses);
  //
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width={200} height={210}>
      <PieChart margin={0}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              //onMouseEnter={(style = { color: "red" })}
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieExpenses;
