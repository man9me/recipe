import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null; // fave id or not determines if we in addit or new
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = "";
    let recipeImgPath = "";
    let recipeDescription = "";
    let recipeIngridients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe["ingridients"]) {
        for (let ingridient of recipe.ingridients) {
          recipeIngridients.push(
            new FormGroup({
              name: new FormControl(ingridient.name, Validators.required),
              amount: new FormControl(ingridient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      recipeImgPath: new FormControl(recipeImgPath, Validators.required),
      recipeDescription: new FormControl(
        recipeDescription,
        Validators.required
      ),
      ingridients: recipeIngridients,
    });
  }

  get recipeFormA() {
    return this.recipeForm.get("ingridients") as FormArray;
  }

  onAddIngridient() {
    (<FormArray>this.recipeForm.get("ingridients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  onDeleteIngrodient(i: number) {
    (<FormArray>this.recipeForm.get("ingridients")).removeAt(i);
  }
  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
}
