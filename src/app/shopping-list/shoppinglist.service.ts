import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppinglistService {
  ingridientsChanged = new Subject<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  constructor() {}
  startedEditing = new Subject<number>();
  getIngridients() {
    return this.ingredients.slice();
  }
  updateIngridient(i: number, newIngridient: Ingredient) {
    this.ingredients[i] = newIngridient;
    this.ingridientsChanged.next(this.ingredients.slice());
  }
  getIngridient(i: number) {
    return this.ingredients[i];
  }
  delIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingridientsChanged.next(this.ingredients.slice());
  }
  addIngridient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingridientsChanged.next(this.ingredients.slice());
  }
  addIngridients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingridientsChanged.next(this.ingredients.slice());
  }
}
