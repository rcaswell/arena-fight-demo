import * as ng from 'angular';

class myCurrentTime implements ng.IDirective
{
    format: string;
    stopTimeId: ng.IPromise<number>;

    private elm: any;

    constructor(protected $scope: ng.IScope, protected $interval: ng.IIntervalService, protected $dateFilter: ng.IFilterDate, elm: any, attrs: any)
    {
        this.elm = elm;
        $scope.$watch(attrs.myCurrentTime, (val: string): void => { this.format = val; this.updateTime();} );
        elm.on('$destroy', (): void => { $interval.cancel(this.stopTimeId);});
    }


    updateTime(): void
    {
        this.elm.text(this.$dateFilter(new Date(), this.format));
    }


}