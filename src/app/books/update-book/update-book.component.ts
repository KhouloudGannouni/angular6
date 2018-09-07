import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit, OnDestroy {
  @Output() submittedEditBook = new EventEmitter();
  subscriptions: Subscription[] = [];
  bookForm: FormGroup;
  id: number;

  constructor(private bookService: BooksService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.createForm();
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['idBook'];
    });
    if (this.id) {
      this.bookService.getBook(this.id).subscribe(data => {
        this.bookForm.patchValue({
          id: data.id,
          title: data.title,
          author: data.author
        });
      });
    }
  }

  editBook() {
    if (this.bookForm.valid) {
      const bookModel = Object.assign({}, this.bookForm.value);
      const subscription = this.bookService.updateBook(bookModel.id, bookModel).subscribe(() => {
       this.router.navigate([`/books`]);
      });
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy() {
    this.subscriptions.map(subscribe => subscribe.unsubscribe());
  }

  private createForm() {
    this.bookForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }
}

