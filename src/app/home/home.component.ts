import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { DrinkService } from '../services/get-drinks.service';
import { Drink } from '../objects/drink';
import { Video } from '../objects/video';
import {Observable} from "rxjs";

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
  templateUrl: 'home.component.html',
  // Every Angular template is first compiled by the browser before Angular runs it's compiler

})
export class HomeComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };

  public errorMessage: string;
  public mode = 'Observable';
  public drinks: Drink[];
  public searching: boolean = false;

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title,
    private drinkService: DrinkService
  ) { }

  public ngOnInit() {
    this.drinkService.getAllIngredients()
      .subscribe(() => {});
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
  public searchForDrink(searchItem: string) {
    this.searching = true;
    this.drinkService
      .searchForDrink(searchItem)
      .subscribe(
        (drinks) => {
          this.drinks = drinks;
          this.searching = false;
        },
        (error) => this.errorMessage = <any> error
      );
  }
}
