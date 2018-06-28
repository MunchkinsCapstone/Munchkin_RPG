const chalk = require('chalk');
const log = (x) => console.log(chalk.green(x));
const Player = require('./Player');

let { Deck, equipments, monsters, shuffle, doors, treasures } = require('./cards');

function rollDie() {
    return Math.ceil(Math.random() * 6);
}

class Game {
    constructor(playerNames) {
		doors.shuffleCards();
        treasures.shuffleCards();
        this.players = shuffle(playerNames.map(playerName => new Player(playerName, this)));
        this.playerOrder = this.players.slice();
        this.currentPlayer = {};
        this.players.forEach(player => {
            for (let i = 0; i < 4; i++) {
                player.draw(doors);
                player.draw(treasures);
            }
        });
        this.isActive = true;
        this.phase = 1;
        this.battle = { isActive: false };
        this.startTurn = this.startTurn.bind(this);
        this.knockKnock = this.knockKnock.bind(this);
        this.startBattle = this.startBattle.bind(this);
        this.drawTreasure = this.drawTreasure.bind(this);
        this.lootRoom = this.lootRoom.bind(this);
        this.endTurn = this.endTurn.bind(this);
        this.startTurn();
    }

    startTurn() {
        this.currentPlayer = this.players.shift();
        this.phase = 1;
        this.currentPlayer.isActive = true;
        log(`ACTIVE PLAYER: ${this.currentPlayer.name}`)
    }

    knockKnock() {
        log('*knock* *knock*');
        const card = doors.draw();
        if (card.type === 'Monster') this.startBattle(card);
        else {
            log(`You found: ${card.name}`)
            this.currentPlayer.hand.push(card);
        }
        this.phase = 2;
    }

    drawTreasure() {
        this.currentPlayer.draw(treasures);
        log(this.currentPlayer.hand.map(card => card.name));
    }

    lootRoom () {
        this.currentPlayer.draw(doors);
        log(this.currentPlayer.hand.map(card => card.name));
        this.phase = 3;
    }

    endTurn() {
        if (this.currentPlayer.hand.length > this.currentPlayer.maxInventory) {
            return log('You are carrying too many items!');
        }
        else {
            this.currentPlayer.isActive = false;
            this.players.push(this.currentPlayer);
            this.startTurn();
        }
    }

    startBattle(monster) {
        this.battle = new Battle(monster, this);
    }

    endGame(playerName) {
        log(`${playerName} wins!`);
    }
}

class Battle {
    constructor(monster, game) {
        this.monsters = [monster];
        this.game = game;
        this.playerBuffs = [];
        this.monsterBuffs = [];
        this.combatants = [this.game.currentPlayer];
        this.combatants[0].inBattle = true;
        this.isActive = true;
        this.end = this.end.bind(this);
        this.flee = this.flee.bind(this);
        this.resolve = this.resolve.bind(this);
        log(`A '${monster.name} approaches you!`);
        log(`${monster.name}: ${monster.description}`);
        log(`Level: ${monster.level}`);
    }

    flee() {
        this.combatants.forEach(combatant => {
            const roll = rollDie();
            if (roll + combatant.run < 5) {
                log(`${combatant.name} failed to escape!`);
                monsters.forEach(monster => {
                    monster.badStuff(combatant);
                });
            } else log(`${combatant.name} got away safely!`);
        });
        this.end();
    }

    resolve() {
        const combatantsAttack = this.combatants
            .map(combatant => combatant.attack)
            .reduce((num1, num2) => num1 + num2);
        const monstersAttack = this.monsters
            .map(monster => monster.level)
            .reduce((num1, num2) => num1 + num2);
        if (combatantsAttack > monstersAttack) {
            this.monsters.forEach(monster => {
                monster.die();
                log(`The ${monster.name} has been slain!`);
                this.game.currentPlayer.levelUp();
                for (let i = 0; i < monster.treasures; i++) {
                    this.game.currentPlayer.draw(treasures);
                }
            });
        } else {
            this.combatants.forEach(combatant => {
                log(`${combatant.name} was defeated!`);
                // monsters.forEach(monster => {
                //     monster.badStuff(combatant);
                // });
            });
        }
        this.end();
    }

    end() {
        this.monsters.forEach(monster => {
            monster.discard();
        });
        this.playerBuffs.forEach(playerBuff => {
            playerBuff.discard();
        });
        this.monsterBuffs.forEach(monsterBuff => {
            monsterBuff.discard();
        });
        this.combatants.forEach(player => {
            player.inBattle = false;
        })
        this.game.battle = { isActive: false }
    }
}

module.exports = {
    Player,
    rollDie,
    shuffle,
    Battle,
    doors,
    treasures,
    log,
    Game
}