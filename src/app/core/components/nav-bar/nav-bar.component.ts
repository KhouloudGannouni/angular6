import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input()links: Array<any> = [];
  isNavbarCollapsed; boolean;

  constructor() { }

  ngOnInit() { }
  ngOnDestroy() { }

}
