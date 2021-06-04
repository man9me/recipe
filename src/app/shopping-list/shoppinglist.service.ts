import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: "root",
})
export class ShoppinglistService {
  ingridientsChanged = new EventEmitter<Ingredient[]>();
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
    this.ingridientsChanged.emit(this.ingredients.slice());
  }
  addIngridients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingridientsChanged.emit(this.ingredients.slice());
  }
}
