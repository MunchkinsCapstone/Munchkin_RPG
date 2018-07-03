import React, { Component } from 'react'
import PlayerCard from './PlayerCard'
import ChatLog from './ChatLog'
import Battle from './Battle'
import ButtonPanel from './ButtonPanel'
import ImageMapper from 'react-image-mapper'
import socket from '../socket'
import store from '../store'
import { connect } from 'react-redux'
import { startGame } from '../store/gameReducer'

let { log, Game } = require('../gameLogic')

class GameBoard extends Component {
  constructor(props) {
    super(props)
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
    this.props.beginGame(game)
    // socket.emit('startGame', game)
  }

  knockKnock() {
    const { game } = this.props
    game.knockKnock()
    this.setState({
      game
    })
  }

  componendDidMount() {
    const audioNode = document.getElementById('boardAudio')
    console.log('Hello audio!!', audioNode)
    audioNode.play()
    // socket.on('gameStarted', game => {
    //   console.log(game)
    //   this.setState({
    //     game
    //   })
    //   console.log(this.state, 'after payload<><><><><><><><><>')
    // })
  }

  fight() {
    const { game } = this.props
    game.battle.resolve()
    this.setState({
      game
    })
  }

  flee() {
    const { game } = this.props
    game.battle.flee()
    this.setState({
      game
    })
  }

  lootRoom() {
    const { game } = this.props
    game.lootRoom()
    this.setState({
      game
    })
  }

  endTurn() {
    const { game } = this.props
    game.endTurn()
    this.setState({
      game
    })
  }

  discard(player, cardIdx) {
    const { game } = this.props
    player.discard(cardIdx)
    this.setState({
      game
    })
  }

  equip = (player, cardIdx) => {
    const { game } = this.props
    const item = player.hand[cardIdx]
    player.equip(cardIdx)
    this.setState({
      game
    })
  }

  unequip = (player, ___, item) => {
    const { game } = this.props
    player.unequip(item)
    this.setState({
      game
    })
  }

  equipToHireling = (player, card) => {
    const { game } = this.props
    player.equipToHireling(card)
    this.setState({
      game
    })
  }

  cast = (player, cardIdx, target) => {
    const { game } = this.props
    player.cast(cardIdx, target)
    this.setState({
      game
    })
  }

  lookForTrouble = monster => {
    const { game } = this.props
    game.startBattle(monster)
    const { hand } = game.currentPlayer
    hand.splice(hand.indexOf(monster), 1)
    this.setState({
      game
    })
  }

  assist = player => {
    const { game } = this.props
    player.assist()
    this.setState({
      game
    })
  }

  render() {
    const { game } = this.props;
    console.log("THIS MY GAME YO", game);
    const MAP = {
      name: 'door',
      areas: [{ shape: 'rect', coords: [28, 503, 128, 564] }]
    }
    return (
      <div className="gameboard-container">
        <div>
          {game && game.isActive ? (
            <div>
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
                    lookForTrouble={this.lookForTrouble}
                    equipToHireling={this.equipToHireling}
                    assist={this.assist}
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
        </div>
        <div>
          {game && game.battle.isActive ? (
            <Battle battle={game.battle} />
          ) : (
              <div>
                <ImageMapper
                  src={
                    'http://www.worldofmunchkin.com/gameboard/img/cover_lg.jpg'
                  }
                  map={MAP}
                  onClick={
                    (game && game.phase === 1)
                      ? this.knockKnock
                      : ((game && game.phase === 2) ? this.lootRoom : null)
                  }
                />
                {/* <img
                  alt="gameboard"
                  style={{width: '100%'}}
                  src="http://www.worldofmunchkin.com/gameboard/img/cover_lg.jpg"
                /> */}
                <audio autoPlay loop id="boardAudio">
                  <source src="./music/theJourney.mp3" type="audio/mp3" />
                </audio>
              </div>
            )
          }
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
        <div>
          <ChatLog />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("MY STATE IN CONNECT", state)
  return {
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    beginGame: (gameObj) => {
      dispatch(startGame(gameObj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)