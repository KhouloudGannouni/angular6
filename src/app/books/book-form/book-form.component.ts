import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BooksService } from '../books.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnDestroy {
  @Output() submittedBook = new EventEmitter();
  subscriptions: Subscription[] = [];
  bookForm: FormGroup;
  constructor(private bookService: BooksService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  emitBook() {
    if (this.bookForm.valid) {
      this.submittedBook.emit(this.bookForm.value);
      this.bookForm.reset();
    }
  }
  ngOnDestroy() {
    this.subscriptions.map(subscribe => subscribe.unsubscribe());
  }

  private createForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

}
