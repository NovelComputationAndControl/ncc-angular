import {Component, OnInit} from '@angular/core';
import {PapersService} from '../papers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [PapersService]
})
export class DashboardComponent implements OnInit {


  constructor(private papers: PapersService) {
  }

  ngOnInit() {
  }
}
