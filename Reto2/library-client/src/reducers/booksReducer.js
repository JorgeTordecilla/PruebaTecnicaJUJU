import { types } from "../types/types";

const initialState = {
  books: [],
  loading: false,
  error: null,
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getBooks:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.getBooksSuccess:
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null,
      };

    case types.getBooksError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.createBook:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.createBookSuccess:
      return {
        ...state,
        books: [...state.books, action.payload],
        loading: false,
        error: null,
      };

    case types.createBookError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.updatebook:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.updatebookSuccess:
      const updatedbooks = state.books.map((books) =>
      books.id === action.payload.id ? action.payload : books
      );
      return {
        ...state,
        books: updatedbooks,
        loading: false,
        error: null,
      };

    case types.updatebookError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.deletebook:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.deletebookSuccess:
      const filteredbooks = state.books.filter(
        (books) => books.id !== action.payload
      );
      return {
        ...state,
        books: filteredbooks,
        loading: false,
        error: null,
      };

    case types.deletebookError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
