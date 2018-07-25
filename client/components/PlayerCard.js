import React from 'react';
import Hand from './Hand';
import Equipment from './Equipment';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const PlayerCard = (props) => {
	const { player, game, discard, equip, unequip, cast, lookForTrouble, equipToHireling, assist } = props;
	let color = player.isActive ? 'primary' : 'secondary';
	if (player.inBattle) color = 'danger';
	if (player.level >= 10) color = 'warning';

	let backgroundMusic = () => {
		switch (player.level) {
			case 1:
				return 'tifa';
			case 2:
				return 'barret';
			case 3:
				return 'aerith';
			case 4:
				return 'cid';
			case 5:
				return 'cait';
			case 6:
				return 'turks';
			case 7:
				return 'shinra';
			case 8:
				return 'jenova';
			case 9:
				return 'oneWingedAngel';
			case 10:
				return 'fanfair';
			default:
				return 'theJourney';
		}
	};

	let gameBackground = () => {
		switch (player.level) {
			case 1:
				return 'main';
			case 2:
				return 'waterfall';
			case 3:
				return 'tree';
			case 4:
				return 'village';
			case 5:
				return 'fire';
			case 6:
				return 'dessert2';
			case 7:
				return 'dessert';
			case 8:
				return 'lava';
			case 9:
				return 'final';
			case 10:
				return 'main';
			default:
				return 'main';
		}
	};

	return (
		<div className={`text-white bg-${color} mb-3`}>
			{player.isActive &&
			!player.inBattle && (
				<audio autoPlay loop id='boardAudio' preload='auto'>
					<source src={`./music/${backgroundMusic()}.mp3`} type='audio/mp3' />
					{(document.body.style.backgroundImage = `url('./backgrounds/${gameBackground()}.gif')`)}
				</audio>
			)}
			<div className='card-header player-card-top'>
				<h5>Level: {player.level}</h5>
				<div className='player-title'>
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
			<div className='card-body player-card-button'>
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
				/>
				<Equipment player={player} discard={discard} unequip={unequip} />
				{game.battle.isActive &&
				!player.inBattle && (
					<Button style={{ marginLeft: '15px' }} type='button' variant='extendedFab' onClick={() => assist(player)}>
						<Icon style={{ marginRight: '5px' }}>group_add</Icon>
						Assist
					</Button>
				)}
				{/* <button type='button' className='btn btn-white'>
					Trade
				</button> */}
			</div>
		</div>
	);
};

export default PlayerCard;
