import { ITimeline } from '../types/timeline.interface';
import { IAnimation } from '../types/animation.interface';

export class Timeline implements ITimeline {
  start: number;
  end: number;
  animations: IAnimation[];

  /**
   *
   * @param start start position relative to the viewport
   * @param end end position relative to the viewport
   * @param animations an array of animation objects
   */
  constructor(start: number, end: number, animations?: IAnimation[]) {
    this.start = start;
    this.end = end;
    this.animations = animations;
  }

  setStart() {
    const windowHeight = window.innerHeight;
    return windowHeight * (this.start / 100);
  }

  setEnd() {
    const windowHeight = window.innerHeight;
    return windowHeight * (this.end / 100);
  }

  showIndicators() {
    this.setStartIndicator();
    this.setEndIndicator();
  }

  setStartIndicator() {
    const startPoint = this.setStart();
    const divEl = document.createElement('DIV');
    divEl.style.cssText = `height: 2px; width: 20px; background-color: rgba(0,255,255,1); position: fixed; top: ${startPoint}px; right: 20px;`;
    divEl.innerText = 'Start here';
    document.body.appendChild(divEl);
  }

  setEndIndicator() {
    const endPoint = this.setEnd();
    const divEl = document.createElement('DIV');
    divEl.style.cssText = `height: 2px; width: 20px; background-color: rgba(0,255,255,1); position: fixed; top: ${endPoint}px; right: 20px;`;
    divEl.innerText = 'End here';
    document.body.appendChild(divEl);
  }

  addAnimation(animation: IAnimation) {
    this.animations.push(animation);
  }

  getAnimations() {
    console.log('ANIMATIONS', this.animations);
  }

  handleScroll(animation: IAnimation, startPoint: number, endPoint: number, animationDistance: number): void {
    const elPos = (animation.element as HTMLElement).offsetTop;
    const startAnimation = elPos - startPoint;
    const endAnimation = elPos - endPoint;
    const relativeScroll = window.scrollY - (elPos - this.setStart());
    const scrollRatio = animation.options.to / animation.options.from;
    let reached = false;
    if (window.scrollY >= startAnimation && (relativeScroll * 100) / animationDistance <= 100) {
      console.log(`reached ${animation.element.className}`);
      animation.element.style.width = `${50 + (relativeScroll * 100) / animationDistance / scrollRatio}%`;
      reached = true;
    }
    if (window.scrollY >= endAnimation) {
      console.log(`reached end of ${animation.element.className}`);
    }
  }

  init() {
    const startPoint = this.setStart();
    const endPoint = this.setEnd();
    const animationDistance = startPoint - endPoint;
    this.animations.forEach((animation) => {
      window.addEventListener('scroll', () => {
        this.handleScroll(animation, startPoint, endPoint, animationDistance);
      });
    });
  }
}
