import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-headerss',
  templateUrl: './headerss.component.html',
  styleUrls: ['./headerss.component.scss']
})
export class HeaderssComponent implements OnInit {

  value : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @Output() newEvent = new EventEmitter<boolean>();

  eventItem() {
    this.value = !this.value
    this.newEvent.emit(this.value);
  }

}
