import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  constructor(protected router: Router) {
  }

  public navigateToBoard(): void {
    this.router.navigateByUrl('/board');
  }

  public navigateToSetup(): void {
    this.router.navigateByUrl('/setup');
  }
}
