/**
 * Created by mjehl on 2/17/2017.
 */
import { Injectable } from '@angular/core';

import { Http, Response, Headers, URLSearchParams, Jsonp }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Drink } from '../objects/drink';
import { Skill } from '../objects/skill';
import { Video } from '../objects/video';
import { Tool } from '../objects/tool';
import { ServedIn } from '../objects/glass';
import { Action } from '../objects/action';
import { Tag } from '../objects/tag';
import { Ingredient } from '../objects/ingredient';
import { Taste } from '../objects/taste';
import { Occasion } from '../objects/occasion';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class DrinkService {
  public ingredientTimes: number;
  public drinkTimes: number;
  private baseUrl = 'http://addb.absolutdrinks.com/';
  private nextUrl: string;
  private prevUrl: string;
  constructor(private http: Http, private jsonp: Jsonp, private sanitizer: DomSanitizer) {
    this.ingredientTimes = 0;
    this.drinkTimes = 0;
  }

  public getAllIngredients(): Observable <Ingredient[]> {
    let ingredients: Ingredient[] = [];
    return this.jsonp.get(
      this.baseUrl + 'ingredients/', {search: this.getParamsForIngredientRequest()})
      .map((res: Response) => {
        let body = res.json();
        let objects = body.result;
        objects.forEach((ingred: Ingredient) => {
          ingredients.push(this.getIngredientFromJson(ingred));
        });
        return ingredients;
      });
  }
  public getAllDrinks(): Observable<Drink[]> {
    let drinks: Drink[] = [];
    return this.jsonp.get(
      this.baseUrl
        + 'drinks/', {search: this.getParamsForDrinkRequest()})
      .map((res: Response) => {
        let body = res.json();
        let objects = body.result;
        objects.forEach((drink: Drink) => {
          drinks.push(this.getDrinkFromJson(drink));
        });
        return drinks;
      })
      .catch(this.handleError);
  }

  public searchForIngredient(name: string): Observable<Ingredient[]> {
    let ingredients: Ingredient[] = [];
    return this.jsonp.get(
      this.baseUrl
      + 'quickSearch/ingredients/'
      + name, {search: this.getParamsForIngredientRequest()})
      .map((res: Response) => {
        let body = res.json();
        let objects = body.result;
        objects.forEach((ingred: Ingredient) => {
          ingredients.push(this.getIngredientFromJson(ingred));
        });
        return ingredients;
      })
      .catch(this.handleError);
  }
  public searchForDrink(name: string): Observable<Drink[]> {
    let drinks: Drink[] = [];
    return this.jsonp.get(
      this.baseUrl
      + 'quickSearch/drinks/'
      + name, {search: this.getParamsForDrinkRequest()})
      .map((res: Response) => {
        let body = res.json();
        let objects = body.result;
        objects.forEach((drink: Drink) => {
          drinks.push(this.getDrinkFromJson(drink));
        });
        return drinks;
      })
      .catch(this.handleError);
  }

  private getIngredientFromJson(obj: any): Ingredient {
    console.log(obj);
    let ingred: Ingredient = new Ingredient();
    ingred.description = obj.description;
    ingred.id = obj.id;
    ingred.isAlcoholic = obj.isAlcoholic;
    ingred.type = obj.type;
    ingred.text = obj.name;
    ingred.textPlain = obj.textPlain;
    ingred.isCarbonated = obj.isCarbonated;
    return ingred;
  }
  private getDrinkFromJson(obj: Drink): Drink {
    let skill = new Skill(obj.skill.id, obj.skill.name, obj.skill.value);
    let videos: Video[] = [];
    obj.videos.forEach((vid: Video) => {
      videos.push(new Video(vid.video, vid.type));
      if ( vid.type === 'youtube' ) {
        let dangerousVideoUrl = 'https://www.youtube.com/embed/' + vid.video;
        obj.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
    }
    });
    let tags: Tag[] = [];
    obj.tags.forEach((tag: Tag) => {
      tags.push(new Tag(tag.name, tag.owner));
    });

    let glass: ServedIn = new ServedIn(obj.servedIn.id, obj.servedIn.text);

    let ingredients: Ingredient[] = [];
    obj.ingredients.forEach((ingredient: Ingredient) => {
      ingredients
        .push(new Ingredient(
          ingredient.type,
          ingredient.id,
          ingredient.text,
          ingredient.textPlain));
    });

    let tastes: Taste[] = [];
    obj.tastes.forEach((taste: Taste) => {
      tastes.push(new Taste(taste.id, taste.text));
    });

    let occasions: Occasion[] = [];
    obj.occasions.forEach((occ: Occasion) => {
      occasions.push(new Occasion(occ.id, occ.text));
    });

    let tools: Tool[] = [];
    obj.tools.forEach((tool: Tool) => {
      tools.push(new Tool(tool.id, tool.text));
    });

    let actions: Action[] = [];
    obj.actions.forEach((action: Action) => {
      actions.push(new Action(action.id, action.text));
    });

    let newDrink = new Drink(
      obj.description,
      obj.story,
      obj.color,
      skill,
      videos,
      obj.isAlcoholic,
      obj.isCarbonated,
      obj.isHot,
      tags,
      glass,
      ingredients,
      tastes,
      occasions,
      tools,
      actions,
      obj.brands,
      obj.languageBranch,
      obj.id,
      obj.name,
      obj.descriptionPlain
    );
    newDrink.youtubeLink = obj.youtubeLink;
    return newDrink;
  }
  public mycallback = function(data){
    console.log(data);
  }

  private handleError (error: Response | any) {
    console.log(error);
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
  private getParamsForIngredientRequest(): URLSearchParams {
    let params = new URLSearchParams();
    params.set('format', 'json'); // json response
    params.set('apiKey', '8b097f6e64974a8a8f15d806c2888562'); // api key
    params.set('callback', '__ng_jsonp__.__req' + this.drinkTimes + '.finished'); // callback
    this.drinkTimes = this.drinkTimes + 1;
    return params;
  }

  private getParamsForDrinkRequest(): URLSearchParams {
    let params = new URLSearchParams();
    params.set('format', 'json'); // json response
    params.set('apiKey', '8b097f6e64974a8a8f15d806c2888562'); // api key
    params.set('callback', '__ng_jsonp__.__req' + this.drinkTimes + '.finished'); // callback
    // params.set('callback', 'mycallback');
    this.drinkTimes = this.drinkTimes + 1;
    return params;
  }
}
