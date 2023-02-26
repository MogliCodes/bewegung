import { IAnimation } from '../types/animation.interface';

export class Animation implements IAnimation {
  element: HTMLElement;
  options: AnimationOptions;

  constructor(element: HTMLElement, options: AnimationOptions) {
    this.element = element;
    this.options = options;
  }
}
