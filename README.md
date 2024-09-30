# To-do App

This is a Task Management Board application built with Angular. It allows users to create, delete, and manage tasks across different stages (To do, In progress, Done) using drag-and-drop functionality. The project is designed with standalone components and leverages Angular CDK's drag-and-drop features. It is responsive to both light and dark themes.

Link: https://aitishnitsa.github.io/angular-to-do-list/

The same project in React: https://github.com/Aitishnitsa/react-to-do-list

## Features

- Task Creation & Deletion: Add new tasks and delete existing ones.
- Drag-and-Drop Functionality: Organize tasks into different columns such as "To Do", "In Progress" and "Done".
- Dark Mode Support: Switch between light and dark modes.
- Standalone Components: Built using Angular standalone components for better modularity and faster loading times.
- Responsive Design: The UI adapts to different screen sizes and is mobile-friendly.
- Task Management with API Integration: Tasks are fetched, added, and deleted from a mock API.

## Technologies Used

- Angular: For building the UI components and structure.
- Angular CDK Drag and Drop: For drag-and-drop functionality.
- Tailwind CSS: For styling and responsiveness.
- RxJS: For handling asynchronous events and services.
- TypeScript: For static typing and better developer experience.
- mockAPI: For tasks fetching.

## Installation

1. Clone the repository:

```
git clone https://github.com/Aitishnitsa/angular-to-do-list.git
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:

- Navigate to the src/environments directory.
- Create a new file environment.ts if it doesn't exist.
- Add the following configuration with your API key:

```
export const environment = {
  production: false,
  API_KEY: 'your-api-key-here',
};
```

4. Start the development server:

```
ng serve
```
