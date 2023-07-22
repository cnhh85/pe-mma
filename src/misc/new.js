import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useMemo, useReducer } from "react";
import { DB } from "../constants/db";

export const FAVORITE_NEWS_KEY = "@FavoriteEvents";

export const RESTORE_STATE = "RESTORE";
export const LIKE_NEW = "LIKE";
export const DISLIKE_NEW = "DISLIKE";

const newReducer = (previousState, action) => {
  switch (action.type) {
    case RESTORE_STATE:
      return previousState.map((item) =>
        action?.ids?.includes(item.id)
          ? { ...item, isFavorite: true }
          : { ...item, isFavorite: false }
      );
    case LIKE_NEW:
      return previousState.map((item) =>
        item.id === action.id ? { ...item, isFavorite: true } : item
      );
    case DISLIKE_NEW:
      return previousState.map((item) =>
        item.id === action.id ? { ...item, isFavorite: false } : item
      );
    default:
      return previousState;
  }
};

export const EventContext = createContext();
export const useEventContext = () => useContext(EventContext);

export const useEventState = () => {
  console.log(DB);
  const [state, dispatch] = useReducer(
    newReducer,
    DB.map((item) => ({ ...item, isFavorite: false }))
  );

  const newContext = {
    numberOfFavorite: state.filter((item) => item.isFavorite).length,
    newState: state,
    newDispatch: dispatch,
    likeEvent: async (id) => {
      const fetchedItem = await AsyncStorage.getItem(FAVORITE_NEWS_KEY);
      let current = JSON.parse(fetchedItem);
      let isAlreadyFavorite = false;
      if (current !== null) {
        isAlreadyFavorite = current.some((item) => item === id);
      } else {
        current = [];
      }
      if (!isAlreadyFavorite) {
        current.push(id);
        await AsyncStorage.setItem(
          FAVORITE_NEWS_KEY,
          JSON.stringify(current)
        );
      }
      dispatch({ type: LIKE_NEW, id: id });
    },
    dislikeEvent: async (id) => {
      const fetchedItem = await AsyncStorage.getItem(FAVORITE_NEWS_KEY);
      let current = JSON.parse(fetchedItem);
      let index = -1;
      if (current !== null) {
        index = current.findIndex((item) => item === id);
      } else {
        current = [];
      }
      if (index > -1) {
        current.splice(index, 1);
        await AsyncStorage.setItem(
          FAVORITE_NEWS_KEY,
          JSON.stringify(current)
        );
      }
      dispatch({ type: DISLIKE_NEW, id: id });
    },
  };

  return [state, dispatch, newContext];
};
