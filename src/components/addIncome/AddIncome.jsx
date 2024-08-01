import React, { useState, useEffect } from "react";
//import { AppContext } from "../../context/AppContext";
import { auth, db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
//import { onAuthStateChanged } from "firebase/auth";
import "./addIncome.scss";

const AddIncome = () => {
  // const { dispatch } = useContext(AppContext);
  const [paymentM, setPaymentM] = useState([]);
  const [day, setDay] = useState("");
  const [description, setDescription] = useState("");
  //const [category, setCategory] = useState(null);
  const [method, setMethod] = useState("visa");
  const [income, setIncome] = useState("");

  const resetValues = () => {
    setDay("");
    setDescription("");
    //setCategory(null);
    setMethod("");
    setIncome("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(day, description, method, income);
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;

          const res = await addDoc(collection(db, `${userID}expenses`), {
            //id: uuidv4(),
            day: day,
            description: description,
            category: null,
            method: method,
            income: income,
            outcome: null,
          });
          console.log(res);
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
          let listpay = [];
          try {
            const queryPaymentM = await getDocs(
              collection(db, `${userID}payments`)
            );

            queryPaymentM.forEach((doc) => {
              listpay.push({ id: doc.id, ...doc.data() });
            });
            //console.log(listpay);
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

  return (
    <div className="addIncome">
      <h2 className="title">ADD INCOME</h2>
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
          <select
            id="category"
            disabled
            //required="required"
            //onChange={(e) => setCategory(e.target.value)}
          >
            <option value=""></option>
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
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
export default AddIncome;
