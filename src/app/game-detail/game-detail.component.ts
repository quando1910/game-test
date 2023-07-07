import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game-list/game.service';
import { IGame } from '../game-list/game.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  detail?: IGame;
  arrayGames: IGame[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private gameService: GameService
  ) {}
  public ngOnInit() {
    this.gameService.games;
    if (this.gameService.games.length) {
      this.arrayGames = this.gameService.games;
    } else {
      this.arrayGames = this.gameService.randomListGames();
    }
    const id = this.activeRoute.snapshot.paramMap.get('id') || 0;

    this.detail = this.arrayGames?.find(x => +x.id === +id);
  }
}
