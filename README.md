# PhotoFolio

PhotoFolio is a React app designed for managing digital photo albums, offering users a platform to upload, organize, and share their photos online.

## Features

- **Album Management**: Users can create, organize, and manage their photo albums.
- **Image Management**: Upload, update, and delete images within specific albums.
- **User-friendly Interface**: Visually appealing design encouraging exploration and regular usage.

## Components

- **AlbumForm**: Create new albums.
- **AlbumsList**: Display list of albums.
- **ImageForm**: Add or update images.
- **ImagesList**: Display list of images within an album.
- **Carousel**: View images in a modal carousel.
- **Navbar**: Navigation bar for easy access.

## Third-party Libraries

- **react-spinner-material**: Provides loading spinner during data fetch.
- **react-toastify**: Display notifications for async actions.

## Setup

- Clone the repository `https://github.com/gautamuniverse/photofolio.git`
- Initialize Firebase Firestore database details in the src/config/firestoreInit.js file for storing albums and images.
- Install dependencies: `npm install`
- Start the server: `npm start`
- Open your browser and navigate to `http://localhost:3000`

## Live Website
[PhotoPholio](https://photofoliogautam.netlify.app/)


## Implementation Steps

1. **AlbumsList Component**:
   - Display list of albums from the database.

2. **AlbumForm Component**:
   - Add new albums to the database.

3. **ImagesList Component**:
   - Display images within selected album.

4. **ImageForm Component**:
   - Add or update images within albums.

5. **Additional Features**:
   - Implemented edit and delete functionality for images.
   - Implemented delete functionality for albums.
   - Created modal carousel for image viewing.

## Firebase/Firestore Database API Structure

- **albums**: Stores album data.
- **images**: Stores image data associated with albums.

## Contact Information
- **Author:** Gautam
- **GitHub:** [gautamuniverse](https://github.com/gautamuniverse)
- **LinkedIn:** [Gautam](https://www.linkedin.com/in/gautam-116307bb/)
- **Instagram:** [@gautamuniverse.in](https://www.instagram.com/gautamuniverse.in/)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
