import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { DropdownDirective } from "./shared/dropdown/dropdown.directive";
import { ShoppinglistService } from "./shopping-list/shoppinglist.service";
import { Page404Component } from "./page404/page404.component";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./router.module";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    Page404Component,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [ShoppinglistService],
  bootstrap: [AppComponent],
})
export class AppModule {}
