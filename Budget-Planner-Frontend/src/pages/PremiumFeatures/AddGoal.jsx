import React, { useState } from 'react'

const AddGoal = ({onAdd,onCancel}) => {

  
  const [title,setTitle] = useState("")
  const [target,setTarget] = useState(0)
  
  function submit(e) {
    e.preventDefault()

    if(!title || target <= 0){
      alert("Please enter all inputs")
      return ;      
    } 

    onAdd({title , targetAmount: Number(target), currentAmount: 0})
  }
  
  return (
    <div>
      <form onSubmit= {submit}>
      <h2>Title</h2>
      <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} /><br />
      <h2>Target</h2>
      <input type="number" value={target} onChange={(e)=> setTarget(e.target.value)}/>
      <br /><br />
      <button onClick={onCancel}>Cancel</button>
      <br /><br />
      <button type='submit'>Create Goal</button>
      </form>
      
    </div>
  )
}

export default AddGoal 