import React from 'react'
import GoalTracking from "./pages/PremiumFeatures/GoalTracking"
import IncomeTracker from './pages/IncomeTracker/IncomeTracker'
import ExpenseTracker from './pages/ExpenseTracker/ExpenseTracker'
const App = () => {
  return (
    <>
    <IncomeTracker />
    <ExpenseTracker />
    <GoalTracking />
    
    </>
  )
}

export default App