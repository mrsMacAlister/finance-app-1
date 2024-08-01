import "./paymentM.scss";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const PaymentM = () => {
  const [method, setMethod] = useState("");

  const [payment, setPayment] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;

          const res = await addDoc(collection(db, `${userID}payments`), {
            paymentM: method,
          });
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    });
    setMethod("");
  };

  //PAYMENT METHOD LIST
  useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        const userID = authUser.uid;
        //LISTEN (REAL-TIME DATA FETCHING)
        const unsub2 = onSnapshot(
          collection(db, `${userID}payments`),
          (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setPayment(list);
          },
          (error) => {
            console.log(error);
          }
        );
        return () => {
          unsub2();
        };
      } else {
        console.log("not logged in");
      }
    });

    unsub1();
  }, []);

  console.log(payment);
  const handleDelete = (id) => {
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;

          await deleteDoc(doc(db, `${userID}payments`, id));
          setPayment(payment.filter((item) => item.id !== id));
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div className="payment-method">
      <div className="main">
        <div className="left">
          <h3>Add payment method</h3>

          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <label htmlFor="method">Payment method: </label>
              <input
                type="text"
                maxLength={15}
                placeholder="Payment method"
                required="required"
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">
              Add
            </button>
          </form>
        </div>
        <div className="right">
          <h3>My payment methods</h3>
          <ul className="payments-list">
            {payment.map((pay) => (
              <li className="payments" key={pay.id}>
                <div className="payment-item">{pay.paymentM}</div>
                <div
                  className="delete-button"
                  onClick={() => handleDelete(pay.id)}
                >
                  <HighlightOffIcon />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentM;
