import {Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef} from '@angular/core';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})


export class ChartsComponent implements OnInit {
  
  constructor() { }

  waveform:any;
  ngOnInit(): void {
    
  }

}
