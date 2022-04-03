# Frontend Mentor - Crowdfunding product page solution

This is a solution to the [Crowdfunding product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Crowdfunding product page solution](#frontend-mentor---crowdfunding-product-page-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- See hover states for interactive elements
- Make a selection of which pledge to make
- See an updated progress bar and total money raised based on their pledge total after confirming a pledge
- See the number of total backers increment by one after confirming a pledge
- Toggle whether or not the product is bookmarked

### Screenshot

![](./screenshot-desktop.jpg)
![](./screenshot-mobile.jpg)

### Links

- Solution URL: [GitHub repository](https://github.com/jhoanSebasPerez/crowdfunding-product)
- Live Site URL: [Live solution site](https://jhoansebasperez.github.io/crowdfunding-product/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript (ES6)

### What I learned

- Get elements from the DOM and add an Event handler, events vary for each type of element.

      ```js

  const input = document.querySelector("input");
  input.addEventListener("input", callback);
  ```

- Creating, showing, and hiding DOM elements dynamically, as well as inserting children and adding styles to them with the help of the browser API

      ```js

  const container = document.createElement("div");
  container.classList.add("class-style");
  container.appendChild(elementChild);

      //to show and hidden element
      container.style.display ="block";
      container.style.display = "none";
      ```

  -Increasing the progress of the bar by combining Javascript and element width with percentage

````js
progressPercentBar.style.width =
progressPercent >= 100 ? "100%" : `${progressPercent}%`;
    ```



### Continued development

Employ a component-oriented way of programming, making use of libraries such as React JS.

### Useful resources

- [MDN Web Docs](https://developer.mozilla.org/en-US/) - Learn the browser API and methods for traversing arrays and JavaScript language syntax, and how to interact with DOM elements


## Author

- GitHub - [@jhoanSebasPerez](https://github.com/jhoanSebasPerez)
- Frontend Mentor - [@jhoanSebasPerez](https://www.frontendmentor.io/profile/jhoanSebasPerez)
- Twitter - [@JhoanPerezA0](https://twitter.com/JhoanPerezA0)
````
