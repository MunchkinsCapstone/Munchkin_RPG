//CLIENT SIDE SOCKET

import io from 'socket.io-client';
import { startGame } from './store/gameReducer';
const { appendMethods, allCards } = require('./gameLogic');
import store, { sendMessage } from './store';

const socket = io(window.location.origin);

const reattachSelfRef = (game) => {
	game.battle.game = game;
	game.players.forEach((player) => (player.game = game));
	return game;
};

socket.on('connect', () => {
	socket.on('sent message', (message) => {
		console.log(message);
		store.dispatch(sendMessage(message));
	});
	socket.on('gameBegin', (game) => {
		game = appendMethods.game(game);
		game.players = game.players.map((player) => {
			player.hand = player.hand.map((card) =>
				appendMethods.card(allCards.find((otherCard) => otherCard.imageUrl === card.imageUrl))
			);
			player.allEquips = player.allEquips.map((card) =>
				appendMethods.card(allCards.find((otherCard) => otherCard.imageUrl === card.imageUrl))
			);
			return appendMethods.player(player);
		});
		if (game.battle.isActive) {
			game.battle = appendMethods.battle(game.battle);
			game.battle.monster = appendMethods.card(
				allCards.find((otherCard) => otherCard.imageUrl === game.battle.monster.imageUrl)
			);
			game.battle.buffs.monster = game.battle.buffs.monster.map((card) =>
				appendMethods.card(allCards.find((otherCard) => otherCard.imageUrl === card.imageUrl))
			);
			game.battle.buffs.players = game.battle.buffs.players.map((card) =>
				appendMethods.card(allCards.find((otherCard) => otherCard.imageUrl === card.imageUrl))
			);
		}
		game = reattachSelfRef(game);
		// console.log(game)
		store.dispatch(startGame(game));
	});
});

export default socket;
