import {
  Directive,
  Input,
  Optional,
  Inject,
  Self,
  ElementRef,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { MatMenuTrigger, MatMenu, MatMenuItem, MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';

import { FsMenuComponent } from '../../components/fs-menu/fs-menu.component';


@Directive({
  selector: '[fsMenuTriggerFor]',
})
export class FsMenuTriggerDirective extends MatMenuTrigger implements OnInit {

  @Input('fsMenuTriggerFor') public fsMenu: FsMenuComponent = null;

  constructor(
    _overlay: Overlay,
    _element: ElementRef<HTMLElement>,
    _viewContainerRef: ViewContainerRef,
    @Inject(MAT_MENU_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() _parentMenu: MatMenu,
    @Optional() @Self() _menuItemInstance: MatMenuItem,
    @Optional() _dir: Directionality,
    _focusMonitor?: FocusMonitor
  ) {
    super(
      _overlay,
      _element,
      _viewContainerRef,
      scrollStrategy,
      _parentMenu,
      _menuItemInstance,
      _dir,
      _focusMonitor
    );
  }

  public ngOnInit(): void {
    this.menu = this.fsMenu.fsMenuRef;
    this.fsMenu.externalMatMenuTrigger = this;
  }

  _handleKeydown(event: KeyboardEvent): void {
    this._triggerClick();
  }

  /** Handles click events on the trigger. */
  _handleClick(event: MouseEvent): void {
    this._triggerClick();
  }

  private _triggerClick() {
    if (this.fsMenu.opened) {
      this.fsMenu.closeMenu();
    } else {
      this.fsMenu.openMenu();
    }
  }
}
