/**
 * Created by mjehl on 2/17/2017.
 */
import { Injectable } from '@angular/core';

import { Http, Response, Headers }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Drink } from '../objects/drink';

@Injectable()
export class DrinkService {
  public drinks: Drink[] = [];
  private proxyUrl = 'https://crossorigin.me/';
  private baseUrl = 'http://addb.absolutdrinks.com/';
  private apiCredentials = '?apiKey=8b097f6e64974a8a8f15d806c2888562';
  private language = '&lang=es';

  constructor(private http: Http) {
  }
  public getAllDrinks(): Observable<Drink[]> {
    let headers = new Headers({  });
    return this.http.get(
        this.proxyUrl
        + this.baseUrl
        + 'drinks/'
        + this.apiCredentials
        + '&pageSize=1')
      .map((res: Response) => {
        let body = res.json();
        console.log(body.result);
        let objects = body.result;
        objects.forEach((drink: Drink) => {
          console.log(drink);
          this.getDrinkFromJson(drink);
        });
        return body.result;
      })
      .catch(this.handleError);
  }

  public searchForDrink(name: string): Observable<Drink[]> {
    return this.http
      .get(this.proxyUrl
        + this.baseUrl
        + 'quickSearch/drinks/'
        + name
        + '/'
        + this.apiCredentials
        + this.language)
      .map(this.extractData).catch(this.handleError);
  }

  private getDrinkFromJson(obj: Drink): Drink {

    /* constructor(description?: string,
     story?: string,
     color?: string,
     skill?: Skill,
     videos?: Video[],
     isAlcoholic?: boolean,
     isCarbonated?: boolean,
     isHot?: boolean,
     tags?: Tag[],
     glass?: Glass,
     ingredients?: Ingredient[],
     tastes?: Taste[],
     occasions?: Occasion[],
     tools?: Tool[],
     actions?: Action[],
     brands?: string[],
     languageBranch?: string,
     id?: string,
     name?: string,
     descriptionPlain?: string
     ) */
    console.log('Description: ' + obj.description);
    let tempDrink = new Drink(
      obj.description
    );
    console.log(tempDrink);
  }
  // private extractData(res: Response): Observable<Drink[]> {
  //   let body = res.json();
  //   console.log(body);
  //   console.log(body.result);
  //   body.result.forEach((drink: Drink) => {
  //     console.log(drink.id);
  //     this.drinks.push(drink);
  //   });
  //   return body.data || { };
  // }
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
