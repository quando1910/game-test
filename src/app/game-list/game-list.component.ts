import { OnInit, Component, ViewChild } from '@angular/core';
import { GameService } from './game.service';
import { IGame } from './game.model';
import { delay, of } from 'rxjs';
import { SlickCarouselComponent } from 'src/shared/carousel';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  allGames: IGame[] = [];
  chunkGames: IGame[][] = [];
  loading: boolean = false;
  slideConfig = {
    arrows: false
  }
  chunkSize = 12;
  @ViewChild('slickModal', { static: true }) slickModal?: SlickCarouselComponent;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.getListGame();
  }

  getListGame() {
    this.loading = true;
    return of(this.gameService.randomListGames())
      .pipe(delay(500))
      .subscribe((res) => {
        this.loading = false;
        this.allGames = res;
        this.chunkGamesArray();
      });
  }

  chunkGamesArray() {
    this.chunkGames = [];
    for (let i = 0; i < this.allGames.length; i += this.chunkSize) {
      const chunk = this.allGames.slice(i, i + this.chunkSize);
      this.chunkGames.push(chunk);
    }
    this.slickModal?.initSlick();
  }
}
