import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  cities: string[] = ['Rio de Janeiro', 'Beijing', 'Los Angeles']; // List of cities
  forecasts: any[] = [];
  maxTemps = new Array();
  minTemps = new Array();

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    for (const city of this.cities) {
      this.weatherService.getWeather(city).subscribe({
        next: (res: any) => {
          this.forecasts.push(res);
          this.findMaxTemp();
          this.findMinTemp();
        },

        error: (error: { message: any }) => console.log(error.message),

        complete: () => console.info('API call completed'),
      });
    }
  }
  findMaxTemp() {
    for (let i = 0; i < this.forecasts.length; i++) {
      this.maxTemps[i] = new Array();
      for (var j = 0; j < 5; j++) {
        this.maxTemps[i].push(
          Math.max(
            ...this.forecasts[i].list
              .slice(8 * j, 8 * (j + 1))
              .map((o: { main: { temp_max: any } }) => o.main.temp_max)
          )
        );
      }
    }
  }
  findMinTemp() {
    for (let i = 0; i < this.forecasts.length; i++) {
      this.minTemps[i] = new Array();
      for (var j = 0; j < 5; j++) {
        this.minTemps[i].push(
          Math.min(
            ...this.forecasts[i].list
              .slice(8 * j, 8 * (j + 1))
              .map((o: { main: { temp_min: any } }) => o.main.temp_min)
          )
        );
      }
    }
  }
}
