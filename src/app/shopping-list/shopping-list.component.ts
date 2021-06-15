import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Subscription } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppinglistService } from "./shoppinglist.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
  providers: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private idSub: Subscription;
  constructor(private ShoppinglistService: ShoppinglistService) {}
  onClick() {
    //console.log(this.nameInput);
  }

  // onNewIngredient(ingredient: Ingredient) {
  //   //this.ingredients.push(ingredient);
  //   this.ShoppinglistService.addIngridient(ingredient);
  // }
  onEditItem(i: number) {
    this.ShoppinglistService.startedEditing.next(i);
  }

  ngOnInit() {
    this.ingredients = this.ShoppinglistService.getIngridients();
    this.idSub = this.ShoppinglistService.ingridientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  ngOnDestroy() {
    this.idSub.unsubscribe();
  }
}
