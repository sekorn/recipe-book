import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Garlic Prime Rib', 'Delicious Prime Rib that you can make yourself', 'http://images.media-allrecipes.com/userphotos/720x405/4396027.jpg', [
      new Ingredient('French Fries', 2),
      new Ingredient('Pork Meat', 1)
    ]),
    new Recipe('Best Big, Fat Chewy Chocolate Chip Cookie', 'Delicious Cookies that you can make yourself', 'http://images.media-allrecipes.com/userphotos/720x405/1107530.jpg', []),
    new Recipe('Baked BBQ Baby Back Ribs', 'Delicious Baby Back Ribs that you can make yourself', 'http://images.media-allrecipes.com/userphotos/720x405/3789556.jpg', [])
  ];

  constructor() {}

  getRecipes() {
    return this.recipes;
  }
}
