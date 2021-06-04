import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppinglistService } from "../shoppinglist.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput") nameInput: ElementRef;
  @ViewChild("amountInput") amountInput: ElementRef;
  constructor(private ShoppinglistService: ShoppinglistService) {}
  //@Output() newIngredient = new EventEmitter<Ingredient>();

  ngOnInit() {}
  onSubmit() {
    const ingredient = new Ingredient(
      this.nameInput.nativeElement.value,
      this.amountInput.nativeElement.value
    );
    //console.log(this.nameInput.nativeElement.value);
    // this.newIngredient.emit(ingredient);
    this.ShoppinglistService.addIngridient(ingredient);
  }
}
