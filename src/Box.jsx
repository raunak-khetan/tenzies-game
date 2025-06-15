import { useState, useEffect } from "react"
import './Box.css'
export default function Box(){


const [diceCount, setDiceCount] = useState(10); 
const [num,setNum]=useState(generateNum(diceCount));

function generateNum(count) {
  const newArray = [];
  for (let i = 0; i < count; i++) {
    newArray.push({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
    });
  }
  return newArray;
};


  function holdClick(index) {
  setNum(prev =>
    prev.map((dice, i) =>
      i === index ? { ...dice, isHeld: !dice.isHeld } : dice
    )
  );
}


  function handleClick(){
    setNum(prev=>prev.map(dice=>
      dice.isHeld ?dice :{...dice,value: Math.floor(Math.random() * 6) + 1}
    ))
  };



function handleNew(){
 setNum(generateNum(diceCount));
 setWon(false);
}


function handleDifficultyChange(e) {
  const count = e.target.value;
  setDiceCount(count); 
  setNum(generateNum(count));
  setWon(false);
}


const [won, setWon] = useState(false);

useEffect(() => {
  const allHeld = num.every(dice => dice.isHeld);
  const allSame = num.every(dice => dice.value === num[1].value);

  if (allHeld && allSame) {
    setWon(true);
  }
}, [num]);

  

return (
  <>
  <select onChange={handleDifficultyChange} value={diceCount} className="difficulty-box">
  <option value="5">Easy (5 Dice)</option>
  <option value="10">Medium (10 Dice)</option>
  <option value="15">Hard (15 Dice)</option>
</select>

  {won && <h2 className="win-text">🎉 Winner! 🎉</h2>}



<div className="box">

  {num.map((dice, index) => (
    <button key={index} className={`number ${dice.isHeld ? "held" : ""}`} onClick={() => holdClick(index)}>
      {dice.value}
    </button>
    ))};
 
</div>

<div className="roll-dice">
    <button onClick={handleClick}>Roll Dice</button>
    <button onClick={handleNew}>New Game</button>
</div>
  
  </>
  
)}




