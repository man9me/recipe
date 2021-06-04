import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { ShoppinglistService } from "src/app/shopping-list/shoppinglist.service";
import { Recipe } from "../recipe.model";
@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  @Input("recepie") recepie: Recipe;

  OnChanges() {
    //console.log("changes");
  }

  constructor(private ShoppinglistService: ShoppinglistService) {}

  onToShopingList() {
    // this.recepie.ingridients.map((i) => {
    //   //console.log(i);
    //   this.ShoppinglistService.addIngridient(i);
    // }); less carbon Emmitors method
    this.ShoppinglistService.addIngridients(this.recepie.ingridients);
  }

  ngOnInit() {}
}
