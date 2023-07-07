import { Injectable } from '@angular/core';
import { IGame } from './game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  namesImageGame = [
    { fileName: '12Coins.webp', nameGame: '12 Coins' },
    { fileName: 'BookofDead.webp', nameGame: 'Book of Dead' },
    { fileName: 'BookOfRampage.webp', nameGame: 'Book Of Rampage' },
    { fileName: 'BuffaloTrail.webp', nameGame: 'Buffalo Trail' },
    { fileName: 'MoneyTrain2.webp', nameGame: 'Money Train 2' },
    { fileName: 'RaptorDoublemax.webp', nameGame: 'Raptor Double max' },
    { fileName: 'WinzToTheMoon.webp', nameGame: ' Winz To The Moon' },
  ];
  types = ['hot', 'new', 'promo'];
  games: IGame[] = [];
  total = 100;

  constructor() {}

  randomListGames() {
    this.games = Array(this.total)
      .fill(undefined)
      .map((_, i) => {
        // random file background game
        const randomIndexGame = Math.floor(
          Math.random() * this.namesImageGame.length
        );
        const name = this.namesImageGame[randomIndexGame];

        // random file type game
        const randomIndexType = Math.floor(
          Math.random() * this.types.length
        );
        const type = this.types.slice(0, randomIndexType)

        return {
          id: i + 1,
          src: `./assets/images/${name.fileName}`,
          type,
          name: name.nameGame,
        };
      });
    return this.games;
  }
}
