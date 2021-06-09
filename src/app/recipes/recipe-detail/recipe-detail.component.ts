import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ShoppinglistService } from "src/app/shopping-list/shoppinglist.service";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  //@Input("recepie") recepie: Recipe;
  recipe: Recipe;
  //recipe: Recipe = this.router.snapshot.data.recipe;
  OnChanges() {
    //console.log("changes");
  }

  constructor(
    private ShoppinglistService: ShoppinglistService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  onToShopingList() {
    // this.recepie.ingridients.map((i) => {
    //   //console.log(i);
    //   this.ShoppinglistService.addIngridient(i);
    // }); less carbon Emmitors method
    this.ShoppinglistService.addIngridients(this.recipe.ingridients);
  }

  id: number;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;

      this.recipe = this.recipeService.getRecipe(this.id);
      console.log(this.recipe);
    });
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
    //this.router.navigate(["../", this.id, "edit"], { relativeTo: this.route });
  }
}
