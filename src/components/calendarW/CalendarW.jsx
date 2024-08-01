import "./calendarW.scss";
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

const CalendarW = () => {
  const [day, setDay] = useState("");
  const [description, setDescription] = useState("");
  const [importantDay, setImportantDay] = useState([]);

  importantDay.sort(
    (a, b) =>
      new Date(...a.day.split("/").reverse()) -
      new Date(...b.day.split("/").reverse())
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;

          const res = await addDoc(collection(db, `${userID}importantDays`), {
            day: day,
            description: description,
          });
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    });
    setDay("");
    setDescription("");
  };

  //PAYMENT METHOD LIST
  useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        const userID = authUser.uid;
        //LISTEN (REAL-TIME DATA FETCHING)
        const unsub2 = onSnapshot(
          collection(db, `${userID}importantDays`),
          (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setImportantDay(list);
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

  const handleDelete = (id) => {
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;

          await deleteDoc(doc(db, `${userID}importantDays`, id));
          setImportantDay(importantDay.filter((item) => item.id !== id));
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div className="calendarW">
      <div className="top">
        <div className="title">IMPORTANT DATES</div>
      </div>
      <div className="bottom">
        <div className="dates-list">
          {importantDay.map((day) => (
            <div className="items" key={day.id}>
              <div className="item">
                <div className="item-date">{day.day}</div>
                <div className="item-title">{day.description}</div>
              </div>
              <div
                className="delete-button"
                onClick={() => handleDelete(day.id)}
              >
                <HighlightOffIcon style={{ height: "15px" }} />
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            required="required"
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />

          <input
            type="text"
            //maxLength={15}
            placeholder="Description"
            required="required"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="submit-button">
            +
          </button>
        </form>
      </div>
    </div>
  );
};

export default CalendarW;
