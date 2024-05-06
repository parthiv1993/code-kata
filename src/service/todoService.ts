import apiURLs from "../constants/apiURLs";
import axiosHelpers from "../helper/axios";

interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodo = async (itemNumber: number): Promise<TodoItem> => {
  const requestURL = `${apiURLs.TODO_BASE_URL}/${itemNumber}`;
  try {
    const result = await axiosHelpers.getRequest(requestURL);

    return result.data;
  } catch (err) {
    console.log("failed request to ", requestURL);
    throw new Error("Error while fetching Todo Item");
  }
};

const fetchMultipleTodo = (itemNumbers: Array<number>) => {
  try {
    return Promise.all(itemNumbers.map(fetchTodo));
  } catch (err) {
    throw err;
  }
};

export const fetchFirst20EvenTodo = async () => {
  try {
    const numberOfItemsToFetch = 20;

    const indicesToFetch = [];

    let i = 1;
    while (indicesToFetch.length < numberOfItemsToFetch) {
      if (i % 2 === 0) {
        indicesToFetch.push(i);
      }
      i++;
    }

    const response = await fetchMultipleTodo(indicesToFetch);

    return response;
  } catch (err) {
    throw err;
  }
};

export default {
  fetchTodo,
  fetchFirst20EvenTodo,
  fetchMultipleTodo,
};
