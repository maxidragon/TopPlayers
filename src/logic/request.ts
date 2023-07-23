export const wcaApiFetch = (path: string) => {
  const baseApiUrl = `https://www.worldcubeassociation.org/api/v0`;
  const url = `${baseApiUrl}${path}`;
  return fetch(url).then((response) => response.json());
};