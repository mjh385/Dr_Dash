import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    OnInit
} from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { gridLayout, gridSize } from '../common/grid-layout.helper';

@Component({
    selector: 'ngx-charts-number-card',
    template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="false"
      [animations]="animations">
      <svg:g [attr.transform]="transform" class="number-card chart" [class.clickable]="clickable">
        <svg:g ngx-charts-card-series
          [colors]="colors"
          [cardColor]="cardColor"
          [bandColor]="bandColor"
          [textColor]="textColor"
          [emptyColor]="emptyColor"
          [data]="data"
          [dims]="dims"
          [innerPadding]="innerPadding"
          [valueFormatting]="valueFormatting"
          [labelFormatting]="labelFormatting"
          [animations]="animations"
          (select)="onClick($event)"
        />
      </svg:g>
    </ngx-charts-chart>
  `,
    styleUrls: [
        '../common/base-chart.component.scss',
        './card.component.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberCardComponent extends BaseChartComponent implements OnInit {
    
    ngOnInit(){
        this.update();
    }

    @Input() cardColor: string;
    @Input() bandColor: string;
    @Input() emptyColor: string = 'rgba(0, 0, 0, 0)';
    @Input() innerPadding = 15;
    @Input() textColor: string;
    @Input() valueFormatting: any;
    @Input() labelFormatting: any;
    @Input() designatedTotal: number;

    dims: ViewDimensions;
    data: any[];
    slots: any[];
    colors: ColorHelper;
    transform: string;
    domain: any[];
    margin = [10, 10, 10, 10];

    backgroundCards: any[];

    get clickable() {
        return !!this.select.observers.length;
    }

    update(): void {
        super.update();

        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });

        this.domain = this.getDomain();

        this.setColors();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;

        const size = gridSize(this.dims, this.results.length, 150);
        const N = size[0] * size[1];

        const data = this.results.slice();

        while (data.length < N) {
            data.push({ value: null });
        }

        this.data = gridLayout(this.dims, data, 150, this.designatedTotal);
    }

    getDomain(): any[] {
        return this.results.map(d => d.name);
    }

    onClick(data): void {
        this.select.emit(data);
    }

    setColors(): void {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    }

}
