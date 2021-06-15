import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Recipe } from "../../recipe.model";
import { RecipeService } from "../../recipe.service";
@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeClick = new EventEmitter<any>();
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  @Input() index: number;
  // navRecipeDetails() {
  //   // console.log("click");
  //   this.recipeClick.emit();
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }

  ngOnInit() {}
}
