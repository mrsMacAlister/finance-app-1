import "./addLoan.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AddLoan = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState("");
  const [deadline, setDeadline] = useState("");
  // const [percentage, setPercentage] = useState(null);

  const handleAdd = async (event) => {
    event.preventDefault();
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;

          //setPercentage();
          const res = await addDoc(collection(db, `${userID}loans`), {
            title: title,
            amount: amount,
            paid: paid,
            percentage: (paid / amount) * 100,
            deadline: deadline,
          });
          navigate("/loans");
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div className="addLoan">
      <Sidebar />
      <div className="addLoanContainer">
        <Navbar />
        <div className="heading">
          <h2>Add a loan</h2>
        </div>
        <div className="bottom">
          <form onSubmit={handleAdd}>
            <div className="formContainer">
              <div className="inputs">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  required="required"
                  placeholder="What are you paying off?"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="inputs">
                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  required="required"
                  placeholder="How much do you have to pay off?"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="inputs">
                <label htmlFor="paid">Paid off:</label>
                <input
                  type="number"
                  required="required"
                  placeholder="How much have you paid off thus far?"
                  id="paid"
                  value={paid}
                  onChange={(e) => setPaid(e.target.value)}
                />
              </div>
              <div className="inputs">
                <label htmlFor="deadline">Deadline:</label>
                <input
                  type="date"
                  required="required"
                  id="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLoan;
