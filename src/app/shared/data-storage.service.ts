import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService
  ) {}
  link: string =
    'https://recipes-ca165-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put(this.link, recipes).subscribe((r) => {
      console.log(r);
    });
  }
  fetchRecipes(): Observable<any> | any {
    return this.http.get<Recipe[]>(this.link).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingridients ? recipe.ingridients : [], //если ингридиентов нет, добавить пустой масив
          };
        });
      }),
      tap((recipes) => {
        this.recipesService.setRecipes(recipes);
        // отправляем в сервис рецептов, но убрали сабскрайб, чтобы ресолвер получал обсервебл
      })
    );
    // .subscribe((r) => {
    //   this.recipesService.setRecipes(r);
    // });
  }
}
