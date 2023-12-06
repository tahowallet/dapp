/* eslint-disable import/prefer-default-export */
export const getRealmIdFromChallengeInLocalStorage = (id: string) =>
  id.split("_")[0]
