import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GameService } from './game.service';
import { IGame } from './game.model';
import { Observable, concatMap, delay, from, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  listsGame: IGame[] = [];
  listsAll: IGame[] = [];
  currentPage = 0;
  pageSize = 6;
  numberOfPage = 0;

  constructor(private gameService: GameService, private router: Router) {
    console.log(window.innerWidth);
    this.listsAll = this.gameService.randomListGames();

    const widthWindow = window.innerWidth;
    if (widthWindow > 1025) {
      this.pageSize = 8;
    }
    if (widthWindow > 1441) {
      this.pageSize = 10;
    }
    if (widthWindow > 1921) {
      this.pageSize = 12;
    }

    this.numberOfPage = Math.ceil(this.gameService.total / this.pageSize);
  }

  ngOnInit(): void {
    this.getListGame();
  }

  getListGame() {
    const start = this.currentPage * this.pageSize;
    const end = (this.currentPage + 1) * this.pageSize;
    const list = this.listsAll.slice(start, end);

    return of(list)
      .pipe(delay(500))
      .subscribe((item) => {
        this.listsGame = item;
        console.log(item);
      });
  }
  nextPage() {
    if (this.currentPage + 1 === this.numberOfPage) {
      this.currentPage = 0;
      this.getListGame();
    } else {
      this.currentPage += 1;
      this.getListGame();
    }
  }
  previous() {
    if (this.currentPage === 0) {
      this.currentPage = this.numberOfPage;
    }
    this.currentPage -= 1;
    this.getListGame();
  }
  navigateDetail(id: number) {
    this.router.navigateByUrl(`game-detail/${id}`);
  }
}
