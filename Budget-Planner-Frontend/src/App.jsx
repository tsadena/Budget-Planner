import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import IncomeTracker from "./pages/IncomeTracker/IncomeTracker";
import ExpenseTracker from "./pages/ExpenseTracker/ExpenseTracker";
import GoalTracking from "./pages/PremiumFeatures/GoalTracking";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/income" element={<IncomeTracker />} />
          <Route path="/expense" element={<ExpenseTracker />} />
          <Route path="/goal-tracking" element={<GoalTracking />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
