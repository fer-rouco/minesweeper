import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CustomButtonComponent } from '../../../framework/controls/button/button.component';

@Component({
    selector: 'app-page-not-found',
    template: `
      <div class="page-not-found">
        <h1 class="page-not-found__message" >Page not found!</h1>
        <br/>
        <div class="page-not-found__buttons">
          <custom-button (click)='navigateToSetup()' >
            Go to Setup
          </custom-button>
          <custom-button (click)='navigateToBoard()' >
            Go to Board
          </custom-button>
        </div>
      </div>
    `,
    styles: [`
      .page-not-found {
        text-align: center;

        &__message {
          font-size: 3rem;
        }

        &__buttons {
          display: flex;
          justify-content: center; 
        }
      }
    `],
    imports: [CustomButtonComponent]
})
export class PageNotFoundComponent {
  constructor(@Inject(Router) protected router: Router) {}

  public navigateToBoard(): void {
    this.router.navigateByUrl('/board');
  }

  public navigateToSetup(): void {
    this.router.navigateByUrl('/setup');
  }
}
