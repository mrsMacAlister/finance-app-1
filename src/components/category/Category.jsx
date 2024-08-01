import "./category.scss";
import Circle from "@uiw/react-color-circle";
//https://uiwjs.github.io/react-color/#/circle
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

const Category = () => {
  const [hex, setHex] = useState("#f44336");

  const [category, setCategory] = useState("");

  const [cats, setCats] = useState([]);

  const resetValues = () => {
    setHex("#f44336");
    setCategory("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;

          await addDoc(collection(db, `${userID}category`), {
            catColor: hex,
            catName: category,
          });
          //console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    });
    resetValues();
  };

  //CATEGORY LIST
  useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        const userID = authUser.uid;
        //LISTEN (REAL-TIME DATA FETCHING)
        const unsub2 = onSnapshot(
          collection(db, `${userID}category`),
          (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setCats(list);
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
          //console.log("HERE AGAIN!", userID);

          await deleteDoc(doc(db, `${userID}category`, id));
          setCats(cats.filter((item) => item.id !== id));
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div className="category">
      <div className="main">
        <div className="left">
          <h3>Add category</h3>
          <div className="color-pick">
            <Circle
              className="circle"
              style={{ margin: "20px", width: "fill" }}
              colors={[
                "#f44336",
                "#e91e63",
                "#9c27b0",
                "#673ab7",
                "#3f51b5",
                "#2196f3",
                "#03a9f4",
                "#00bcd4",
                "#009688",
                "#4caf50",
                "#8bc34a",
                "#cddc39",
                "#ffeb3b",
                "#ffc107",
                "#ff9800",
                "#ff5722",
                "#795548",
                "#607d8b",
              ]}
              color={hex}
              onChange={(color) => {
                setHex(color.hex);
              }}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <label htmlFor="category">Category: </label>
              <input
                type="text"
                maxLength={15}
                placeholder="Category"
                required="required"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">
              Add
            </button>
          </form>
        </div>
        <div className="right">
          <h3>My categories</h3>
          <div className="cat-list">
            {cats.map((cat) => (
              <div className="cat" key={cat.id}>
                <div className="cat-item">
                  <div
                    className="cat-color"
                    style={{ background: cat.catColor }}
                  ></div>
                  <div className="cat-name">{cat.catName}</div>
                </div>
                <div
                  className="delete-button"
                  onClick={() => handleDelete(cat.id)}
                >
                  <HighlightOffIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
