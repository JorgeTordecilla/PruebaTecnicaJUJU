import React from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startUpdateBook } from "../../actions/booksActions";
import { useHistory } from 'react-router-dom';

import "./editBook.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const EditBookScreen = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const {  books } = useSelector((state) => state.books);
  let targetUpdate = books.filter((item) => item._id === id)[0];

  const [formNewbookValues, handlebookInputChange] = useForm({
    ...targetUpdate,
  });
  const history = useHistory();

  const {
    title,
    author,
    publicationYear,
    status,
  } = formNewbookValues;

  const handleUpdateBook = (e) => {
    e.preventDefault();
    const updatedBook = {
      id,
      title,
      author,
      publicationYear,
      status,
    };
    dispatch(startUpdateBook(updatedBook));
  };

  const handleGoBack = () => {
    history.goBack();
  };


  return (
    <div className="book-container">

      <div className="book-form">
        <h6>Editar el Libro</h6>
        <form onSubmit={handleUpdateBook} className="form-container">
          <div className="form-group">
            <label>Titulo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handlebookInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="Author"
              name="author"
              value={author}
              onChange={handlebookInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Publication Year</label>
            <input
              type="number"
              className="form-control"
              placeholder="Publication Year"
              name="publicationYear"
              value={publicationYear}
              onChange={handlebookInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Grado</label>
            <select
              className="form-control"
              name="status"
              value={status}
              onChange={handlebookInputChange}
              required
            >
              <option value="">Escoje un estado</option>
              <option value="disponible">Disponible</option>
              <option value="reservado">Reservado</option>
            </select>
                  
          </div>

          <div className="form-group">
            <input type="submit" className="btnSubmit" value="Guardar" />
          </div>
          <div className="form-group">
          <input  type="button" onClick={handleGoBack} className="btnSubmit" value="Volver atrás" />
          </div>
        </form>
      </div>

    </div>
  );
};
