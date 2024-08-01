import React, { useState, useEffect } from "react";
//import { AppContext } from "../../context/AppContext";
import "./addExpense.scss";
import { auth, db } from "../../firebase";
import { getDocs, addDoc, collection } from "firebase/firestore";
//import { onAuthStateChanged } from "firebase/auth";
//import moment from "moment";

const AddExpense = () => {
  //const { dispatch } = useContext(AppContext);
  const [cats, setCats] = useState([]);
  const [paymentM, setPaymentM] = useState([]);
  const [day, setDay] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [catColor, setCatColor] = useState("");
  const [method, setMethod] = useState("");
  const [outcome, setOutcome] = useState("");

  const resetValues = () => {
    setDay("");
    setDescription("");
    setCategory("");
    setMethod("");
    setOutcome("");
  };
  /*const onChangeDate = e => {
    const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
    setValue(newDate);
    console.log(newDate); //value picked from date picker
  };
*/

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(day, description, category, method, outcome);
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;

          await addDoc(collection(db, `${userID}expenses`), {
            day: day, //moment(day).format("DD/MM/YYYY"),
            description: description,
            category: category,
            catColor: catColor,
            method: method,
            income: null,
            outcome: outcome,
          });
          // console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    });
    resetValues();
  };

  useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        const userID = authUser.uid;

        const fetchData = async () => {
          let listcat = [];
          let listpay = [];
          try {
            const queryCats = await getDocs(
              collection(db, `${userID}category`)
            );
            const queryPaymentM = await getDocs(
              collection(db, `${userID}payments`)
            );
            queryCats.forEach((doc) => {
              listcat.push({ id: doc.id, ...doc.data() });
            });
            queryPaymentM.forEach((doc) => {
              listpay.push({ id: doc.id, ...doc.data() });
            });
            setCats(listcat);
            //console.log(listcat, listpay);
            setPaymentM(listpay);
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

  //console.log(category, method);

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setCatColor(e.target.querySelector("data").value);
  };

  return (
    <div className="addExpense">
      <h2 className="title"> ADD EXPENSE</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <label htmlFor="day">Date:</label>
          <input
            type="date"
            required="required"
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            placeholder="Description"
            required="required"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label htmlFor="category">Category:</label>
          <select id="category" required="required" onChange={handleCategory}>
            <option value=""></option>
            {cats.map((cat) => {
              return (
                <option value={cat.catName} name={cat.catColor} key={cat.id}>
                  <data className="span" value={cat.catColor}>
                    {cat.catName}
                  </data>
                </option>
              );
            })}
          </select>
        </div>
        <div className="inputs">
          <label htmlFor="method">Payment method:</label>
          <select
            id="method"
            required="required"
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value=""></option>
            {paymentM.map((payM) => {
              return (
                <option value={payM.paymentM} key={payM.id}>
                  {payM.paymentM}
                </option>
              );
            })}
          </select>
        </div>
        <div className="inputs">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            step="any"
            required="required"
            id="amount"
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddExpense;
