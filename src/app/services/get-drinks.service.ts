/**
 * Created by mjehl on 2/17/2017.
 */
import { Injectable } from '@angular/core';

import {Http, Response, Headers, URLSearchParams, Jsonp}          from '@angular/http';
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

@Injectable()
export class DrinkService {
  private proxyUrl = 'https://crossorigin.me/';
  private baseUrl = 'http://addb.absolutdrinks.com/';
  private apiCredentials = '?apiKey=8b097f6e64974a8a8f15d806c2888562';
  private language = '&lang=en';
  private times: number;

  constructor(private http: Http, private jsonp: Jsonp) {
    this.times = 0;
  }
  public getAllDrinks(): Observable<Drink[]> {
    let headers = new Headers({  });
    let drinks: Drink[] = [];

    return this.http.get(
        this.proxyUrl
        + this.baseUrl
        + 'drinks/'
        + this.apiCredentials)
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
  search (term: string) {
    let wikiUrl = 'http://en.wikipedia.org/w/api.php';
    let params = new URLSearchParams();
     params.set('search', term); // the user's search value
     params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', '__ng_jsonp__.__req$'+ this.times + '.finished');
    // params.set('apiKey', '8b097f6e64974a8a8f15d806c2888562');
    this.times=this.times+1;
// TODO: Add error handling
    return this.jsonp
      .get(wikiUrl, { search: params })
      .map(response => <string[]> response.json()[1]);
  }
  public searchForDrink(name: string): Observable<Drink[]> {
    let drinks: Drink[] = [];
    return this.http
      .get(this.proxyUrl
        + this.baseUrl
        + 'quickSearch/drinks/'
        + name
        + '/'
        + this.apiCredentials
        + this.language)
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

  private getDrinkFromJson(obj: Drink): Drink {
    let skill = new Skill(obj.skill.id, obj.skill.name, obj.skill.value);
    let videos: Video[] = [];
    obj.videos.forEach((vid: Video) => {
      videos.push(new Video(vid.video, vid.type));
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

    return new Drink(
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
}
