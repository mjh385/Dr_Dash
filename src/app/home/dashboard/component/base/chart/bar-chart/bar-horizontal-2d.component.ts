import {
    Component,
    Input,
    ViewEncapsulation,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ContentChild,
    TemplateRef,
    OnInit
} from '@angular/core';
import {
    trigger,
    style,
    animate,
    transition
} from '@angular/animations';

import { scaleBand, scaleLinear } from 'd3-scale';

import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';

@Component({
    selector: 'ngx-charts-bar-horizontal-2d',
    template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)"
      (legendLabelClick)="onClick($event)">
      <svg:g [attr.transform]="transform" class="bar-chart chart">
        <svg:g ngx-charts-grid-panel-series
          [xScale]="valueScale"
          [yScale]="groupScale"
          [data]="results"
          [dims]="dims"
          orient="horizontal">
        </svg:g>
        <svg:g ngx-charts-x-axis
          *ngIf="xAxis"
          [xScale]="valueScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [tickFormatting]="xAxisTickFormatting"
          [ticks]="xAxisTicks"
          (dimensionsChanged)="updateXAxisHeight($event)">
        </svg:g>
        <svg:g ngx-charts-y-axis
          *ngIf="yAxis"
          [yScale]="groupScale"
          [dims]="dims"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [tickFormatting]="yAxisTickFormatting"
          [ticks]="yAxisTicks"
          [yAxisOffset]="dataLabelMaxWidth.negative"
          (dimensionsChanged)="updateYAxisWidth($event)">
        </svg:g>
        <svg:g
          *ngFor="let group of results; let index = index; trackBy:trackBy"
          [@animationState]="'active'"
          [attr.transform]="groupTransform(group)">
          <svg:g ngx-charts-series-horizontal
            [xScale]="valueScale"
            [activeEntries]="activeEntries"
            [yScale]="innerScale"
            [colors]="colors"
            [series]="group.series"
            [dims]="dims"
            [gradient]="gradient"
            [tooltipDisabled]="tooltipDisabled"
            [tooltipTemplate]="tooltipTemplate"
            [seriesName]="group.name"
            [roundEdges]="roundEdges"
            [animations]="animations"
            [showDataLabel]="showDataLabel"
            [dataLabelFormatting]="dataLabelFormatting"
            (select)="onClick($event, group)"
            (activate)="onActivate($event, group)"
            (deactivate)="onDeactivate($event, group)"
            (dataLabelWidthChanged)="onDataLabelMaxWidthChanged($event, index)"
          />
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['../common/base-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('animationState', [
            transition(':leave', [
                style({
                    opacity: 1,
                    transform: '*',
                }),
                animate(500, style({ opacity: 0, transform: 'scale(0)' }))
            ])
        ])
    ]
})
export class BarHorizontal2DComponent extends BaseChartComponent implements OnInit {

    ngOnInit(){
        this.update();
    }
    
    @Input() legend = false;
    @Input() legendTitle: string = 'Legend';
    @Input() xAxis;
    @Input() yAxis;
    @Input() showXAxisLabel;
    @Input() showYAxisLabel;
    @Input() xAxisLabel;
    @Input() yAxisLabel;
    @Input() tooltipDisabled: boolean = false;
    @Input() gradient: boolean;
    @Input() showGridLines: boolean = true;
    @Input() activeEntries: any[] = [];
    @Input() schemeType: string;
    @Input() xAxisTickFormatting: any;
    @Input() yAxisTickFormatting: any;
    @Input() xAxisTicks: any[];
    @Input() yAxisTicks: any[];
    @Input() groupPadding = 16;
    @Input() barPadding = 8;
    @Input() roundDomains: boolean = false;
    @Input() roundEdges: boolean = true;
    @Input() xScaleMax: number;
    @Input() showDataLabel: boolean = false;
    @Input() dataLabelFormatting: any;

    @Output() activate: EventEmitter<any> = new EventEmitter();
    @Output() deactivate: EventEmitter<any> = new EventEmitter();

    @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

    dims: ViewDimensions;
    groupDomain: any[];
    innerDomain: any[];
    valuesDomain: any[];
    groupScale: any;
    innerScale: any;
    valueScale: any;
    transform: string;
    colors: ColorHelper;
    margin = [10, 20, 10, 20];
    xAxisHeight: number = 0;
    yAxisWidth: number = 0;
    legendOptions: any;
    dataLabelMaxWidth: any = { negative: 0, positive: 0 };

    update(): void {
        super.update();

        if (!this.showDataLabel) {
            this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        }

        this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];

        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });

        this.formatDates();

        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();

        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();

        this.setColors();
        this.legendOptions = this.getLegendOptions();

        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    }

    getGroupScale(): any {
        const spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);

        return scaleBand()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .paddingOuter(spacing / 2)
            .domain(this.groupDomain);
    }

    getInnerScale(): any {
        const height = this.groupScale.bandwidth();
        const spacing = this.innerDomain.length / (height / this.barPadding + 1);

        return scaleBand()
            .rangeRound([0, height])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    }

    getValueScale(): any {
        const scale = scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valuesDomain);

        return this.roundDomains ? scale.nice() : scale;
    }

    getGroupDomain(): any[] {
        const domain = [];

        for (const group of this.results) {
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }

        return domain;
    }

    getInnerDomain(): any[] {
        const domain = [];

        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }

        return domain;
    }

    getValueDomain(): any[] {
        const domain = [];

        for (const group of this.results) {
            for (const d of group.series) {
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }

        const min = Math.min(0, ...domain);
        const max = this.xScaleMax
            ? Math.max(this.xScaleMax, ...domain)
            : Math.max(...domain);
        return [min, max];
    }

    groupTransform(group) {
        return `translate(0, ${this.groupScale(group.name)})`;
    }

    onClick(data, group?): void {
        if (group) {
            data.series = group.name;
        }

        this.select.emit(data);
    }

    trackBy(index, item): string {
        return item.name;
    }

    setColors(): void {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        } else {
            domain = this.valuesDomain;
        }

        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }

    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        } else {
            opts.domain = this.valuesDomain;
            opts.colors = this.colors.scale;
        }

        return opts;
    }

    updateYAxisWidth({ width }): void {
        this.yAxisWidth = width;
        this.update();
    }

    updateXAxisHeight({ height }): void {
        this.xAxisHeight = height;
        this.update();
    }

    onDataLabelMaxWidthChanged(event, groupIndex) {
        if (event.size.negative) {
            this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
        } else {
            this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
        }
        if (groupIndex === (this.results.length - 1)) {
            setTimeout(() => this.update());
        }
    }
    onActivate(event, group?) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }

        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }

        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }

    onDeactivate(event, group?) {
        const item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }

        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });

        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];

        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }

}
