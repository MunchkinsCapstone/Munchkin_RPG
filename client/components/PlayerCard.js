import React from 'react';
import Hand from './Hand';

const PlayerCard = props => {
  const { player, game } = props;
  let color = player === game.currentPlayer ? 'primary' : 'secondary';
  if (player.inBattle) color = 'danger';
  return (
    <div className={`text-white bg-${color} mb-3`}>
      <div className="card-header player-card-top">
        <h5>Level: {player.level}</h5>
        <h4>{player.name}</h4>
        <h5>Attack: {player.attack}</h5>
      </div>
      <div className="card-body player-card-button">
        {console.log('PLAYER: ' + player.name)}
        <Hand hand={player.hand} name={player.name} />
        <button type="button" className="btn btn-light">
          Equipment
        </button>
        <button type="button" className="btn btn-white">
          Assist
        </button>
        <button type="button" className="btn btn-white">
          Trade
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;
