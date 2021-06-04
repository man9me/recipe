import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  @Output() recipeClickRedirect = new EventEmitter<Recipe>();
  recipeDetails: Recipe;
  navRecipeDetails(recipe: Recipe) {
    // console.log("click resived");
    // console.log(recipe);
    this.recipeDetails = recipe;
    this.recipeClickRedirect.emit(recipe);
  }
  constructor(private recipeServise: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeServise.getRecipes();
  }
}