import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Shape } from 'ngx-color/helpers';

@Component({
  selector: 'color-sketch-preset-colors',
  template: `
  <div class="sketch-swatches">
    <div class="sketch-wrap" *ngFor="let c of colors">
      <color-swatch
        [color]="normalizeValue(c).color"
        [style]="swatchStyle"
        [focusStyle]="focusStyle(c)"
        (onClick)="handleClick($event)"
        (onHover)="onSwatchHover.emit($event)"
        class="swatch"
      ></color-swatch>
    </div>
  </div>
  `,
  styles: [`
    .sketch-swatches {
      margin: 0px -10px;
      padding: 10px 0px 0px 10px;
      border-top: 1px solid rgb(238, 238, 238);
      display: flex;
      flex-wrap: wrap;
      position: relative;
    }
    .sketch-wrap {
      width: 16px;
      height: 16px;
      margin: 0px 10px 10px 0px;
    }
  `],
})
export class SketchPresetColorsComponent implements OnInit {
  @Input() colors: string[] | Shape[];
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();
  swatchStyle = {
    'border-radius': '3px',
    'box-shadow': 'inset 0 0 0 1px rgba(0,0,0,.15)',
  };

  constructor() { }

  ngOnInit() {
  }
  handleClick({hex, $event}) {
    this.onClick.emit({hex, $event});
  }
  normalizeValue(val: string | Shape) {
    if (typeof val === 'string') {
      return { color: val };
    }
    return val;
  }
  focusStyle(val: string | Shape) {
    const c = this.normalizeValue(val);
    return {
      'box-shadow': `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${ c.color }`,
    };
  }

}
