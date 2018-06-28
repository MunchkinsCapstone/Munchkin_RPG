import React from 'react';

const Battle = props => {
  const { battle } = props;
  const monster = battle.monsters[0];
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <img
            className="monster-view"
            style={{ width: '100%' }}
            src={'/cardImages/' + monster.imageUrl}
            alt="https://i.pinimg.com/736x/6f/c0/50/6fc050ee0177c09195b3bb067898b403--big-daddy-custom-cards.jpg"
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div
          className="col-6"
          style={{ backgroundColor: 'white', textAlign: 'center' }}
        >
          <h3>PLAYER(S)</h3>
          <h5>Attack: 1</h5>
          <h5>Buff: 0</h5>
          <h5>Debuff: 0</h5>
          <hr />
          <h4>TOTAL: 1</h4>
          <button className="btn btn-success">Add Buff</button>
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
          <h5>Level: {monster.level}</h5>
          <h5>Buff: {monster.allBuffs}</h5>
          <h5>Debuff: 0</h5>
          <hr />
          <h4>TOTAL: {monster.total}</h4>
          <button className="btn btn-warning">Add Buff</button>
        </div>
      </div>
    </div>
  );
};

export default Battle;
