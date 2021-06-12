import { EventEmitter, Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
@Injectable({
  providedIn: "root",
})
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "Холодец",
      "This is simply a test",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Holodez_s_hrenom.JPG/274px-Holodez_s_hrenom.JPG",
      [new Ingredient("желатин", 60), new Ingredient("мясцо", 1)]
    ),
    new Recipe(
      "Драники",
      "This is simply a test",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Potato_pancakes.jpg/274px-Potato_pancakes.jpg",
      [
        new Ingredient("Картопля", 2),
        new Ingredient("лук зеленый стебельчатый", 1),
      ]
    ),
    new Recipe(
      "Сало",
      "pork",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Schweinebauch-2.jpg/220px-Schweinebauch-2.jpg",
      [
        new Ingredient("свинное пузо", 1000),
        new Ingredient("соль", 25),
        new Ingredient("пепа", 5),
      ]
    ),
  ];

  getRecipe(id: number) {
    return this.recipes[id];
  }

  getRecipes() {
    return this.recipes.slice(); // will return not link but copy of it
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(i: number, recipe: Recipe) {
    this.recipes[i] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  //addRecipe(recipe: Recipe) {}
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  constructor() {}
}
