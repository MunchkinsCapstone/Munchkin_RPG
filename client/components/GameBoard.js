import React, {Component} from 'react'
import PlayerCard from './PlayerCard'
import ChatLog from './ChatLog'
import Battle from './Battle'
import ButtonPanel from './ButtonPanel'
let {log, Game} = require('../gameLogic')

export default class GameBoard extends Component {
  constructor() {
    super()
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
      players: ['Yang', 'Oz', 'Graham', 'Raymond']
    }
    this.startGame = this.startGame.bind(this)
    this.endTurn = this.endTurn.bind(this)
    this.knockKnock = this.knockKnock.bind(this)
    this.fight = this.fight.bind(this)
    this.flee = this.flee.bind(this)
    this.lootRoom = this.lootRoom.bind(this)
    this.discard = this.discard.bind(this)
    this.equip = this.equip.bind(this)
    this.unequip = this.unequip.bind(this)
    this.cast = this.cast.bind(this)
  }

  startGame() {
    if (!this.state.players.length) return log('There are no players!')
    const game = new Game(this.state.players)
    this.setState({
      game
    })
  }

  knockKnock() {
    const {game} = this.state
    game.knockKnock()
    this.setState({
      game
    })
  }

  componendDidMount() {
    const audioNode = document.getElementById('boardAudio')
    console.log('Hello audio!!', audioNode)
    audioNode.play()
  }

  fight() {
    const {game} = this.state
    game.battle.resolve()
    this.setState({
      game
    })
  }

  flee() {
    const {game} = this.state
    game.battle.flee()
    this.setState({
      game
    })
  }

  lootRoom() {
    const {game} = this.state
    game.lootRoom()
    this.setState({
      game
    })
  }

  endTurn() {
    const {game} = this.state
    game.endTurn()
    this.setState({
      game
    })
  }

  discard(player, cardIdx) {
    const {game} = this.state
    player.discard(cardIdx)
    this.setState({
      game
    })
  }

  equip = (player, cardIdx) => {
    const {game} = this.state
    const item = player.hand[cardIdx]
    player.equip(cardIdx)
    this.setState({
      game
    })
  }

  unequip = (player, ___, item) => {
    const {game} = this.state
    player.unequip(item)
    this.setState({
      game
    })
  }

  cast = (player, cardIdx, target) => {
    const {game} = this.state
    player.cast(cardIdx, target)
    this.setState({
      game
    })
  }

  render() {
    const {game} = this.state
    return (
      <div className="container">
        <div className="row">
          {game.isActive ? (
            <div className="col-5">
              {game.playerOrder.map(player => {
                return (
                  <PlayerCard
                    key={player.name}
                    player={player}
                    game={game}
                    discard={this.discard}
                    equip={this.equip}
                    unequip={this.unequip}
                    cast={this.cast}
                  />
                )
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
                  style={{width: '100%'}}
                  src="http://www.worldofmunchkin.com/gameboard/img/cover_lg.jpg"
                />
                <audio autoPlay loop id="boardAudio">
                  <source src="./music/theJourney.mp3" type="audio/mp3" />
                </audio>
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
              endTurn={this.endTurn}
            />
          </div>
          <div className="col-3">
            <ChatLog />
          </div>
        </div>
      </div>
    )
  }
}
