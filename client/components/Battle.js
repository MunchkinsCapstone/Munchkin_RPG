import React from 'react'

const Battle = props => {
  const {battle} = props
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
      <div className="row battle-stats" style={{padding: '2em'}}>
        <div className="col-6" style={{textAlign: 'center'}}>
          {/* <h3>{battle.players.map((player) => player.name).join(',\n')}</h3> */}
          {battle
            .getPlayers()
            .map(player => <h3 key={player.name}>{player.name}</h3>)}
          <hr />
          <h5>Attack : {battle.playerAttack()}</h5>
          <div>
            {/* <button className="btn btn-success">Buffs :</button> */}
            <h5>{'Buffs: ' + battle.buffs.getTotal('players')}</h5>
          </div>
          <hr />
          <h4>TOTAL : {battle.playerTotal()}</h4>
        </div>
        <div className="col-6" style={{textAlign: 'center'}}>
          <h3>{monster.name}</h3>
          <hr />
          <h5>Attack : {monster.level}</h5>
          <div>
            {/* <button className="btn btn-warning">Buffs :</button> */}
            <h5>{'Buffs: ' + battle.buffs.getTotal('monster')}</h5>
          </div>
          <hr />
          <h4>TOTAL : {battle.monsterTotal()}</h4>
        </div>
      </div>
      <audio autoPlay loop>
        <source src="./music/BattleatTrintanVillage.mp3" typ="audio/mp3" />
      </audio>
    </div>
  )
}

export default Battle
