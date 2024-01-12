import React from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startcreateBook } from "../../actions/booksActions";
import { useHistory } from 'react-router-dom';
import "./newBook.css";

export const NewBookScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();


  const [formNewbookValues, handlebookInputChange] = useForm({
    title:"",
    author:"",
    publicationYear:"",
    status:"",
  });

  const {
    title,
    author,
    publicationYear,
    status,
  } = formNewbookValues;

  const handleNewbook = (e) => {
    e.preventDefault();
    const newbook = {
      title,
      author,
      publicationYear,
      status,
    };
    dispatch(startcreateBook(newbook));
  };

  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <div className="book-container">
      <div className="book-form">
        <h6>Libro nuevo</h6>
        <form onSubmit={handleNewbook} className="form-container">
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
