import React, {Component} from 'react'

class Battle extends Component {
  constructor() {
    super()
    this.height = null
  }

  render() {
    const {battle} = this.props
    const monster = battle.monster
    const player = battle.player
    return (
      <div className="battle">
        <div className="row">
          <div className="col-12">
            <img
              className="monster-view"
              src={'/cardImages/' + monster.imageUrl}
              alt="https://i.pinimg.com/736x/6f/c0/50/6fc050ee0177c09195b3bb067898b403--big-daddy-custom-cards.jpg"
            />
          </div>
        </div>
        <hr />
        <div
          className="row battle-stats"
          style={{padding: '2em', display: 'table'}}
        >
          {/* <div
            className="col-6"
            style={{textAlign: 'center', display: 'table-cell'}}
          > */}
          <div id="combatant-names" style={{display: 'table-row'}}>
            {/* <h3>{battle.players.map((player) => player.name).join(',\n')}</h3> */}
            <div
              id="monster-name"
              style={{
                display: 'table-cell',
                paddingRight: '5px'
              }}
            >
              {battle
                .getPlayers()
                .map(player => <h3 key={player.name}>{player.name}</h3>)}
            </div>
            <div
              id="monster-name"
              style={{
                display: 'table-cell',
                borderLeft: '1px gray solid',
                paddingLeft: '5px'
              }}
            >
              <h3>{monster.name}</h3>
            </div>
          </div>
          <div style={{display: 'table-row'}}>
            <div
              className="table-cell"
              style={{
                display: 'table-cell',
                paddingRight: '5px'
              }}
            >
              <hr />
              <h5>Attack : {battle.playerAttack()}</h5>
            </div>
            <div
              className="table-cell"
              style={{
                display: 'table-cell',
                borderLeft: '1px gray solid',
                paddingLeft: '5px'
              }}
            >
              <hr />
              <h5>Attack : {monster.level}</h5>
            </div>
          </div>
          <div style={{display: 'table-row'}}>
            <div
              className="table-cell"
              style={{
                display: 'table-cell',
                paddingRight: '5px'
              }}
            >
              <hr />
              <h5>{'Buffs: ' + battle.buffs.getTotal('players')}</h5>
            </div>
            <div
              className="table-cell"
              style={{
                display: 'table-cell',
                borderLeft: '1px gray solid',
                paddingLeft: '5px'
              }}
            >
              <hr />
              <h5>{'Buffs: ' + battle.buffs.getTotal('monster')}</h5>
            </div>
          </div>
          <div style={{display: 'table-row'}}>
            <div
              className="table-cell"
              style={{
                display: 'table-cell',
                paddingRight: '5px'
              }}
            >
              <hr />
              <h4>TOTAL : {battle.playerTotal()}</h4>
            </div>
            <div
              className="table-cell"
              style={{
                display: 'table-cell',
                borderLeft: '1px gray solid',
                paddingLeft: '5px'
              }}
            >
              <hr />
              <h4>TOTAL : {battle.monsterTotal()}</h4>
            </div>
          </div>
          {/* </div> */}
          {/* <div
            className="col-6"
            style={{textAlign: 'center', display: 'table-cell'}}
          > */}
          {/* </div> */}
        </div>
        <audio autoPlay loop>
          <source src="./music/BattleatTrintanVillage.mp3" typ="audio/mp3" />
        </audio>
      </div>
    )
  }
}

export default Battle
