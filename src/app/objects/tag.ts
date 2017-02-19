/**
 * Created by mjehl on 2/18/2017.
 */
export class Tag {
  public owner: string;
  public name: string;
  constructor(owner?: string, name?: string) {
    this.owner = owner;
    this.name = name;
  }
}
