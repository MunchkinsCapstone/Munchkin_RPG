import React from 'react'
import Hand from './Hand'
import Equipment from './Equipment'

const PlayerCard = props => {
  const {
    player,
    game,
    discard,
    equip,
    unequip,
    cast,
    lookForTrouble,
    equipToHireling
  } = props
  let color = player === game.currentPlayer ? 'primary' : 'secondary'
  if (player.inBattle) color = 'danger'
  return (
    <div className={`text-white bg-${color} mb-3`}>
      <div className="card-header player-card-top">
        <h5>Level: {player.level}</h5>
        <div className="player-title">
          <h4>{player.name}</h4>
          <h6>
            {(player.race ? player.race.name : 'Human') +
              ' ' +
              (player.class ? player.class.name : 'Commoner')}
          </h6>
        </div>
        <h5>Attack: {player.attack}</h5>
      </div>
      <div className="card-body player-card-button">
        {console.log('PLAYER: ' + player.name)}
        <Hand
          hand={player.hand}
          player={player}
          discard={discard}
          equip={equip}
          cast={cast}
          lookForTrouble={lookForTrouble}
          equipToHireling={equipToHireling}
        />
        <Equipment player={player} discard={discard} unequip={unequip} />
        <button type="button" className="btn btn-white">
          Assist
        </button>
        <button type="button" className="btn btn-white">
          Trade
        </button>
      </div>
    </div>
  )
}

export default PlayerCard
