import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  @Output() recipeClickRedirect = new EventEmitter<Recipe>();
  recipeDetails: Recipe;
  sub: Subscription;
  navRecipeDetails(recipe: Recipe) {
    // console.log("click resived");
    // console.log(recipe);
    this.recipeDetails = recipe;
    this.recipeClickRedirect.emit(recipe);
  }
  constructor(
    private recipeServise: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnInit() {
    this.sub = this.recipeServise.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeServise.getRecipes();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
