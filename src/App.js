import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Transactions from "./pages/transactions/Transactions";
import Budgeting from "./pages/budgeting/Budgeting";
import Savings from "./pages/savings/Savings";
import AddSavings from "./pages/addSavings/AddSavings";
import Loans from "./pages/loans/Loans";
import AddLoan from "./pages/addLoan/AddLoan";
import Investments from "./pages/investments/Investments";
import Calendar from "./pages/calendar/Calendar";
import Resources from "./pages/resources/Resources";

import { useContext } from "react";
import { AppProvider } from "./context/AppContext";
import { AuthContext } from "./context/AuthContext";
import Settings from "./pages/settings/Settings";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  //console.log(currentUser);

  return (
    <AppProvider>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />} />
              <Route
                index
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="transactions"
                element={
                  <RequireAuth>
                    <Transactions />
                  </RequireAuth>
                }
              />
              <Route
                path="budgeting"
                element={
                  <RequireAuth>
                    <Budgeting />
                  </RequireAuth>
                }
              />
              <Route
                path="savings"
                element={
                  <RequireAuth>
                    <Savings />
                  </RequireAuth>
                }
              />
              <Route
                path="savings/add-savings"
                element={
                  <RequireAuth>
                    <AddSavings />
                  </RequireAuth>
                }
              />
              <Route
                path="loans"
                element={
                  <RequireAuth>
                    <Loans />
                  </RequireAuth>
                }
              />
              <Route
                path="loans/add-loan"
                element={
                  <RequireAuth>
                    <AddLoan />
                  </RequireAuth>
                }
              />
              <Route
                path="investments"
                element={
                  <RequireAuth>
                    <Investments />
                  </RequireAuth>
                }
              />
              <Route
                path="calendar"
                element={
                  <RequireAuth>
                    <Calendar />
                  </RequireAuth>
                }
              />
              <Route
                path="resources"
                element={
                  <RequireAuth>
                    <Resources />
                  </RequireAuth>
                }
              />
              <Route
                path="settings"
                element={
                  <RequireAuth>
                    <Settings />
                  </RequireAuth>
                }
              />
              <Route>
                <Route />
              </Route>
              <Route />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
