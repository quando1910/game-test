import { Component, Input } from '@angular/core';
import { IGame } from 'src/app/game-list/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  @Input() data?: IGame;
  @Input() preventClick?: boolean = false;

  constructor(private router: Router) {}

  navigateDetail() {
    if (!this.preventClick) {
      this.router.navigateByUrl(`game-detail/${this.data?.id}`);
    }
  }
}
