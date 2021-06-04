import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  switcher: number = 0;

  router(route: string) {
    //console.log(route);
    const routes = {
      recipes: 1,
      shopinglist: 2,
    };
    this.switcher = routes[route.toLowerCase()] ?? "route not found";
    return routes[route.toLowerCase()] ?? "route not found";
  }
}
