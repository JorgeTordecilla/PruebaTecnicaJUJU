import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const getBooks = () => ({
  type: types.getBooks,
});

export const getBooksSuccess = (books) => ({
  type: types.getBooksSuccess,
  payload: books,
});

export const getBooksError = (error) => ({
  type: types.getBooksError,
  payload: error,
});

export const startGetBooks = () => {
  return async (dispatch) => {
    dispatch(getBooks());

    const resp = await fetchWithToken("books");
    const body = await resp.json();
    console.log(body)
    dispatch(getBooksSuccess(body));
   

  };
};

export const createBook = () => ({
  type: types.createBook,
});

export const createBookSuccess = (book) => ({
  type: types.createBookSuccess,
  payload: book,
});

export const createBookError = (error) => ({
  type: types.createBookError,
  payload: error,
});

export const startcreateBook = (bookData) => {
  console.log(bookData)
  return async (dispatch) => {
    dispatch(createBook());

    try {
      const resp = await fetchWithToken(
        "books",
        bookData,
        "POST"
      );
      const body = await resp.json();

      dispatch(createBookSuccess(body));
      dispatch(startGetBooks());

      Swal.fire({
        title: "Libro Creado",
        text: "Creacion del libro existosa",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result) {
          window.history.back();
        }
      });

    } catch (error) {
      console.log(error)
      dispatch(createBookError("Error al crear"));
    }
  };
};

export const updateBook = () => ({
  type: types.updateBook,
});

export const updateBookSuccess = (book) => ({
  type: types.updateBookSuccess,
  payload: book,
});

export const updateBookError = (error) => ({
  type: types.updateBookError,
  payload: error,
});

export const startUpdateBook = (bookData) => {
  console.log(bookData)
  return async (dispatch) => {
    dispatch(updateBook());
    try {
      const resp = await fetchWithToken(
        `books/${bookData.id}`,
        bookData,
        "PUT"
      );
      const body = await resp.json();

      Swal.fire({
        title: "Libro Actualizado",
        text: "Actualización Exitosa",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result) {
          window.history.back();
        }
      });
      dispatch(updateBookSuccess(body));

    } catch (error) {
      dispatch(updateBookError("Error al actualizar"));
    }
  };
};

export const deleteBook = () => ({
  type: types.deleteBook,
});

export const deleteBookSuccess = (bookId) => ({
  type: types.deleteBookSuccess,
  payload: bookId,
});

export const deleteBookError = (error) => ({
  type: types.deleteBookError,
  payload: error,
});

export const startDeleteBook = (bookId) => {
  return async (dispatch) => {
    dispatch(deleteBook());

    try {
      await fetchWithToken(
        `books/${bookId}`,
        {},
        "DELETE"
      );

      dispatch(deleteBookSuccess(bookId));
      dispatch(startGetBooks());
      
    } catch (error) {
      dispatch(deleteBookError("Error al eliminar"));
    }
  };
};


