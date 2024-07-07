import React, { createContext, useReducer } from "react";

const initialState = {
  photos: [],
  loading: false,
  likedPhotos: [],
};

const photoReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_PHOTOS":
      return {
        ...state,
        photos: action.payload,
      };
    case "TOGGLE_LIKE":
      const { payload: photoId } = action;
      const likedPhotos = state.likedPhotos.includes(photoId)
        ? state.likedPhotos.filter((id) => id !== photoId)
        : [...state.likedPhotos, photoId];
      return {
        ...state,
        likedPhotos,
      };
    default:
      return state;
  }
};

export const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(photoReducer, initialState);

  return (
    <PhotoContext.Provider value={{ state, dispatch }}>
      {children}
    </PhotoContext.Provider>
  );
};
