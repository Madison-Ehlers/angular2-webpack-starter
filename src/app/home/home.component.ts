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
  // templateUrl: './home.component.html'
//   template:
//     `
//       <h1>Wikipedia Demo</h1>
//       <p>Search after each keystroke</p>
//       <input #term (keyup)="search(term.value)"/>
//       <!--<ul>-->
//         <!--<li *ngFor="let item of items | async">{{item.name}}</li>-->
//       <!--</ul>-->
//  <div *ngFor="let drink of drinks | async">
//   <div class="flex-item Aligner">
//     <md-card>
//       <md-card-header>
//         <img md-card-avatar src="http://assets.absolutdrinks.com/drinks/300x400/{{drink.id}}.png">
//         <md-card-title>{{drink.name}}</md-card-title>
//       </md-card-header>
//       <md-card-content>
//         <div class="Aligner">
//
//           <md-tab-group>
//             <md-tab label="Overview">
//               <p>{{drink.descriptionPlain}}</p>
//               <p>Skill required to make drink: {{drink.skill.name}}</p>
//               <h4>Ingredients</h4>
//               <li *ngFor="let ingredient of drink.ingredients">
//                 {{ingredient.textPlain}}
//               </li><br>
//
//               <h4>Tastes</h4>
//               <li *ngFor="let taste of drink.tastes">
//                 {{taste.text}}
//               </li><br>
//               <p>Served in a {{drink.servedIn.text}}</p>
//
//
//             </md-tab>
//             <md-tab label="Video">
//               <iframe width="640" height="360" [src]="drink.youtubeLink" frameborder="0" allowfullscreen></iframe>
//             </md-tab>
//           </md-tab-group>
//
//         </div>
//       </md-card-content>
//     </md-card>
//   </div>
// </div>
//
//     `
})
export class HomeComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };

  public errorMessage: string;
  public mode = 'Observable';
  public drinks: Drink[];
  public drinkSearch: string = '';
  public searching: boolean = false;
  items: Drink[];
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
  // search (term: string) {
  //   this.drinks = this.drinkService.search(term)
  //     .subscribe(
  //       (drinks) => {this.drinks = drinks},
  //       (error) => this.errorMessage = <any> error
  //     );
  // }
  public searchForDrink(searchItem: string) {
    console.log('Value of drink search: ' + this.drinkSearch);
    this.searching = true;
    //this.drinks = [];
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
  public onKey(event: any) { // without type info
    this.drinkSearch = event.target.value;
  }
}
