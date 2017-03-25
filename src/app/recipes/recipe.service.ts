import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';

@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Garlic Prime Rib', 'Delicious Prime Rib that you can make yourself', 'http://images.media-allrecipes.com/userphotos/720x405/4396027.jpg', [
      new Ingredient('French Fries', 2),
      new Ingredient('Pork Meat', 1)
    ]),
    new Recipe('Best Big, Fat Chewy Chocolate Chip Cookie', 'Delicious Cookies that you can make yourself', 'http://images.media-allrecipes.com/userphotos/720x405/1107530.jpg', []),
    new Recipe('Baked BBQ Baby Back Ribs', 'Delicious Baby Back Ribs that you can make yourself', 'http://images.media-allrecipes.com/userphotos/720x405/3789556.jpg', [])
  ];

  constructor(private http: Http) {}

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    })
    return this.http.put('https://recipebook-447b5.firebaseio.com/recipes.json', body, { headers: headers});
  }

  fetchData() {
    return this.http.get('https://recipebook-447b5.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }
}
