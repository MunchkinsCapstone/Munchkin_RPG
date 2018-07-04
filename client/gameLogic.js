const chalk = require('chalk')
const log = x => console.log(chalk.green(x))
const Player = require('./Player')

let {
  Deck,
  equipments,
  monsters,
  shuffle,
  doors,
  treasures,
  decks
} = require('./cards')

function rollDie() {
  return Math.ceil(Math.random() * 6)
}

const appendMethods = {
  game: game => {
    return Object.assign(game, {
      startTurn: () => {
        game.currentPlayer = game.players.shift()
        game.phase = 1
        game.currentPlayer.isActive = true
        log(`ACTIVE PLAYER: ${game.currentPlayer.name}`)
      },

      knockKnock: () => {
        log('*knock* *knock*')
        const card = doors.draw()
        if (card.type === 'Monster') {
          game.startBattle(card)
        } else if (card.type === 'Curse') {
          card.effect(game.currentPlayer)
          card.discard()
        } else {
          log(`You found: ${card.name}`)
          game.currentPlayer.hand.push(card)
        }
        game.phase = 2
      },

      drawTreasure: () => {
        game.currentPlayer.draw(treasures)
        log(game.currentPlayer.hand.map(card => card.name))
      },

      lootRoom: () => {
        game.currentPlayer.draw(doors)
        log(game.currentPlayer.hand.map(card => card.name))
        game.phase = 3
      },

      endTurn: () => {
        if (game.currentPlayer.hand.length > game.currentPlayer.maxInventory) {
          return log('You are carrying too many items!')
        } else {
          game.currentPlayer.isActive = false
          game.players.push(game.currentPlayer)
          game.startTurn()
        }
      },

      startBattle: monster => {
        game.battle = new Battle(monster, game)
      },

      endGame: playerName => {
        log(`${playerName} wins!`)
      }
    })
  },

  battle: battle => {
    return Object.assign(battle, {
      get playerAttack() {
        return battle.players.reduce(
          (total, player) => (total += player.attack),
          0
        )
      },

      get playerTotal() {
        return battle.playerAttack + battle.buffs.getTotal('players')
      },

      get monsterTotal() {
        return battle.monster.level + battle.buffs.getTotal('monster')
      },

      flee: () => {
        battle.players.forEach(player => {
          const roll = rollDie()
          if (roll + player.run < 5) {
            log(`${player.name} failed to escape!`)
            battle.monster.badStuff(player)
          } else log(`${player.name} got away safely!`)
        })
        battle.end()
      },

      resolve: () => {
        if (
          battle.players.some(
            player => player.class && player.class.name === 'Warrior'
          )
        ) {
          battle.playerTotal++
        }
        if (battle.playerTotal > battle.monsterTotal) {
          battle.monster.discard()
          log(`The ${battle.monster.name} has been slain!`)
          battle.players[0].levelUp()
          for (let i = 0; i < battle.monster.treasures; i++) {
            battle.players[0].draw(treasures)
          }
        } else {
          battle.players.forEach(player => {
            log(`${player.name} was defeated!`)
            battle.monster.badStuff(player)
          })
        }
        battle.end()
      },

      end: () => {
        battle.monster.discard()
        battle.buffs.players.forEach(buff => {
          buff.discard()
        })
        battle.buffs.monster.forEach(buff => {
          buff.discard()
        })
        battle.players.forEach(player => (player.inBattle = false))
        battle.game.battle = {isActive: false}
        battle.game.phase = 3
      }
    })
  },

  player: player => {
    return Object.assign(player, {
      get attack() {
        return player.level + player.bonus
      },

      draw: deck => {
        player.hand.push(deck.draw())
      },

      discard: cardIdx => {
        player.hand[cardIdx].discard()
        player.hand.splice(cardIdx, 1)
      },

      lose: card => {
        if (card) {
          if (player.hireling && card === player.hireling.card) {
            player.lose(player.hireling.equipment)
            player.hireling = null
          }
          if (player.allEquips.indexOf(card) > -1) {
            player.unequip(card)
          }
          player.discard(player.hand.indexOf(card))
        }
      },

      gift: (cardIdx, recipient) => {
        const card = player.hand[cardIdx]
        player.hand.splice(cardIdx, 1)
        recipient.hand.push(card)
      },

      checkRequirements: () => {
        let i = 0
        while (i < player.allEquips.length) {
          let item = player.allEquips[i]
          if (
            item.requirement &&
            !item.requirement(player) &&
            item !== player.hireling.equipment
          ) {
            player.unequip(item)
          } else i++
        }
      },

      equip: cardIdx => {
        const item = player.hand[cardIdx]
        if (item.name === 'Hireling') {
          player.hireling = {card: item, equipment: null}
          player.game.hireling = {player: player, card: item}
          player.allEquips.push(item)
          item.effect(player)
          player.hand.splice(cardIdx, 1)
        } else
          switch (item.type) {
            case 'Equipment':
              if (!item.requirement || item.requirement(player)) {
                if (item.bodyPart === 'hands') {
                  if (player.equipment.numHands + item.numHands > 2) {
                    while (player.equipment.hands.length) {
                      player.unequip(player.equipment.hands[0])
                    }
                  }
                  player.equipment.hands.push(item)
                  player.allEquips.push(item)
                  player.equipment.numHands += item.numHands
                } else if (item.bodyPart === 'misc') {
                  player.equipment.misc.push(item)
                  player.allEquips.push(item)
                } else {
                  if (player.equipment[item.bodyPart]) {
                    player.unequip(player.equipment[item.bodyPart])
                  }
                  player.equipment[item.bodyPart] = item
                  player.allEquips.push(item)
                }
                item.effect(player)
                player.hand.splice(cardIdx, 1)
              }
              break
            case 'Class':
              if (player.class) {
                player.unequip(player.class)
              }
              player.class = item
              player.allEquips.push(item)
              item.effect(player)
              player.hand.splice(cardIdx, 1)
              break
            case 'Race':
              if (player.race) {
                player.unequip(player.race)
              }
              player.race = item
              player.allEquips.push(item)
              item.effect(player)
              player.hand.splice(cardIdx, 1)
              break
            default:
              log('You cannot equip player item!')
          }
        player.checkRequirements()
      },

      unequip: item => {
        if (!item) return null
        switch (item.type) {
          case 'Equipment':
            const {bodyPart} = item
            if (bodyPart === 'hands' || bodyPart === 'misc') {
              player.equipment[bodyPart].splice(
                player.equipment[bodyPart].indexOf(item),
                1
              )
              player.equipment.numHands -= item.numHands
            } else {
              player.equipment[bodyPart] = null
            }
            player.allEquips.splice(player.allEquips.indexOf(item), 1)
            break
          case 'Class':
            player.allEquips.splice(player.allEquips.indexOf(item), 1)
            player.class = null
            break
          case 'Race':
            player.allEquips.splice(player.allEquips.indexOf(item), 1)
            player.race = null
            break
          default:
            log('You cannot equip player item!')
        }
        if (player.hireling && item === player.hireling.equipment)
          player.hireling.equipment = null
        player.hand.push(item)
        item.remove(player)
        player.checkRequirements()
      },

      equipToHireling: card => {
        if (card.type === 'Equipment') {
          player.hireling.equipment = card
          card.effect(player)
          const cardIdx = player.hand.indexOf(card)
          player.hand.splice(cardIdx, 1)
          player.allEquips.push(card)
        }
      },

      cast: (cardIdx, target) => {
        const card = player.hand[cardIdx]
        if (
          card.type === 'Spell' ||
          card.type === 'Curse' ||
          card.type === 'Boost' ||
          card.type === 'Buff'
        ) {
          card.effect(target)
          card.discard()
          player.hand.splice(cardIdx, 1)
        } else log('You cannot cast player item as a spell!')
      },

      assist: () => {
        player.game.battle.players.push(player)
        player.inBattle = true
      },

      levelUp: () => {
        player.level++
        log(player.name + ' went up one level!')
        if (player.level === 10) player.game.endGame(player.name)
      },

      levelDown: () => {
        if (player.level > 1) player.level--
        log(player.name + ' lost a level!')
      },

      die: () => {
        while (player.allEquips.length) {
          player.unequip(player.allEquips[0])
        }
        const players = player.game.playerOrder
        let i = players.indexOf(player)
        while (player.hand.length) {
          i = (i + 1) % players.length
          let player = players[i]
          if (player !== player) player.hand.push(player.hand.pop())
        }
        player.level = 1
      }
    })
  },

  deck: deck => {
    return Object.assign(deck, {
      draw: () => {
        if (!deck.cards.length) deck.restock()
        return deck.cards.shift()
      },

      shuffleCards: () => {
        deck.cards = shuffle(deck.cards)
      },

      restock: () => {
        deck.cards = deck.cards.concat(shuffle(deck.graveYard))
        deck.graveYard = []
      }
    })
  },

  card: card => {
    return Object.assign(card, {
      discard() {
        decks[card.deck].graveYard.unshift(card)
      }
    })
  }
}

appendMethods.deck(doors)
appendMethods.deck(treasures)

doors.cards.forEach(card => {
  appendMethods.card(card)
})
treasures.cards.forEach(card => {
  appendMethods.card(card)
})

class Game {
  constructor(playerNames) {
    doors.shuffleCards()
    treasures.shuffleCards()
    this.players = shuffle(
      playerNames.map(playerName => new Player(playerName, 'Male', this))
    )
    this.playerOrder = this.players.slice()
    this.currentPlayer = {}
    this.players.forEach(player => {
      appendMethods.player(player)
      for (let i = 0; i < 4; i++) {
        player.draw(doors)
        player.draw(treasures)
      }
    })
    this.isActive = true
    this.phase = 1
    this.battle = {isActive: false}
    this.hireling = null
    appendMethods.game(this)
    this.startTurn()
  }
}

class Battle {
  constructor(monster, game) {
    this.monster = monster
    this.game = game
    this.players = [this.game.currentPlayer]
    this.players[0].inBattle = true
    this.buffs = {
      players: [],
      monster: [],
      getTotal: side => {
        return this.buffs[side]
          .map(buff => buff.bonus)
          .reduce((num1, num2) => num1 + num2, 0)
      }
    }
    this.isActive = true
    log(`A '${monster.name} approaches you!`)
    log(`${monster.name}: ${monster.description}`)
    log(`Level: ${monster.level}`)
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
  Game,
  appendMethods
}
