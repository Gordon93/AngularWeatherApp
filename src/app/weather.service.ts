import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/forecast/?q=' +
        city +
        '&appid=482944e26d320a80bd5e4f23b3de7d1f' +
        '&units=metric'
    );
  }
}
