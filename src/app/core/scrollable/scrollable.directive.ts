import { OnInit, Directive, Input, ElementRef, HostListener, OnChanges, SimpleChanges} from '@angular/core';
declare var $: any;

@Directive({
    selector: 'scrollable'
})
export class ScrollableDirective implements OnInit, OnChanges {

    @Input() height: number;
    @Input() heightPercent: number;
    @Input() heightOffset: number = 0;
    public defaultHeight: number;

    constructor(public element: ElementRef) { }

    ngOnInit() {
        const clientHeight =  window.innerHeight 
        || document.documentElement.clientHeight 
        || document.body.clientHeight;

        if(!!this.heightPercent){
            this.heightOffset = clientHeight - ((clientHeight * this.heightPercent) / 100) ; 
        }

        this.defaultHeight = clientHeight - this.heightOffset;
    
        this.InitializeSlimScroll();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.height) {
            const clientHeight = changes.height.currentValue;
            this._updateHeights(clientHeight);
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const clientHeight = event.target.innerHeight;
        this._updateHeights(clientHeight);
    }

    private _updateHeights(clientHeight: any) {
        if (!!this.heightPercent) {
            this.heightOffset = clientHeight - ((clientHeight * this.heightPercent) / 100);
        }
        this.defaultHeight = clientHeight - this.heightOffset;
        this.InitializeSlimScroll();
    }

    private InitializeSlimScroll(){
        $(this.element.nativeElement).slimScroll({
            height: (this.height || this.defaultHeight)
        });
    }
}
