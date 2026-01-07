import { useEffect, useState } from "react";

const GoalItem = ({ goal, onDelete, onUpdate }) => {
  const percent = Math.min(
    100,
    (goal.currentAmount / goal.targetAmount) * 100 || 0
  );
  const [input, setInput] = useState(0);

  useEffect(() => setInput(goal.currentAmount), [goal.currentAmount]);
  return (
    <div>
      <div>{goal.title}</div>
      <div>
        <p>{percent.toFixed(0)}% complete</p>
      </div>
      {`$${goal.currentAmount}/ $${goal.targetAmount}`}
      <div>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={() => onUpdate(goal.id, input)}>Update savings</button>
        <button onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </div>
  );
};

export default GoalItem;
