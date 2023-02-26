import { ITrigger } from '../types/trigger.interface';
export class Trigger implements ITrigger {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  getElement() {
    return this.element;
  }

  getPosY() {
    const el = this.getElement();
    return el.getBoundingClientRect().y;
  }

  addIndicator() {
    const el = this.getElement();
    const posY = el.getBoundingClientRect().y;
    const divEl = document.createElement('DIV');
    divEl.style.height = '2px';
    divEl.style.width = '20px';
    divEl.style.backgroundColor = 'rgba(0,0,255,1)';
    divEl.style.position = 'absolute';
    divEl.style.top = `${posY}px`;
    divEl.innerText = 'Trigger';
    document.body.appendChild(divEl);
  }
}
