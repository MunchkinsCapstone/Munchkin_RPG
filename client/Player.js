const chalk = require('chalk');
const log = x => console.log(chalk.green(x));
const { Race, Class, Equipment } = require('./cards');

class Player {
  constructor(name, game) {
    this.name = name;
    this.level = 1;
    this.run = 0;
    this.maxInventory = 5;
    this.race = new Race('Human', 'default image', () => {}, () => {});
    this.class = new Class('Commoner', 'default image', () => {}, () => {});
    this.isActive = false;
    this.equipment = {
      head: new Equipment('Bare', 'default image', 'head', () => {}, () => {}),
      torso: new Equipment('Rags', 'default image', 'head', () => {}, () => {}),
      leftHand: new Equipment(
        'Bare',
        'default image',
        'head',
        () => {},
        () => {}
      ),
      rightHand: new Equipment(
        'Bare',
        'default image',
        'head',
        () => {},
        () => {}
      ),
      legs: new Equipment('Rags', 'default image', 'head', () => {}, () => {}),
      feet: new Equipment('Bare', 'default image', 'head', () => {}, () => {}),
      get bonus() {
        return 0;
      }
    };
    this.hand = [];
    this.equip = this.equip.bind(this);
    this.unequip = this.unequip.bind(this);
    this.game = game;
    this.inBattle = false;
  }

  get attack() {
    return (
      this.level + this.class.bonus + this.race.bonus + this.equipment.bonus
    );
  }

  draw(deck) {
    this.hand.push(deck.draw());
  }

  gift(cardIdx, recipient) {
    const card = this.hand[cardIdx];
    this.hand.splice(cardIdx, 1);
    recipient.hand.push(card);
  }

  equip(cardIdx) {
    const item = this.hand[cardIdx];
    switch (item.type) {
      case 'Equipment':
        this.hand.splice(cardIdx, 1);
        this.equipment[item.bodyPart] = item;
        item.effect(this);
        break;
      case 'Class':
        this.hand.splice(cardIdx, 1);
        this.class = item;
        item.effect(this);
        break;
      case 'Race':
        this.hand.splice(cardIdx, 1);
        this.race = item;
        item.effect(this);
        break;
      default:
        log('You cannot equip this item!');
    }
  }

  unequip(item) {
    switch (item.type) {
      case 'Equipment':
        this.equipment[item.bodyPart] = null;
        break;
      case 'Class':
        this.class = null;
        break;
      case 'Race':
        this.race = null;
        break;
      default:
        log('You cannot equip this item!');
    }
    this.hand.push(item);
    item.remove(this);
  }

  cast(cardIdx, target) {
    const card = this.hand[cardIdx];
    if (card.type === 'Spell') {
      card.effect(target);
      this.hand.splice(cardIdx, 1);
    } else log('You cannot cast this item as a spell!');
  }

  levelUp() {
    this.level++;
    log(this.name + ' went up one level!');
    if (this.level === 10) this.game.endGame(this.name);
  }

  die() {
    Object.assign(this, new Player(this.name));
  }
}

module.exports = Player;
