import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksPageComponent } from './books-page/books-page.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { UpdateBookComponent } from './update-book/update-book.component';

const routes: Routes = [
  { path: '', component: BooksPageComponent},
  { path: 'book', component: BookFormComponent},
  { path: 'details/:idBook', component: BookDetailsComponent},
  { path: 'edit/:idBook', component: UpdateBookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
