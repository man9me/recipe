import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  switcher: number = 0;
  constructor(private authService: AuthService) {}
  // router(route: string) {
  //   //console.log(route);
  //   const routes = {
  //     recipes: 1,
  //     shopinglist: 2,
  //   };
  //   this.switcher = routes[route.toLowerCase()] ?? "route not found";
  //   return routes[route.toLowerCase()] ?? "route not found";
  // }
  ngOnInit() {
    this.authService.autoLogging();
  }
}
