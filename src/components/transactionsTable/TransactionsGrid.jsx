import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
//import { useDemoData } from "@mui/x-data-grid-generator";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
//import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
//import { onAuthStateChanged } from "firebase/auth";
import "./transactionsGrid.scss";
//import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const TransactionsGrid = () => {
  //console.log(auth.currentUser);

  const { columns } = useContext(AppContext);

  const [pageSize, setPageSize] = React.useState(25);

  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub1 = auth.onAuthStateChanged((authUser) => {
      unsub1();
      if (authUser) {
        // logged in, use authObj
        //console.log("HELLOOOOOOO", authUser);
        const userID = authUser.uid;
        //console.log("userID HEREEEE", userID);
        /*
        const fetchData = async () => {
          let list = [];
          try {
            const querySnapshot = await getDocs(
              collection(db, `${userID}expenses`)
            );
            querySnapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
              //console.log(doc.id, " => ", doc.data());
            });
            setData(list);
            console.log(list);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();*/

        //LISTEN (REAL-TIME DATA FETCHING)
        const unsub2 = onSnapshot(
          collection(db, `${userID}expenses`),
          (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
              list.unshift({ id: doc.id, ...doc.data() });
            });
            setData(list);
            //console.log("Current data: ", doc.data());
          },
          (error) => {
            console.log(error);
          }
        );
        return () => {
          //a cleanup function
          unsub2();
        };
      } else {
        // not logged in
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
          // console.log("HERE AGAIN!", userID);

          await deleteDoc(doc(db, `${userID}expenses`, id));
          setData(data.filter((item) => item.id !== id));
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Delete",
      width: 60,
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteForeverOutlinedIcon />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="transactionsGrid">
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          initialState={{
            sorting: {
              sortModel: [{ field: "day", sort: "desc" }],
            },
          }}
          rows={data}
          columns={columns.concat(actionColumn)}
          pageSize={pageSize}
          //rowsPerPageOptions={[10, 25, 50]}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          //pagination
          //checkboxSelection
          //disableSelectionOnClick
          //experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
};

/*<div style={{ height: 400, width: "100%" }}>
        <DataGrid
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          pagination
          {...data}
        />
      </div> */
export default TransactionsGrid;
