/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { DrinkService } from './services/get-drinks.service';
import { Drink } from './objects/drink';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: 'app.component.html',
  providers: [DrinkService]
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  public errorMessage: string;
  public mode = 'Observable';
  public drinks: Drink[] = [];
  public drinkSearch: string = '';
  public myColor: string = 'accent';

  constructor(
    private drinkService: DrinkService
  ) {}

  public ngOnInit() {
    console.log('Initializing');
  }
  public getDrinks() {
    this.drinkService.getAllDrinks()
      .subscribe(
        (drinks) => this.drinks = drinks,
        (error) => this.errorMessage = <any> error
      );
  }
  public searchForDrink() {
    console.log('Value of drink search: ' + this.drinkSearch);
    this.drinkService
      .searchForDrink(this.drinkSearch)
      .subscribe(
        (drinks) => this.drinks = drinks,
        (error) => this.errorMessage = <any> error
      );
  }
  public onKey(event: any) { // without type info
    this.drinkSearch = event.target.value;
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
