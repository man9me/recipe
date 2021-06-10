import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: "root",
})
export class ShoppinglistService {
  ingridientsChanged = new Subject<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];
  constructor() {}

  getIngridients() {
    return this.ingredients.slice();
  }

  addIngridient(ingredient) {
    this.ingredients.push(ingredient);
    this.ingridientsChanged.next(this.ingredients.slice());
  }
  addIngridients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingridientsChanged.next(this.ingredients.slice());
  }
}
