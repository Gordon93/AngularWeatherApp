import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  cities: string[] = ['Rio de Janeiro', 'Beijing', 'Los Angeles']; // List of cities
  forecasts: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    for (const city of this.cities) {
      this.weatherService.getWeather(city).subscribe({
        next: (res: any) => {
          this.forecasts.push(res);
        },

        error: (error: { message: any }) => console.log(error.message),

        complete: () => console.info('API call completed'),
      });
    }
  }
}
