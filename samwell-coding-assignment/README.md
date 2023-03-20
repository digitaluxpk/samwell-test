# Samwell Full Stack (React) Coding Solution

## Overview

This is coding solution for Samwell Full Stack (React) Coding Exercise. The solution is built using React, React-hooks and Tailwind CSS.

## How to run?

1. Install dependencies using `npm install`
2. Run the application using `npm run dev`
3. Open the application in browser using `http://localhost:[port]`

## Overview of the solution

The solution is built using React, React-hooks and Tailwind CSS. As this is small application, So I haven't used any state management library like Redux. I have used React-hooks to manage the state of the application. I have used Tailwind CSS for styling the application.

In App.js, I have created a state variable `selectedCandidate` to store the selected candidate. I have created a state variable `apiData` to store the data fetched from the API. I have also batched api call in promise.all so that the all data can be loaded once in parallel api call. This structure is used to avoid multiple api calls to the server. I have shown question and there corresponding video only when the candidate is selected. I have also shown comments side by the videos. I have also added a button `add` to add comment to any question.

## Notes

To run the application properly, please make sure that json server is running on port `3010`. Otherwise, you can change the port in `src/App.jsx` file for 3 api call functions `getQuestions`, `getVideos` and `getComments`.