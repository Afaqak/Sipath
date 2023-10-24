import { createSelector } from 'reselect';

const selectCommentsState = (state) => state.comments;

export const selectPrimaryComments = createSelector(
  [selectCommentsState],
  (comments) => comments.primaryComments
);

export const selectCommentReplies = createSelector(
  [selectCommentsState],
  (comments) => comments.commentReplies
);
