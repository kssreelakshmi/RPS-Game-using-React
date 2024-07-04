import React, { useState } from 'react'
import {
    FaHandPaper,
    FaHandRock,
    FaHandScissors,
    FaHeart,
    FaRegHeart,
  } from "react-icons/fa";
import { TbArrowBigDownLinesFilled } from "react-icons/tb";
import { VscDebugRestart } from "react-icons/vsc";

const Game = () => {
    const maxLives = 5 ;
    const [lives,setLives] = useState(maxLives);
    const [playerScore,setPlayerScore] = useState(lives);
    const [opponentScore ,setOpponentScore] = useState(lives);
    const [gameStatus,setGameStatus] = useState('choose to start');
    const [playerRoll, setPlayerRoll] = useState('question mark');
    const [opponentPlayerRoll,setOpponentPlayerRoll] = useState('question mark');
    const [animationRoll,setAnimationRoll] = useState(false);
  
    function hearts(lives,score){
        const heart = new Array(lives);
        heart.fill(0);
        for (let i = 0 ; i < score ; i++){
            heart[i] = i;
        }
        const displayHearts = hearts.map((heart,index)=>{
            return heart === 0 ? <FaRegHeart key={index}/> : <FaHeart key={index} />
        });
        return displayHearts;
    }
    
    function rollImages(roll){
       return roll === 'rock' ? rock : roll === 'paper' ? paper : roll ==='scissors' ? scissiors : questionMark;
    }

    const playerRolls = ['rock','paper','scissors']

    const buttons = playerRolls.map((playerRoll)=>{
        return (
            <button key={playerRoll} onClick={()=>{
                roll(gameStatus,playerRolls,playerRoll,setPlayerRoll,setOpponentPlayerRoll,setPlayerScore,setOpponentScore,setGameStatus);
                setAnimationRoll(true);}} disabled={playerScore === 0 || opponentScore === 0} aria-label={playerRoll} className='rpsgame-button'>
                    {playerRoll === 'rock' ? (<FaHandRock/>) : playerRoll === 'paper' ? (<FaHandPaper/>) : (<FaHandScissors/>)}    
            </button>
        )
    })
  
    return (
    <div className='rpsgame-container'>
        <Header />
    <section className='rpsgame-section'>
        <div className='rpsgame-playerinfocontainer'>
            <div className='rpsgame-playersInfoContainerItem'>
                <h3>Player</h3>
                <img src="" alt="" className={opponentScore === 0 ? 'rpsgame-winPortrait' : 'rpsgame-Portrait'}/>
                <div className='rpsgame-heartscontainer'>
                    {hearts(lives,playerScore)}
                </div>
            </div>
            <form className='rpsgame-form'>
                <label htmlFor= "numberInput">
                    Lives <br /><br />(1-{maxLives})
                </label>
                <input type="number" id='numberInput' 
                className='rpsgame-input' value={lives} max={maxLives} min={1}
                onChange={(e)=>handleInputLives(
                    e, maxLives,setLives,setPlayerScore,setOpponentScore,setGameStatus,setOpponentPlayerRoll,setOpponentPlayerRoll,setAnimationRoll
                )}/>
                <button type='button' aria-label='change numbe of lives' onClick={()=>changeLives(
                    lives,maxLives,setLives,setPlayerScore,setOpponentScore,setGameStatus,setPlayerRoll,setOpponentPlayerRoll,setAnimationRoll
                )} className='rpsgame-subBtn'>
                    <FaHeart/>
                </button>
            </form>
            <div className='rpsgame-playersInfoContainerItem'>
                <h3>Computer</h3>
                <img src="" alt="" className={playerScore === 0 ? 'rpsgame-winPortrait' : 'rpsgame-Portrait'}/>
                <div className='rpsgame-heartscontainer'>
                    {hearts(lives,opponentScore)}
                </div>
            </div>
        </div>
        <h1 className='rpsgame-heading'>Rock, Paper,Scissor</h1>
        <div>
            <img src={rollImages(playerRoll)} alt={`${playerRoll}`} className={rollAnimation === true? 'rpsgame-imageAnimation' : 'rpsgame-image'} onAnimationEnd={()=>setAnimationRoll(false)}/>
        </div>
        <h2 className='rpsgame=subheading'>{gameStatus==='choose to start' && <TbArrowBigDownLinesFilled />}
        {playerScore === 0 ? 'opponent won': opponentScore === 0 ? 'you won': gameStatus}
        {gameStatus === 'choose to start' && <TbArrowBigDownLinesFilled/>}
        </h2>
    </section>    

    </div>
  )


}

export default Game