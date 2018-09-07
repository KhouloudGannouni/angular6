import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Subscription} from 'rxjs';
import { Book } from '../../shared/models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  book: Book;
  id: number;
  constructor(private booksService: BooksService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
     this.id = +params['idBook'];
    });
    if (this.id) {
      this.fetchOneBooks(this.id);
    }

  }

  fetchOneBooks(id: number) {
    const subscription = this.booksService.getBook(id)
      .subscribe(data => this.book = data);
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.map(subscribe => subscribe.unsubscribe());
  }

}
