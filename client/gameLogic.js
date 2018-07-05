const chalk = require('chalk')
const log = x => console.log(chalk.green(x))
const Player = require('./Player')
import {openSnackbar} from './components/Snackbar'
import {SnackbarContent} from '@material-ui/core'

let {
  Deck,
  equipments,
  monsters,
  shuffle,
  doors,
  treasures,
  decks,
  allCards
} = require('./cards')

function rollDie() {
  return Math.ceil(Math.random() * 6)
}

const appendMethods = {
  game: game => {
    game.startTurn = () => {
      game.phase = 1
      game.players[game.turn].isActive = true
      log(`ACTIVE PLAYER: ${game.players[game.turn].name}`)
    }

    game.knockKnock = () => {
      log('*knock* *knock*')
      const card = doors.draw()
      if (card.type === 'Monster') {
        game.startBattle(card)
        // } else if (card.type === 'Curse') {
        //   card.effect(game.players[game.turn])
        //   card.discard()
      } else {
        log(`You found: ${card.name}`)
        openSnackbar(`You drew the ${card.name} card.`)
        game.players[game.turn].hand.push(card)
      }
      game.phase = 2
    }

    game.drawTreasure = () => {
      game.players[game.turn].draw(treasures)
      log(game.players[game.turn].hand.map(card => card.name))
    }

    game.lootRoom = () => {
      game.players[game.turn].draw(doors)
      log(game.players[game.turn].hand.map(card => card.name))
      openSnackbar(
        `You looted the ${
          game.players[game.turn].hand[game.players[game.turn].hand.length - 1]
            .name
        } card.`
      )
      game.phase = 3
    }

    game.endTurn = () => {
      if (
        game.players[game.turn].hand.length >
        game.players[game.turn].maxInventory
      ) {
        openSnackbar(
          `You are carrying too many items! Please discard or use ${game
            .players[game.turn].hand.length -
            game.players[game.turn].maxInventory} more cards.`
        )
        return log('You are carrying too many items!')
      } else {
        game.players[game.turn].isActive = false
        game.turn = (game.turn + 1) % game.numPlayers
        game.startTurn()
      }
    }

    game.startBattle = monster => {
      game.battle = appendMethods.battle(new Battle(monster, game))
      openSnackbar(`You encountered a ${monster.name}!`)
    }

    game.endGame = playerName => {
      log(`${playerName} wins!`)
    }
    return game
  },

  battle: battle => {
    battle.getPlayers = () => {
      return battle.players.map(playerIdx => battle.game.players[playerIdx])
    }

    battle.playerAttack = () => {
      // debugger
      return battle.getPlayers().reduce((total, player) => {
        return (total += appendMethods.player(player).attack())
      }, 0)
    }

    battle.playerTotal = () => {
      return battle.playerAttack() + battle.buffs.getTotal('players')
    }

    battle.monsterTotal = () => {
      return battle.monster.level + battle.buffs.getTotal('monster')
    }

    battle.buffs.getTotal = side => {
      return battle.buffs[side]
        .map(buff => buff.bonus)
        .reduce((num1, num2) => num1 + num2, 0)
    }

    battle.flee = () => {
      battle.getPlayers().forEach(player => {
        const roll = rollDie()
        if (roll + player.run < 5) {
          openSnackbar(`${player.name} failed to escape!`)
          log(`${player.name} failed to escape!`)
          battle.monster.badStuff(player)
        } else SnackbarContent(`${player.name} got away safely!`)
      })
      battle.end()
    }

    battle.resolve = () => {
      console.log(battle)
      const playerTotal = battle.playerTotal()
      if (
        battle
          .getPlayers()
          .some(player => player.class && player.class.name === 'Warrior')
      ) {
        playerTotal++
      }
      if (playerTotal > battle.monsterTotal()) {
        battle.monster.discard()
        openSnackbar(`The ${battle.monster.name} has been slain!`)
        log(`The ${battle.monster.name} has been slain!`)
        battle.getPlayers()[0].levelUp()
        log(`You went up one level!`)
        for (let i = 0; i < battle.monster.treasures; i++) {
          battle.getPlayers()[0].draw(treasures)
        }
      } else {
        battle.getPlayers().forEach(player => {
          openSnackbar(`${player.name} was defeated!`)
          log(`${player.name} was defeated!`)
          battle.monster.badStuff(player)
        })
      }
      battle.end()
    }

    battle.end = () => {
      battle.monster.discard()
      battle.buffs.players.forEach(buff => {
        buff.discard()
      })
      battle.buffs.monster.forEach(buff => {
        buff.discard()
      })
      battle.players.forEach(
        playerIdx => (battle.game.players[playerIdx].inBattle = false)
      )
      battle.game.battle = {isActive: false}
      battle.game.phase = 3
    }
    return battle
  },

  player: player => {
    player.attack = () => {
      return player.level + player.bonus
    }

    player.draw = deck => {
      player.hand.push(deck.draw())
    }

    player.discard = cardIdx => {
      player.hand[cardIdx].discard()
      player.hand.splice(cardIdx, 1)
    }

    player.lose = card => {
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
    }

    player.gift = (cardIdx, recipient) => {
      const card = player.hand[cardIdx]
      player.hand.splice(cardIdx, 1)
      recipient.hand.push(card)
    }

    player.checkRequirements = () => {
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
    }

    player.equip = cardIdx => {
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
    }

    player.unequip = item => {
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
    }

    player.equipToHireling = card => {
      if (card.type === 'Equipment') {
        player.hireling.equipment = card
        card.effect(player)
        const cardIdx = player.hand.indexOf(card)
        player.hand.splice(cardIdx, 1)
        player.allEquips.push(card)
      }
    }

    player.cast = (cardIdx, target) => {
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
    }

    player.assist = () => {
      player.game.battle.players.push(player.game.players.indexOf(player))
      player.inBattle = true
    }

    player.levelUp = () => {
      player.level++
      log(player.name + ' went up one level!')
      if (player.level === 10) player.game.endGame(player.name)
    }

    player.levelDown = () => {
      if (player.level > 1) player.level--
      log(player.name + ' lost a level!')
    }

    player.die = () => {
      while (player.allEquips.length) {
        player.unequip(player.allEquips[0])
      }
      const players = player.game.players
      let i = player.game.turn
      while (player.hand.length) {
        i = (i + 1) % players.length
        let otherPlayer = players[i]
        if (otherPlayer !== player) otherPlayer.hand.push(player.hand.pop())
      }
      player.level = 1
    }
    return player
  },

  deck: deck => {
    deck.draw = () => {
      if (!deck.cards.length) deck.restock()
      return deck.cards.shift()
    }

    deck.shuffleCards = () => {
      deck.cards = shuffle(deck.cards)
    }

    deck.restock = () => {
      deck.cards = deck.cards.concat(shuffle(deck.graveYard))
      deck.graveYard = []
    }
    return deck
  },

  card: card => {
    card.discard = () => {
      decks[card.deck].graveYard.unshift(card)
    }
    // card.requirement = () => true
    return card
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
      playerNames.map(playerName =>
        appendMethods.player(new Player(playerName, 'Male', this))
      )
    )
    this.numPlayers = this.players.length
    this.turn = 0
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
    this.players = [this.game.turn]
    this.game.players[this.game.turn].inBattle = true
    this.buffs = {
      players: [],
      monster: []
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
  appendMethods,
  allCards
}
