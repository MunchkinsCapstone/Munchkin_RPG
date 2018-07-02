import React from 'react'

const Battle = props => {
  const {battle} = props
  const monster = battle.monster
  const player = battle.player
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <img
            className="monster-view"
            style={{width: '100%'}}
            src={'/cardImages/' + monster.imageUrl}
            alt="https://i.pinimg.com/736x/6f/c0/50/6fc050ee0177c09195b3bb067898b403--big-daddy-custom-cards.jpg"
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div
          className="col-6"
          style={{backgroundColor: 'white', textAlign: 'center'}}
        >
          <h3>{player.name.toUpperCase()}</h3>
          <h5>Attack: {player.attack}</h5>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <button className="btn btn-success">Buffs:</button>
            <h5>{' ' + battle.buffs.getTotal('player')}</h5>
          </div>
          <hr />
          <h4>TOTAL: {battle.getAttack('player')}</h4>
        </div>
        <div
          style={{
            backgroundColor: 'white',
            textAlign: 'center',
            borderLeft: '1px solid grey'
          }}
          className="col-6"
        >
          <h3>{monster.name.toUpperCase()}</h3>
          <h5>Attack: {monster.attack}</h5>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <button className="btn btn-warning">Buffs:</button>
            <h5>{' ' + battle.buffs.getTotal('monster')}</h5>
          </div>
          <hr />
          <h4>TOTAL: {battle.getAttack('monster')}</h4>
        </div>
      </div>
      <audio autoPlay loop>
        <source src="./music/BattleatTrintanVillage.mp3" typ="audio/mp3" />
      </audio>
    </div>
  )
}

export default Battle
