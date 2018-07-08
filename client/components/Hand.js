import React from 'react';
import Card from './Card';
// import Badge from './Badge';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const Hand = (props) => {
	const { hand, player, discard, equip, cast, game, lookForTrouble, equipToHireling } = props;
	return (
		<div>
			<Badge color='primary' badgeContent={hand.length}>
				<Button type='button' variant='extendedFab' data-toggle='modal' data-target={`.${player.name}-modal`}>
					<Icon style={{ marginRight: '5px' }}>pan_tool</Icon>
					Hand
				</Button>
			</Badge>

			<div
				className={`modal fade bd-example-modal-lg ${player.name}-modal`}
				tabIndex='-1'
				role='dialog'
				aria-labelledby='myLargeModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-lg'>
					<div className='modal-content'>
						<div className='container'>
							{hand.length ? (
								hand.map((card, index) => {
									return (
										<Card
											key={`hand-${index}`}
											card={card}
											discard={discard}
											toggleEquip={equip}
											cardIdx={index}
											player={player}
											cast={cast}
											lookForTrouble={lookForTrouble}
											equipToHireling={equipToHireling}
											game={game}
										/>
									);
								})
							) : (
								<div style={{ backgroundColor: 'white' }}>
									<h1>You have no cards in your hand!</h1>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hand;
