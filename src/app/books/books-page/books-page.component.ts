import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book';
import { BooksService } from '../books.service';
import { Subscription } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
})
export class BooksPageComponent implements OnInit, OnDestroy {
  book: Book;
  books: Array<Book> = []; // books: Book[] = [];
  subscriptions: Subscription[] = [];
  successMessage: string;
  isSaved: true;
  constructor(private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.initData();
    this.fetchBooks();
  }

  fetchBooks() {
    const subscription = this.booksService.getBooks()
      .pipe(
        // mergeAll(), // stream data
        // map(data => {
        //   setTimeout(() => { // setTimeout
        //     this.books.push(data);
        //   }, 3000);
        // })
        map(data => {
          this.books = data;
        })
        )
      .subscribe();
    this.subscriptions.push(subscription);
  }

  editBook(id: number) {
    this.router.navigate([`/books/edit/${id}`]);
  }

  deleteBook(id: number) {
    const subscription = this.booksService.deleteBook(id).subscribe(data => {
      this.fetchBooks();
    });
    this.subscriptions.push(subscription);
  }

  redirectToBookDetails(id: number) {
    this.router.navigate([`/books/details/${id}`]);
}

  onSubmittedForm(event) {
    const subscription = this.booksService.saveBook(event).subscribe(data => {
      this.fetchBooks();
      this.isSaved = true;
      this.successMessage = `book ${event.title} successfully added`;
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.map(subscribe => subscribe.unsubscribe());
  }

  private initData() {
    this.book = {
      title: 'title',
      author: 'author'
    };
  }
}
