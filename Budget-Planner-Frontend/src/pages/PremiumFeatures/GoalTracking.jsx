import React, { useState } from "react";
import { Target, Plus, Zap } from "lucide-react";
import AddGoal from "./AddGoal";
import GoalItem from "./GoalItem";

const GoalTracking = () => {
  // Initial dummy data to make the UI look populated immediately
  const [goals, setGoals] = useState([
   
  ]);
  const [showAdd, setShowAdd] = useState(false);

  function addGoal(goal) {
    setGoals((g) => [{ ...goal, id: UniqueId() }, ...g]);
    setShowAdd(false);
  }

  function updateGoal(id, amount) {
    setGoals((g) =>
      g.map((x) => (x.id === id ? { ...x, currentAmount: Number(amount) } : x))
    );
  }

  function deleteGoal(id) {
    setGoals((g) => g.filter((x) => x.id !== id));
  }

  function UniqueId() {
    return Math.random().toString().slice(2, 10);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      {/* Main Container Card */}
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 h-fit">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Goal Tracking</h1>
            <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Zap size={10} fill="currentColor" /> Premium
            </span>
          </div>
          <div className="bg-gray-100 p-2 rounded-full">
            <Target className="text-gray-400" size={24} />
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-2">
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onUpdate={updateGoal}
              onDelete={deleteGoal}
            />
          ))}
        </div>

        {/* Empty State */}
        {goals.length === 0 && !showAdd && (
          <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
            <Target className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500 font-medium">No goals yet.</p>
            <p className="text-gray-400 text-sm">Start saving for your dreams today.</p>
          </div>
        )}

        {/* Add Section */}
        <div className="mt-6">
          {showAdd ? (
            <AddGoal onAdd={addGoal} onCancel={() => setShowAdd(false)} />
          ) : (
            <button
              onClick={() => setShowAdd(true)}
              className="w-full group bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-gray-200 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Plus size={22} className="group-hover:scale-110 transition-transform" /> 
              Add New Goal
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default GoalTracking;