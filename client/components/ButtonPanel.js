import React, {Component} from 'react'

export const ButtonPanel = props => {
  const {game, startGame, knockKnock, fight, flee, lootRoom, endTurn} = props

  if (game.battle.isActive)
    return (
      <div className="flexContainer">
        <button type="button" className="btn btn-danger" onClick={fight}>
          Fight!
        </button>
        <button type="button" className="btn btn-warning" onClick={flee}>
          Flee!
        </button>
      </div>
    )
  if (!game.isActive) {
    //   if (game.phase === 1)
    //     return (
    //       <div className="flexContainer">
    //         <button type="button" className="btn btn-primary" onClick={knockKnock}>
    //           Kick Door
    //         </button>
    //       </div>
    //     )
    //   if (game.phase === 2)
    //     return (
    //       <div className="flexContainer">
    //         <button type="button" className="btn btn-success" onClick={lootRoom}>
    //           Loot The Room
    //         </button>
    //       </div>
    //     )
    //   if (game.phase === 3)
    //     return (
    //       <div className="flexContainer">
    //         <button type="button" className="btn btn-info" onClick={endTurn}>
    //           End Turn
    //         </button>
    //       </div>
    //     )
    return (
      <div className="flexContainer">
        <button type="button" className="btn btn-dark" onClick={startGame}>
          Start Game
        </button>
      </div>
    )
  } else return null
}

export default ButtonPanel
