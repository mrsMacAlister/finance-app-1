import "./categoryList.scss";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

const CategoryList = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        const userID = authUser.uid;
        const fetchData = async () => {
          let list = [];
          try {
            const querySnapshot = await getDocs(
              collection(db, `${userID}category`)
            );
            querySnapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setCats(list);
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
    <div className="category-list">
      <h4>My categories</h4>
      <div className="category-items-container">
        <div className="category-items">
          {cats.map((cat) => (
            <div className="category-item" key={cat.id}>
              <div
                className="category-color"
                style={{ background: cat.catColor }}
              ></div>
              <div className="category-name">{cat.catName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
