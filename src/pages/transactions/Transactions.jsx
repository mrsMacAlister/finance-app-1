import "./transactions.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
//import TransactionsTable from "../../components/transactionsTable/TransactionsTable";
//import Widget from "../../components/widget/Widget";
//import TransactionsW from "../../components/transactionW/TransactionW";
import Widget from "../../components/widget/Widget";
import AddExpense from "../../components/addExpense/AddExpense";
import AddIncome from "../../components/addIncome/AddIncome";
import PieExpenses from "../../components/pieExpenses/PieExpenses";
import TransactionsGrid from "../../components/transactionsTable/TransactionsGrid";
//import Category from "../../components/category/Category";
import CategoryList from "../../components/categoryList/CategoryList";
//import transactionsRows from "../../components/transactionsRows/transactionsRows";
/*

*/
/*function createData(date, description, category, method, income, outcome) {
  return { date, description, category, method, income, outcome };
}*/

/*const rows = [
  createData("05 / 08 / 2023", "Frozen yoghurt", "food", "card", 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];*/

const Transactions = () => {
  //const { rows } = useContext(AppContext);

  return (
    <div className="transactions">
      <Sidebar />
      <div className="transactionsContainer">
        <Navbar />
        <div className="main">
          <div className="top">
            <div className="left">
              <div className="left-top">
                <Widget type="balance" />
                <div className="left-top-bottom">
                  <Widget type="outcome" className="widget-top" />
                  <Widget type="income" />
                </div>
              </div>
              <div className="left-bottom">
                <AddExpense />
                <AddIncome />
              </div>
            </div>
            <div className="right">
              <div className="overlay">
                <p>
                  This section is still <br />
                  under construction.
                  <br /> Check again later.
                </p>
              </div>
              <div className="pie-chart">
                <h3 className="title">EXPENSES</h3>
                <PieExpenses />
              </div>
              <CategoryList />
            </div>
          </div>
          <div className="bottom">
            <h2 className="title">MY TRANSACTIONS</h2>
            <TransactionsGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

/*

*/
