
import {
  Component,
  OnInit
} from '@angular/core';
import { DrinkService } from '../services/get-drinks.service';
import { Observable } from 'rxjs';
import { Ingredient } from '../objects/ingredient';
@Component({
  selector: 'ingredient',
  templateUrl: 'ingredient.component.html',
  providers: [ ],
})
export class IngredientComponent implements OnInit {
  // Set our default values

  public errorMessage: string;
  public mode = 'Observable';
  public ingredients: Ingredient[] = [];
  public searching: boolean = false;
  constructor(
    private drinkService: DrinkService
  ) {    }
  public ngOnInit() {
    console.log('Init Ingredient component');
    this.drinkService.getAllIngredients()
      .subscribe((ingredients) => {
        this.ingredients = ingredients;
        console.log(ingredients);
      });
  }
  public searchForIngredient(searchItem: string) {
    this.searching = true;
    this.drinkService
      .searchForIngredient(searchItem)
      .subscribe(
        (ingredients) => {
          this.ingredients = ingredients;
          console.log(ingredients);

          this.searching = false;
        },
        (error) => this.errorMessage = <any> error
      );
  }
}
