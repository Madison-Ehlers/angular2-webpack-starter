/**
 * Created by mjehl on 2/18/2017.
 */
export class Action {
  public id: string;
  public text: string;
  constructor(id?: string, text?: string) {
    this.id = id;
    this.text = text;
  }
}
