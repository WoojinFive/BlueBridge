import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styleUrls: ['./status-change.component.css']
})
export class StatusChangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ELEMENT_DATA= [
    {  department:"HR" , job: 'Manager', condition:"Normal"},
  ]
  condition_options = [ "Busy", "Away", "Normal" ]
  selected = this.ELEMENT_DATA[0].condition;
}
