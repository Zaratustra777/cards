import * as types from "./actionTypes";

export function fetchSuccess(payload) {
  return { type: types.FETCH_SUCCESS, payload };
}

export function cardUpdate(payload) {
  return { type: types.CARD_UPDATE, payload };
}

export function fetch() {
  return { type: types.FETCH};
}

export function sortChanged(field, direction) {
  return {type: types.SORT_CHANGED, payload: { direction, field}};
}

export function tagFilterChanged(value) {
  return {type: types.FILTER_CHANGED, payload: value}
}
