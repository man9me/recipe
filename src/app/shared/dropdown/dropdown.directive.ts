import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  //open: boolean = false;
  @HostBinding("class.open") open = false;
  @HostListener("click") clickEvent() {
    // !this.open
    //   ? this.renderer.addClass(this.elRef.nativeElement, "open")
    //   : this.renderer.removeClass(this.elRef.nativeElement, "open");

    this.open = !this.open;
  }
}
