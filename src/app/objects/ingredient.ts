/**
 * Created by mjehl on 2/18/2017.
 */
export class Ingredient{
  public type: string;
  public id: string;
  public text: string;
  public textPlain: string;
  constructor(type?: string, id?: string, text?: string, textPlain?: string){
    this.type = type;
    this.id = id;
    this.text = text;
    this.textPlain = textPlain;
  }
}
