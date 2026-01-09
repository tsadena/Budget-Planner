import React from 'react'
import GoalTracking from "./pages/PremiumFeatures/GoalTracking"
import IncomeTracker from './pages/IncomeTracker/IncomeTracker'
import ExpenseTracker from './pages/ExpenseTracker/ExpenseTracker'
import DashboardPage from './pages/Dashboard/DashboardPage'
const App = () => {
  return (
    <>
    <DashboardPage />
    <IncomeTracker />
    <ExpenseTracker />
    <GoalTracking />
    
    </>
  )
}

export default App