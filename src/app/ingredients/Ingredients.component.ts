/**
 * Created by mjehl on 2/26/2017.
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from './title';
import { DrinkService } from '../services/get-drinks.service';
import { Drink } from '../objects/drink';
import { Video } from '../objects/video';
import { Observable } from 'rxjs';

@Component({
  selector: 'home',
  providers: [
    DrinkService,
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './ingredients.component.css' ],
  templateUrl: 'ingredients.component.html',
  // Every Angular template is first compiled by the browser before Angular runs it's compiler

})
export class IngredientsComponent implements OnInit {
  // Set our default values

  public errorMessage: string;
  public mode = 'Observable';
  public searching: boolean = false;

  // TypeScript public modifiers
  constructor(
    public title: Title,
    private drinkService: DrinkService
  ) { }

  public ngOnInit() {
    this.drinkService.getAllIngredients()
      .subscribe((ingredients) => {
        console.log(ingredients);
      });
  }
}
