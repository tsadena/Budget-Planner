import React,{useState,useEffect} from "react";
import AddGoal from "./AddGoal";
import GoalItem from "./GoalItem";

const App = () => {

  const [goals,setGoals] = useState([])
  const [showAdd, setShowAdd] = useState(false)

  function addGoal(goal) {
    setGoals((g)=> [{...goal , id: UniqueId()}, ...g])
    setShowAdd(false)
  }

  function updateGoal(id, amount) {
    setGoals((g)=> g.map(x => (x.id === id)? {...x, currentAmount: Number(amount)}: x))
  }
  
  function deleteGoal(id) {
    setGoals((g) => g.filter(x => x.id !== id));
  }
  
  function UniqueId() {
    return Math.random().toString().slice(2,10)
  }
  return (
    <>
    <h1>Goal Tracking</h1>
    <button onClick={()=> setShowAdd(true)}>Add Goal</button>
    <div>
      {goals.map(goal =>
        <GoalItem 
        key={goal.id}
        goal ={goal}
        onUpdate={updateGoal}
        onDelete={deleteGoal}
        />
      )}
    </div>
    <div>
      {goals.length === 0 && ( <div>
        <p>No Tasks added yet. Click the add Goal button ot add one</p>
      </div> )}
    </div>
    <div>
      {showAdd && <AddGoal 
      onAdd = {addGoal}
      onCancel = {()=> setShowAdd(false)} />}
    </div>
    </>
  )
}





export default App






















































// import React, { useState, useEffect } from "react";



// export default function GoalsPage() {
//   const [goals, setGoals] = useState(sampleGoals());
//   const [showAdd, setShowAdd] = useState(false);

//   useEffect(() => {
//     document.title = "Bulga — Goal Tracking";
//   }, []);

//   function addGoal(goal) {
//     setGoals((g) => [{ ...goal, id: cryptoId() }, ...g]);
//     setShowAdd(false);
//   }

//   function updateGoalAmount(id, amount) {
//     setGoals((g) => g.map(x => x.id === id ? { ...x, currentAmount: Number(amount) } : x));
//   }

//   function deleteGoal(id) {
//     setGoals((g) => g.filter(x => x.id !== id));
//   }

//   return (
//     <div >
//       <div >
//         <div>
//           <h1 >Goal Tracking <span >Premium</span></h1>
//           <div >
//             <button onClick={() => setShowAdd(true)} >+ Add Goal</button>
//           </div>
//         </div>

//         <div >
//           {goals.map(goal => (
//             <GoalItem
//               key={goal.id}
//               goal={goal}
//               onUpdate={updateGoalAmount}
//               onDelete={deleteGoal}
//             />
//           ))}

//           {goals.length === 0 && (
//             <div >No goals yet — click <span >Add Goal</span> to create one.</div>
//           )}
//         </div>

//         {showAdd && <AddGoalForm onAdd={addGoal} onClose={() => setShowAdd(false)} />}

//       </div>
//     </div>
//   );
// }

// function GoalItem({ goal, onUpdate, onDelete }) {
//   const percent = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100 || 0);
//   const [input, setInput] = useState(goal.currentAmount);

//   useEffect(() => setInput(goal.currentAmount), [goal.currentAmount]);

//   return (
//     <div >
//       <div>
//         <div >
//           <div>
//             <GoalIcon name={goal.icon} />
//           </div>
//           <div>
//             <h3 >{goal.title}</h3>
//             <p >{percent.toFixed(0)}% complete</p>
//           </div>
//         </div>

//         <div >
//           <div >${formatNumber(goal.currentAmount)} / ${formatNumber(goal.targetAmount)}</div>
//         </div>
//       </div>

//       <div >
//         <div >
//           <div   />
//         </div>
//       </div>

//       <div >
//         <input type="number" value={input} onChange={(e) => setInput(e.target.value)} className="" />
//         <button onClick={() => onUpdate(goal.id, input)} className="">$ Update Savings</button>
//         <button onClick={() => onDelete(goal.id)} className="">Delete</button>
//       </div>
//     </div>
//   );
// }

// function AddGoalForm({ onAdd, onClose }) {
//   const [title, setTitle] = useState("");
//   const [icon, setIcon] = useState("airplane");
//   const [target, setTarget] = useState(0);

//   function submit(e) {
//     e.preventDefault();
//     if (!title || target <= 0) return;
//     onAdd({ title, icon, targetAmount: Number(target), currentAmount: 0 });
//   }

//   return (
//     <div className="">
//       <form onSubmit={submit} className="">
//         <div className="">
//           <h4 className="">Add New Goal</h4>
//           <button type="button" onClick={onClose} >Close</button>
//         </div>

//         <label className="">Title</label>
//         <input value={title} onChange={(e) => setTitle(e.target.value)} className="" />

//         <label className="">Target Amount</label>
//         <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} className="" />

//         <label className="">Icon</label>
//         <select value={icon} onChange={(e) => setIcon(e.target.value)} className="">
//           <option value="airplane">Airplane</option>
//           <option value="home">Home</option>
//           <option value="education">Education</option>
//           <option value="car">Car</option>
//           <option value="other">Other</option>
//         </select>

//         <div className="">
//           <button type="button" onClick={onClose} >Cancel</button>
//           <button type="submit" >Create Goal</button>
//         </div>
//       </form>
//     </div>
//   );
// }


// function GoalIcon({ name }) {
//   switch (name) {
//     case "airplane":
//       return (
//         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 16L22 9L16 5L11 11L2 16Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
//       );
//     case "home":
//       return (
//         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11L12 3L21 11V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V11Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
//       );
//     case "education":
//       return (
//         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17L12 22L22 17" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
//       );
//     case "car":
//       return (
//         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 13L5 7H19L21 13" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 19H7V17H5V19Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 19H19V17H17V19Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
//       );
//     default:
//       return (
//         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#ffffff" strokeWidth="1.2"/></svg>
//       );
//   }
// }

// function sampleGoals() {
//   return [
//     { id: cryptoId(), title: "Vacation Fund", icon: "airplane", targetAmount: 5000, currentAmount: 3200 },
//     { id: cryptoId(), title: "Emergency Fund", icon: "home", targetAmount: 10000, currentAmount: 7500 },
//     { id: cryptoId(), title: "Education Fund", icon: "education", targetAmount: 15000, currentAmount: 4200 }
//   ];
// }

// function formatNumber(n){
//   return n.toLocaleString();
// }

// function cryptoId(){
//   return Math.random().toString(36).slice(2, 10);
// }
