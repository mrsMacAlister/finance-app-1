import React from "react";
import "./addSavings.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
//
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddSavings = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  //const [data, setData] = useState({});
  const [percentage, setPercentage] = useState(null);
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  /*const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };
*/
  //console.log(data);
  console.log(file);

  const handleAdd = async (event) => {
    event.preventDefault();
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      unsub();
      if (authUser) {
        try {
          const userID = authUser.uid;

          const res = await addDoc(collection(db, `${userID}savings`), {
            img: img,
            title: title,
            amount: amount,
            deadline: deadline,
            description: description,
          });
          navigate("/savings");
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        const userID = authUser.uid;
        const uploadFile = () => {
          const name = new Date().getTime() + file.name;
          const storageRef = ref(storage, `${userID}/images` + name);
          console.log(name);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              setPercentage(progress);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImg(downloadURL);
                console.log("File available at", downloadURL);
              });
            }
          );
        };
        file && uploadFile();
      } else {
        console.log("not logged in");
      }
    });
    //LISTEN (REAL-TIME DATA FETCHING)
    /*   const unsub2 = onSnapshot(
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
   });*/
    unsub1();
  }, [file]);

  return (
    <div className="addSavings">
      <Sidebar />
      <div className="addSavingsContainer">
        <Navbar />
        <div className="heading">
          <h2>Add new savings</h2>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
              }
              alt=""
              className="image"
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formContainer">
                <div className="inputs">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    required="required"
                    placeholder="What are you saving for?"
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
                    placeholder="How much would you like to save?"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
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
                <div className="inputs">
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    placeholder="Visualise it"
                    required="required"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="inputs">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <button
                disabled={percentage !== null && percentage < 100}
                type="submit"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSavings;
