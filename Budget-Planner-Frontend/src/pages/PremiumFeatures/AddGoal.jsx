import React, { useState } from 'react';
import { X, Check, DollarSign, Type } from 'lucide-react';

const AddGoal = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!title || target <= 0) {
      alert("Please enter all inputs");
      return;
    }

    // Defaulting currentAmount to 0 for new goals
    onAdd({ title, targetAmount: Number(target), currentAmount: 0 });
    setTitle("");
    setTarget("");
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mt-6 shadow-inner animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">New Savings Goal</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {/* Title Input */}
        <div className="relative">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Goal Title</label>
          <div className="relative">
            <Type className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
              placeholder="e.g. Dream Vacation"
              autoFocus
            />
          </div>
        </div>

        {/* Target Input */}
        <div className="relative">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Target Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type='submit'
            className="flex-[2] py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Check size={18} /> Create Goal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGoal;