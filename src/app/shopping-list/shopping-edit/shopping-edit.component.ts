import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  OnDestroy,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppinglistService } from "../shoppinglist.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  //@ViewChild("nameInput") nameInput: ElementRef;
  //@ViewChild("amountInput") amountInput: ElementRef;
  @ViewChild("f", { static: false }) shopF: NgForm;
  constructor(private ShoppinglistService: ShoppinglistService) {}
  //@Output() newIngredient = new EventEmitter<Ingredient>();
  sub: Subscription;
  editMode = false;
  editedI: number;
  editedItem: Ingredient;
  ngOnInit() {
    this.sub = this.ShoppinglistService.startedEditing.subscribe(
      (i: number) => {
        this.editMode = true;
        this.editedI = i;
        this.editedItem = this.ShoppinglistService.getIngridient(i);

        this.shopF.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  onSubmit(form: NgForm) {
    const ingredient = new Ingredient(
      form.value.name,
      form.value.amount
      // this.nameInput.nativeElement.value,
      // this.amountInput.nativeElement.value
    );
    //console.log(this.nameInput.nativeElement.value);
    // this.newIngredient.emit(ingredient);
    if (this.editMode) {
      this.ShoppinglistService.updateIngridient(this.editedI, ingredient);
    } else {
      this.ShoppinglistService.addIngridient(ingredient);
    }
    this.editMode = false;
    this.shopF.resetForm();
  }
  onClear() {
    this.shopF.resetForm();
    this.editMode = false;
  }
  onDelete(form: NgForm) {
    this.onClear();
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    this.ShoppinglistService.delIngredient(this.editedI);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
