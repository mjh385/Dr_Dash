import {
    Component,
    Input,
    Output,
    SimpleChanges,
    EventEmitter,
    ElementRef,
    OnChanges,
    ChangeDetectionStrategy,
} from '@angular/core';
import { select } from 'd3-selection';
import { id } from '../utils/id';

@Component({
    selector: 'g[ngx-charts-area]',
    template: `
    <svg:defs *ngIf="gradient">
      <svg:g ngx-charts-svg-linear-gradient
        orientation="vertical"
        [name]="gradientId"
        [stops]="gradientStops"
      />
    </svg:defs>
    <svg:path
      class="area"
      [attr.d]="areaPath"
      [attr.fill]="gradient ? gradientFill : fill"
      [style.opacity]="opacity"
    />
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaComponent implements OnChanges {

    @Input() data;
    @Input() path;
    @Input() startingPath;
    @Input() fill;
    @Input() opacity = 1;
    @Input() startOpacity = 0.5;
    @Input() endOpacity = 1;
    @Input() activeLabel;
    @Input() gradient: boolean = false;
    @Input() stops: any[];
    @Input() animations: boolean = true;

    @Output() select = new EventEmitter();

    element: HTMLElement;
    gradientId: string;
    gradientFill: string;
    areaPath: string;
    initialized: boolean = false;
    gradientStops: any[];
    hasGradient: boolean = false;

    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        } else {
            this.update();
        }
    }

    update(): void {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;

        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        } else {
            this.hasGradient = false;
        }

        this.updatePathEl();
    }

    loadAnimation(): void {
        this.areaPath = this.startingPath;
        setTimeout(this.update.bind(this), 100);
    }

    updatePathEl(): void {
        const node = select(this.element).select('.area');

        if (this.animations) {
            node.transition().duration(750)
                .attr('d', this.path);
        } else {
            node.attr('d', this.path);
        }
    }

    getGradient() {
        if (this.stops) {
            return this.stops;
        }

        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: this.endOpacity
            }];
    }
}
