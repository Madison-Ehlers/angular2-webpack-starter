/**
 * Created by mjehl on 2/18/2017.
 */
export class Skill {
  public id: string;
  public name: string;
  public value: number;

  constructor(id?: string, name?: string, value?: number){
    this.id = id;
    this.name = name;
    this.value = value;
  }
}
