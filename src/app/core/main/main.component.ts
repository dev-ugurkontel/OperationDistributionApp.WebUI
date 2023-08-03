import { Component, OnDestroy, OnInit } from '@angular/core';
import { DistributionService } from 'src/app/services';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector    : 'main',
  templateUrl : './main.component.html',
  styleUrls   : ['./main.component.scss'],
  animations  : [
    trigger('alertAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250)
      ]),
      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MainComponent implements OnInit, OnDestroy {
    
  data: any[] = [];
  countdown: number = 1;
  isAlive: boolean = true;
  showAlert: boolean = false;

  constructor(private distributionService: DistributionService) { }

  ngOnInit(): void {
    this.loadData();

    interval(1000)
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe(() => {
        this.countdown--;

        if (this.countdown === 0) {
          this.loadData();
          this.countdown = 1;
        }
      });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  loadData(useCache: boolean = true): void {
    this.distributionService.getAll(useCache).subscribe(response => {
      this.data = response;
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 2000);
    }, error => {
      console.log('Error in request to fetch data:', error);
    });
  }

  deploy(): void {
    this.distributionService.deploy().subscribe(response => {
    }, error => {
      console.log('Error in deployment request:', error);
    });
  }

  onRefresh = () => {
    this.loadData();
  }

  onDeploy = () => {
    this.deploy();
  }
    
}