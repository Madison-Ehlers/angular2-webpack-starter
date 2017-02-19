/**
 * Created by mjehl on 2/18/2017.
 */
export class Video {
  public video: string;
  public type: string;
  constructor(video?: string, type?: string){
    this.video = video;
    this.type = type;
  }
}
