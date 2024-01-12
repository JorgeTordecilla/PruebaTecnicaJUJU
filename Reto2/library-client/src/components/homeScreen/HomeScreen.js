import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { startDeleteBook, startGetBooks } from "../../actions/booksActions";
import { startLogout } from "../../actions/authActions";
import BookList from "../bookList/BookList";
import Swal from "sweetalert2";

import "./homeScreen.css";

export const  HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetBooks());
  }, [dispatch]);

  const { books } = useSelector((state) => state.books);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.publicationYear}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleDelete = (bookId) => {
    Swal.fire({
      title: "¿Quieres Eliminar libro?",
      text: "Esta acción es permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleteBook(bookId));
      }
    });
  };

  return (
    <div className="home-container row-cols-2 mt-5 ">
      <div className="table-responsive">
        <div className="m-3">
          <h2>Lista de libros</h2>
          <Link to="/books/agg">
            <input
              className="btn btn-primary mr-2"
              type="button"
              value="Agregar"
            />
          </Link>
          <input
            className="btn btn-warning mr-2"
            type="button"
            value="Salir"
            onClick={handleLogout}
          />
          <hr></hr>
          <input
            className="form-control p-2"
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <BookList books={filteredBooks} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

