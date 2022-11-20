import { v4 as uuidv4 } from 'uuid';
export const data = [
  {
    id: '1',
    Description: 'Task 1.',
    Assignee: 'Miguel',
    Due_Date: '19-Nov-2022',
    Tag:'SEO'
  },
];

export const columnsFromBackend = {
  [uuidv4()]: {
    title: 'To-do',
    items: data,
  },
  [uuidv4()]: {
    title: 'In Progress',
    items: [],
  },
  [uuidv4()]: {
    title: 'Done',
    items: [],
  },
};
