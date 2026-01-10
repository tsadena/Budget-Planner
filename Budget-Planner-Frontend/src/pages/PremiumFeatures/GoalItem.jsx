import { useEffect, useState } from "react";
import { Trash2, RefreshCw, Plane, Home, GraduationCap, Car, Target, Save } from "lucide-react";

const GoalItem = ({ goal, onDelete, onUpdate }) => {
  const percent = Math.min(
    100,
    (goal.currentAmount / goal.targetAmount) * 100 || 0
  );
  
  const [input, setInput] = useState(0);

  useEffect(() => setInput(goal.currentAmount), [goal.currentAmount]);

  // Helper to choose an icon based on the title string
  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('vacation') || t.includes('trip') || t.includes('travel')) return <Plane size={20} className="text-blue-500" />;
    if (t.includes('home') || t.includes('house') || t.includes('rent')) return <Home size={20} className="text-green-500" />;
    if (t.includes('education') || t.includes('school') || t.includes('college')) return <GraduationCap size={20} className="text-purple-500" />;
    if (t.includes('car') || t.includes('vehicle')) return <Car size={20} className="text-orange-500" />;
    return <Target size={20} className="text-gray-500" />;
  };

  // Helper for background color of icon
  const getIconBg = (title) => {
    const t = title.toLowerCase();
    if (t.includes('vacation') || t.includes('trip')) return "bg-blue-100";
    if (t.includes('home') || t.includes('house')) return "bg-green-100";
    if (t.includes('education') || t.includes('school')) return "bg-purple-100";
    if (t.includes('car')) return "bg-orange-100";
    return "bg-gray-100";
  };

  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      
      {/* Top Row: Icon, Title, Money */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${getIconBg(goal.title)}`}>
            {getIcon(goal.title)}
          </div>
          <h3 className="text-lg font-bold text-gray-800">{goal.title}</h3>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">
            ${Number(goal.currentAmount).toLocaleString()}
          </div>
          <div className="text-sm text-gray-400 font-medium">
             of ${Number(goal.targetAmount).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1.5">
          <span>{percent.toFixed(0)}% complete</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full rounded-full bg-slate-800 transition-all duration-500 ease-out" 
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Action Row: Update Input + Delete */}
      <div className="flex items-center gap-2">
        
        {/* The Update "Bar" */}
        <div className="flex-grow flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 relative group focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
          <div className="pl-3 text-gray-400 font-bold">$</div>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-gray-700 font-semibold px-2 py-1.5"
            placeholder="Amount"
          />
          <button 
            onClick={() => onUpdate(goal.id, input)}
            className="bg-white text-gray-700 p-1.5 rounded-lg shadow-sm border border-gray-100 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Save Update"
          >
            <Save size={18} />
          </button>
        </div>

        {/* Delete Button */}
        <button 
          onClick={() => onDelete(goal.id)}
          className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          title="Delete Goal"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default GoalItem;