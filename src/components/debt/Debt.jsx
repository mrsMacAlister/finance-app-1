import "./debt.scss";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css";

const Debt = () => {
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
              collection(db, `${userID}loans`)
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

  return (
    <div className="debt">
      <div className="title">DEBT</div>

      <div className="carousel">
        <Swiper
          className="swiper"
          spaceBetween={10}
          slidesPerView={1}
          slidesPerGroup={1}
          grabCursor={true}
          pagination={true}
          modules={[Pagination]}
          //onSlideChange={() => console.log("slide change")}
          //onSwiper={(swiper) => console.log(swiper)}
        >
          <div className="slide-container">
            {data.map((dt) => {
              return (
                <SwiperSlide className="swiper-slide" key={dt.id}>
                  <div className="loan-item">
                    <div className="loan-amount">
                      <div className="amount">
                        {dt.paid} € / {dt.amount} €
                      </div>
                    </div>
                    <div className="loan-details">
                      <div className="title">{dt.title}</div>
                      <div className="loan-deadline">
                        Deadline: {dt.deadline}
                      </div>
                      <div className="progressbar-container">
                        <CircularProgressbar
                          className="progressbar"
                          value={dt.percentage}
                          text={dt.percentage.toFixed(0) + " %"}
                          strokeWidth={8}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Debt;
