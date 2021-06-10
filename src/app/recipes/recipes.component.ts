import { Component, OnInit } from "@angular/core";

import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}
  recipeDetails: Recipe;
  ngOnInit() {
    // this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
    //   this.recipeDetails = recipe;
    // });
  }
  navRecipeDetails(recipe: Recipe) {
    //console.log("click resived main");
    //console.log(recipe);
    this.recipeDetails = recipe;
  }
}
