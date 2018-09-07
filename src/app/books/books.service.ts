import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksModule } from './books.module';
import { environment } from '../../environments/environment';
import { Book } from '../shared/models/book';
import { Observable } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';

@Injectable()
export class BooksService {
  apiUrl =  environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<Array<Book>> {
    return this.httpClient.get(`${this.apiUrl}`) as Observable<Array<Book>>;
  }

  getBooksStream() {
    return this.httpClient.get(`${this.apiUrl}`).pipe(
      mergeAll(),
      map((data: any) => {
        setTimeout(() => {
          return data;
        }, 3000);
      }));
  }

  getBook(id: number): Observable<Book> {
    return this.httpClient.get(`${this.apiUrl}/${id}`) as Observable<Book>;
  }

  saveBook(book: BooksModule) {
    return this.httpClient.post(`${this.apiUrl}`, book);
  }

  updateBook(id: number, book: BooksModule) {
    return this.httpClient.put(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
