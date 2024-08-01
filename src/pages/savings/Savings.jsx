import "./savings.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
//import SavingsW from "../../components/savingsW/SavingsW";
//import SavingsGoal from "../../components/savingsGoal/SavingsGoal";
import { Link } from "react-router-dom";

//import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
//import NorthernLights from "../../visuals/northern-lights.jpeg";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDocs, collection, deleteDoc } from "firebase/firestore";

const Savings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        const userID = authUser.uid;
        const fetchData = async () => {
          let list = [];
          try {
            const querySnapshot = await getDocs(
              collection(db, `${userID}savings`)
            );
            querySnapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setData(list);
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

  const handleDelete = (id) => {
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;

          await deleteDoc(doc(db, `${userID}savings`, id));
          setData(data.filter((item) => item.id !== id));
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  //

  return (
    <div className="savings">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="savingsContainer">
          <div className="heading">
            <h2>My Goals & Dreams, My Savings</h2>
            <Link to="/savings/add-savings" className="link">
              <div className="addBtn">Add New</div>
            </Link>
          </div>
          <div className="top">
            <div className="savingsW">
              {data.map((dt) => (
                <div className="widget" key={dt.id}>
                  <div className="title">{dt.title}</div>
                  <div className="amount">{dt.amount}</div>
                  <div className="deadline">by {dt.deadline}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bottom">
            <div className="savgGoal">
              {data.map((dt) => {
                return (
                  <div className="savingsGoal" key={dt.id}>
                    <div className="goalAmount">
                      <div className="amount">{dt.amount} €</div>
                    </div>
                    <div className="goalDetails">
                      <DeleteForeverOutlinedIcon
                        className="delete"
                        onClick={() => handleDelete(dt.id)}
                      />
                      <div className="goalCore">
                        <div className="title">{dt.title}</div>
                        <div className="deadline">by {dt.deadline}</div>
                        <img src={dt.img} alt="" className="image" />
                        <div className="description">{dt.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/*  <div className="savingsGoal">
                <div className="goalAmount">
                  <div className="amount">100 € / 5.000 €</div>
                </div>
                <div className="goalDetails">
                  <EditOutlinedIcon className="edit" />
                  <div className="goalCore">
                    <div className="title">Norhtern Lights in Finland</div>
                    <div className="deadline">by September 2023</div>
                    <img src={NorthernLights} alt="" className="image" />
                    <div className="progress">progress "epruveta"</div>
                    <div className="description">
                      <strong>
                        How much do I want to put aside and how often
                      </strong>
                      Description a.k.a. more details on the goal
                    </div>
                  </div>
                  <div className="japaneseSaving">
                    Savings plan Japanese style (optional & for later)
                  </div>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;
