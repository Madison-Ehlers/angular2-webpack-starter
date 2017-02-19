import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { DrinkService } from '../services/get-drinks.service';
import { Drink } from '../objects/drink';
import { Video } from '../objects/video';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    DrinkService,
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };

  public errorMessage: string;
  public mode = 'Observable';
  public drinks: Drink [] = [];
  public drinkSearch: string = '';
  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title,
    private drinkService: DrinkService
  ) { }

  public ngOnInit() {
    this.getDrinks(); // load drinks up
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
  public getDrinks() {
    this.drinkService.getAllDrinks()
      .subscribe(
        (drinks) => {
          this.drinks = drinks;
          console.log(this.drinks);
        },
        (error) => {
          this.errorMessage = <any> error;
        }
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
