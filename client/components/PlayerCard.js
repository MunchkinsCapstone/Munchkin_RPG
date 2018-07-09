import React from 'react'
import Hand from './Hand'
import Equipment from './Equipment'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

const PlayerCard = props => {
  const {
    player,
    game,
    discard,
    equip,
    unequip,
    cast,
    lookForTrouble,
    equipToHireling,
    assist,
    id
  } = props
  let color = player.isActive ? 'primary' : 'secondary'
  if (player.inBattle) color = 'danger'
  console.log(player)
  return (
    <div className={`text-white bg-${color} mb-3`}>
      <div className="card-header player-card-top">
        <h5>Level: {player.level}</h5>
        <div className="player-title">
          <h4>{player.name}</h4>
          <h6>
            {(player.sex === 'Male' ? '♂' : '♀') +
              ' ' +
              (player.race ? player.race.name : 'Human') +
              ' ' +
              (player.class ? player.class.name : 'Commoner')}
          </h6>
        </div>
        <h5>Attack: {player.attack()}</h5>
      </div>
      <div className="card-body player-card-button">
        {/* {console.log('PLAYER: ' + player.name)} */}
        <Hand
          hand={player.hand}
          player={player}
          discard={discard}
          equip={equip}
          cast={cast}
          lookForTrouble={lookForTrouble}
          equipToHireling={equipToHireling}
          game={game}
          id={id}
        />
        <Equipment player={player} discard={discard} unequip={unequip} />
        {game.battle.isActive &&
          !player.inBattle && (
            <Button
              style={{marginLeft: '15px'}}
              type="button"
              variant="extendedFab"
              onClick={() => assist(player)}
            >
              <Icon style={{marginRight: '5px'}}>group_add</Icon>
              Assist
            </Button>
          )}
        {/* <button type='button' className='btn btn-white'>
					Trade
				</button> */}
      </div>
    </div>
  )
}

export default PlayerCard
