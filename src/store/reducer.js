import * as types from "./actionTypes";
import { put, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as selectors from "./selectors";
import axios from "axios";

const initialState = {
  fetchedData: null,
  tagFilter: '',
  cards: []
};

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_SUCCESS:
      return { ...state, ...payload };
    case types.CARD_UPDATE:
      const { id, tags } = payload;

      return { ...state, cards: state.cards.map(card => {
        if(card.id !== id) {
          return card;
        }
        return {
          ...card, tags
        }
      })};
    case types.SORT_CHANGED:
      const { direction, field } = payload;
      const dir = direction === "desc" ? 1 : -1;

      return {
        ...state,
        cards: [
          ...state.cards.sort((card1, card2) => {
            return dir * (card1[field] - card2[field]);
          })
        ]
      };

    case types.FILTER_CHANGED:
      return {
        ...state,
        tagFilter: payload,
      };

    default:
      return state;
  }
}

function* fetch() {
  try {
    const url =
      "https://pixabay.com/api/?key=14246129-7f3bcd920112d4be029d1e1eb&q=cats&image_type=all&per_page=100";

    const response = yield axios.get(url);
    if (response.status === 200) {
      console.log(response.data);
      const cards = response.data.hits.map(el => ({
        imgUrl: el.previewURL,
        tags: el.tags.split(", "),
        comments: el.comments,
        likes: el.likes,
        id: el.id,
        pageUrl: el.pageURL
      }));
      yield put(actions.fetchSuccess({ fetchedData: response, cards }));
    } else {
      throw new Error("staus code: " + response.status);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* sagas() {
  yield takeEvery(types.FETCH, fetch);
}
