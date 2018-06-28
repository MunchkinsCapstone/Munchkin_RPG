import React, { Component } from 'react';
import PlayerCard from './PlayerCard';
import ChatLog from './ChatLog';
import Battle from './Battle';
import ButtonPanel from './ButtonPanel';
let { log, Game } = require('../gameLogic');

export default class GameBoard extends Component {
  constructor() {
    super();
    this.state = {
      game: {
        players: [],
        currentPlayer: {},
        playerOrder: [],
        isActive: false,
        battle: {
          isActive: false
        }
      },
      players: ['Yang', 'Oz', 'Graham', 'Raymond', 'Josh', 'Dan']
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
    const { game } = this.state;
    return (
      <div className="container">
        <div className="row">
          {game.isActive ? (
            <div className="col-5">
              {game.playerOrder.map(player => {
                return (
                  <PlayerCard key={player.name} player={player} game={game} />
                );
              })}
            </div>
          ) : (
            <img
              alt="gameboard"
              src="http://www.worldofmunchkin.com/lite/img/backcover_lg.jpg"
            />
          )}
          <div className="col-4">
            {game.battle.isActive ? (
              <Battle battle={game.battle} />
            ) : (
              <div>
                <img
                  alt="gameboard"
                  style={{ width: '100%' }}
                  src="http://www.worldofmunchkin.com/gameboard/img/cover_lg.jpg"
                />
              </div>
            )}
            <hr />
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
          <div className="col-3">
            <ChatLog />
          </div>
        </div>
      </div>
    );
  }
}
