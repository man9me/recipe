import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppinglistService } from "./shoppinglist.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
  providers: [],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  constructor(private ShoppinglistService: ShoppinglistService) {}
  onClick() {
    //console.log(this.nameInput);
  }

  // onNewIngredient(ingredient: Ingredient) {
  //   //this.ingredients.push(ingredient);
  //   this.ShoppinglistService.addIngridient(ingredient);
  // }

  ngOnInit() {
    this.ingredients = this.ShoppinglistService.getIngridients();
    this.ShoppinglistService.ingridientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
}
