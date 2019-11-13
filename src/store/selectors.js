import { createSelector } from 'reselect'

export const getCards = state => state.cards;

const getTagFilter = state => state.tagFilter;

//export const getCardById = (state, id) => state.cards.find(el => el.id === id);

export const getFilteredCardSelector = createSelector(
  getCards,
  getTagFilter,
  (cards, filter) => cards.filter(card => card.tags.some(tag => tag.includes(filter)))
)