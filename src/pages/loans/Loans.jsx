import "./loans.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
//import Debt from "../../components/debt/Debt";
import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDocs, collection, deleteDoc } from "firebase/firestore";

const Loans = () => {
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        const userID = authUser.uid;
        const fetchData = async () => {
          let list = [];
          try {
            const querySnapshot = await getDocs(
              collection(db, `${userID}loans`)
            );
            querySnapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            /*
            onst paidQuery = query(
              collection(db, `${userID}loans`),
              where("amount", "!=", "")
            );
            const paidQueryData = await getDocs(paidQuery);

            console.log("PAID QUERY DATA", paidQueryData);
            const paidOff = parseInt(data.paid);
            const amountToPay = parseInt(data.amount);*/
            setData(list);
            //setPercentage((data.paid / data.amount) * 100);
            console.log(list);
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

  //console.log(data);
  const handleDelete = (id) => {
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;

          await deleteDoc(doc(db, `${userID}loans`, id));
          setData(data.filter((item) => item.id !== id));
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  ////

  return (
    <div className="loans">
      <Sidebar />
      <div className="loansContainer">
        <Navbar />
        <div className="heading">
          <h2>My Debt Being Paid Off</h2>
          <Link to="/loans/add-loan" className="link">
            <div className="addBtn">Add New</div>
          </Link>
        </div>
        <div className="loan-items">
          {data.map((dt) => {
            return (
              <div className="loan-item" key={dt.id}>
                <DeleteForeverOutlinedIcon
                  className="delete"
                  onClick={() => handleDelete(dt.id)}
                />
                <div className="title">{dt.title}</div>
                <div className="amounts">
                  <div className="amount">To pay off: {dt.amount} €</div>
                  <div className="paid">Already paid off: {dt.paid} €</div>
                </div>
                <div className="progressbar">
                  <CircularProgressbar
                    value={dt.percentage}
                    text={dt.percentage.toFixed(0) + " %"}
                    strokeWidth={5}
                  />
                </div>
                <div className="deadline">Deadline: {dt.deadline}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Loans;
