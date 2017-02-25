/**
 * Created by mjehl on 2/17/2017.
 */

import { Skill } from './skill';
import { Video } from './video';
import { Tag } from './tag';
import { ServedIn } from './glass';
import { Ingredient } from './ingredient';
import { Taste } from './taste';
import { Occasion } from './occasion';
import { Tool } from './tool';
import { Action } from './action';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Drink {
  public description: string;
  public story: string;
  public color: string;
  public skill: Skill;
  public videos: Video[];
  public isAlcoholic: boolean;
  public isCarbonated: boolean;
  public isHot: boolean;
  public tags: Tag[];
  public servedIn: ServedIn;
  public ingredients: Ingredient[];
  public tastes: Taste[];
  public occasions: Occasion[];
  public tools: Tool[];
  public actions: Action[];
  public brands: string[];
  public languageBranch: string;
  public id: string;
  public name: string;
  public descriptionPlain: string;
  public youtubeLink: SafeResourceUrl;

  constructor(description?: string,
              story?: string,
              color?: string,
              skill?: Skill,
              videos?: Video[],
              isAlcoholic?: boolean,
              isCarbonated?: boolean,
              isHot?: boolean,
              tags?: Tag[],
              glass?: ServedIn,
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
  ) {
    this.description = description;
    this.story = story;
    this.color = color;
    this.skill = skill;
    this.videos = videos;
    this.isAlcoholic = isAlcoholic;
    this.isCarbonated = isCarbonated;
    this.isHot = isHot;
    this.tags = tags;
    this.servedIn = glass;
    this.ingredients = ingredients;
    this.tastes = tastes;
    this.occasions = occasions;
    this.tools = tools;
    this.actions = actions;
    this.brands = brands;
    this.languageBranch = languageBranch;
    this.id = id;
    this.name = name;
    this.descriptionPlain = descriptionPlain;
    this.youtubeLink = null;

  }
}
