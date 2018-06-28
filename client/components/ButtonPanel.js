import React, { Component } from 'react';

export const ButtonPanel = (props) => {
    const { game, startGame, knockKnock, fight, flee, lootRoom, endTurn, discard } = props;
    if (!game.isActive) return (
        <div className='flexContainer'>
            <button type='button' className='btn btn-dark' onClick={startGame}>
                Start Game
            </button>
        </div>
    );
    if (game.battle.isActive) return (
        <div className='flexContainer'>
            <button type='button' className='btn btn-danger' onClick={fight}>
                Fight!
            </button>
            <button type='button' className='btn btn-warning' onClick={flee}>
                Flee!
            </button>
        </div>
    );
    if (game.phase === 1) return (
        <div className='flexContainer'>
            <button type='button' className='btn btn-primary' onClick={knockKnock}>
                Kick Door
            </button>
        </div>
    );
    if (game.phase === 2) return (
        <div className='flexContainer'>
            <button type='button' className='btn btn-danger' onClick={endTurn}>
                Look For Trouble
            </button>
            <button type='button' className='btn btn-success' onClick={lootRoom}>
                Loot The Room
            </button>
        </div>
    );
    if (game.phase === 3) return (
        <div className='flexContainer'>
            <button type='button' className='btn btn-secondary' onClick={discard}>
                Discard
            </button>
            <button type='button' className='btn btn-info' onClick={endTurn}>
                End Turn
            </button>
        </div>
    );
}

export default ButtonPanel;