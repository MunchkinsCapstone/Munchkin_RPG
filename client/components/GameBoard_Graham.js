import React, { Component } from 'react';
import PlayerCard from './PlayerCard';
import ButtonPanel from './ButtonPanel';
let { doors, treasures, Battle, log, Game, turnOrder } = require('../../index');

class GameBoard extends Component {
  constructor() {
    super();
    this.state = {
      game: {
        players: [],
        currentPlayer: {},
        playerOrder: [],
        isActive: false
      },
      players: ['Graham', 'Yang', 'Raymond', 'Ozal']
    };
    this.startGame = this.startGame.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.knockKnock = this.knockKnock.bind(this);
    this.fight = this.fight.bind(this);
    this.flee = this.flee.bind(this);
    this.lootRoom = this.lootRoom.bind(this);
    this.discard = this.discard.bind(this);
  }

  startGame() {
    if (!this.state.players.length) return log('There are no players!');
    const game = new Game(this.state.players);
    this.setState({
      game
    });
  }

  knockKnock() {
    const { game } = this.state;
    game.knockKnock();
    this.setState({
      game
    });
  }

  fight() {
    const { game } = this.state;
    game.battle.resolve();
    this.setState({
      game
    });
  }

  flee() {
    const { game } = this.state;
    game.battle.flee();
    this.setState({
      game
    });
  }

  lootRoom() {
    const { game } = this.state;
    game.lootRoom();
    this.setState({
      game
    });
  }

  endTurn() {
    const { game } = this.state;
    game.endTurn();
    this.setState({
      game
    });
  }

  discard() {
    const { game } = this.state;
    game.currentPlayer.hand.pop().discard();
    this.setState({
      game
    });
  }

  render() {
    const { game, players } = this.state;
    const playerOrder = game.playerOrder ? game.playerOrder : [];
    if (game.active) {
      log('PLAYERS: ' + game.playerOrder.map(player => player.name));
      // log('DOORS: ' + doors.cards);
    }
    const logGame = () => log(game.currentPlayer.name);
    const logHand = () => log(game.currentPlayer.hand.length);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="row">
              <div className="col-12 placeholder">
                {game.playerOrder.map(player => {
                  return <PlayerCard key={player.name} player={player} />;
                })}
              </div>
            </div>
          </div>
          <div className="col-6">
            <img
              id="gameBoard"
              src="http://www.worldofmunchkin.com/gameboard/img/cover_lg.jpg"
            />
          </div>
          <div className="col-3">
            <div className="row">
              <div className="col-12">
                <ButtonPanel
                  game={game}
                  startGame={this.startGame}
                  knockKnock={this.knockKnock}
                  fight={this.fight}
                  flee={this.flee}
                  lootRoom={this.lootRoom}
                  discard={this.discard}
                  endTurn={this.endTurn}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameBoard;
