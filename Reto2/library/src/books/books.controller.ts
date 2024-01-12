import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Book } from './book.model';

@ApiTags('books')
@Controller('books')
@UseGuards(AuthGuard('jwt'))
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @ApiOperation({ summary: 'Obtener todos los libros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de libros devuelta con éxito',
  })
  @Get()
  async getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @ApiOperation({ summary: 'Obtener un libro por id' })
  @ApiResponse({
    status: 200,
    description: 'Libro',
  })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'filtrar por id',
  })
  @Get(':id')
  async getBookById(@Param('id') id: string) {
    return this.booksService.getBookById(id);
  }

  @ApiOperation({ summary: 'Crear un libro' })
  @ApiResponse({
    status: 201,
    description: 'Libro nuevo',
  })
  @ApiBody({ type: Book })
  @Post()
  async createBook(@Body() book: Book) {
    return this.booksService.createBook(book);
  }

  @ApiOperation({ summary: 'Actulizar un libro por id' })
  @ApiResponse({
    status: 201,
    description: 'Libro actulizado',
  })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'filtrar por id',
  })
  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() book: Book) {
    return this.booksService.updateBook(id, book);
  }

  @ApiOperation({ summary: 'Elimina un libro por id' })
  @ApiResponse({
    status: 200,
    description: 'Libro Eliminado',
  })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'filtrar por id',
  })
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
