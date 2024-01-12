import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BookList = ({ books, handleDelete }) => {
  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>Año de publicación</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {books.length > 0 &&
          books.slice(0, 10).map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publicationYear}</td>
              <td>{book.status}</td>
              <td>
                <Link to={`/books/edit/${book._id}`}>
                  <button className="btn btn-primary mr-2">Editar</button>
                </Link>
                <button
                  className="btn btn-danger  mr-2"
                  onClick={() => handleDelete(book._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BookList;
