import React from 'react';

const PlayerCard = (props) => {
	const { player } = props;
	let color = player === player.game.currentPlayer ? 'primary' : 'secondary';
	if (player.inBattle) color = 'danger';
	return (
		<div className={`card text-white bg-${color} mb-3`}>
			<div className='card-header'>{player.name}</div>
			<div className='card-body'>
				<h5 className='card-title'>Level: {player.level}</h5>
				<p className='card-text'>Attack Power: {player.attack}</p>
			</div>
		</div>
	);
};

export default PlayerCard;
