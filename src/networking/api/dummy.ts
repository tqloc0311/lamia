import { fetchData } from '../networkLayer';

export const todo = async () => {
  return fetchData('https://jsonplaceholder.typicode.com/todos/1');
};
