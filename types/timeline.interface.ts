import { IAnimation } from './animation.interface';

export interface ITimeline {
  start: number;
  end: number;
  animations: IAnimation[];
}
