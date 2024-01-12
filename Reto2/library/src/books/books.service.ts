import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<any>) {}

  async getAllBooks() {
    return await this.bookModel.find().exec();
  }

  async getBookById(id: string) {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Libro no encontrado');
    }
    return book;
  }

  async createBook(book: any) {
    const createdBook = new this.bookModel(book);
    return await createdBook.save();
  }

  async updateBook(id: string, updatedBook: any) {
    const book = await this.bookModel
      .findByIdAndUpdate(id, updatedBook, { new: true })
      .exec();
    if (!book) {
      throw new NotFoundException('Libro no encontrado');
    }
    return book;
  }

  async deleteBook(id: string) {
    const book = await this.bookModel.findByIdAndDelete(id).exec();
    if (!book) {
      throw new NotFoundException('Libro no encontrado');
    }
    return book;
  }
}
