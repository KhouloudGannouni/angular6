import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksPageComponent } from './books-page/books-page.component';
import { BooksService } from './books.service';
import { BookFormComponent } from './book-form/book-form.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateBookComponent } from './update-book/update-book.component';
import { NotificationModule } from '../shared/components/notification/notification.module';



@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModule,
  ],
  declarations: [BooksPageComponent, BookFormComponent, BookDetailsComponent, UpdateBookComponent],
  providers: [BooksService]
})
export class BooksModule { }
