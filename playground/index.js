import { Timeline, Trigger, Animation } from './../dist/main.js';

const timeline = new Timeline(75, 25, []);
const el = document.querySelector('.anim');
const el2 = document.querySelector('.anim-2');
const animation = new Animation(el, { from: 50, to: 100 });
const animation2 = new Animation(el2, { from: 50, to: 100 });
timeline.showIndicators();
timeline.addAnimation(animation);
timeline.addAnimation(animation2);
timeline.getAnimations();
timeline.init();
