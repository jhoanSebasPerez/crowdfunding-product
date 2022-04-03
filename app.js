const targetMoney = 100000;
let progressPercent = 0;
let totalBackers = 0;
let moneyRaised = 0;

let modalContainer = null;

/* 
    Get elements from DOM
*/
const body = document.querySelector("body");

const ctaButton = document.querySelector("#cta-button");
const closeButton = document.querySelector("#icon-close");

const bambooRadio = document.querySelector("#bamboo-radio");
const blackRadio = document.querySelector("#black-radio");
const noRewardRadio = document.querySelector("#no-reward-radio");

const closeModal = () => {
  const idContainer = modalContainer.id;
  if (idContainer === "menu-container") {
    modalContainer.classList.remove("menu-container");
  }
  modalContainer.classList.remove("modal-container");
  modalContainer.classList.add("hidden-modal");
  body.style.overflow = "scroll";
};

const updateInfo = ({ moneyRaised, totalBackers, progressPercent }) => {
  const moneyRaisedText = document.querySelector("#money-raised");
  const totalBackersText = document.querySelector("#total-backers");
  const progressPercentBar = document.querySelector("#progress-percent");

  moneyRaisedText.innerHTML = moneyRaised;
  totalBackersText.innerHTML = totalBackers;
  progressPercentBar.style.width =
    progressPercent >= 100 ? "100%" : `${progressPercent}%`;
};

let inputValue = null;
let radio = null;
let container = null;
let enterPledge = null;
let formEnterPledge = null;

const cleanInputs = () => {
  radio.checked = false;
  container.style.border = "1px solid rgba(0, 0, 0, 0.15)";
  enterPledge.style.display = "none";

  inputValue.value = inputValue.dataset.defaultValue;
};

const showEnterPriceSection = (target) => {
  radio = target;
  const idTarget = target.id;
  if (container) {
    container.style.border = "1px solid rgba(0, 0, 0, 0.15)";
  }

  container = target.parentNode.parentNode;
  container.style.border = "2px solid #3CB3AB";

  if (enterPledge) {
    enterPledge.style.display = "none";
  }

  switch (idTarget) {
    case "bamboo-radio":
      enterPledge = showEnterPledge("bamboo", 25);
      break;
    case "black-radio":
      enterPledge = showEnterPledge("black", 75);
      break;
    default:
      enterPledge = showNoReward();
      break;
  }
};

const btnContinueSuccess = document.querySelector("#success-continue");
btnContinueSuccess.addEventListener("click", () => {
  console.log(inputValue.value);
  moneyRaised += parseFloat(inputValue.value);
  totalBackers += 1;
  progressPercent = (moneyRaised * 100) / targetMoney;

  console.log({ moneyRaised, totalBackers, progressPercent });

  updateInfo({ moneyRaised, totalBackers, progressPercent });

  if (moneyRaised === targetMoney) {
    ctaButton.disabled = true;
    ctaButton.classList.add("deactive");
  }

  closeModal();
  cleanInputs();
});

const continueSuccess = (e) => {
  e.preventDefault();

  closeModal();
  showModal("success");
};

ctaButton.addEventListener("click", () => {
  showModal("pledge");
});

closeButton.addEventListener("click", closeModal);

bambooRadio.addEventListener("change", (e) => showEnterPriceSection(e.target));

blackRadio.addEventListener("change", (e) => showEnterPriceSection(e.target));

noRewardRadio.addEventListener("change", (e) =>
  showEnterPriceSection(e.target)
);

/* 
    Mark as bookmarked
*/
let isMark = false;
const bookmarkContainer = document.querySelector("#bookmark-container");
bookmarkContainer.addEventListener("click", () => {
  const iconBookmark = document.querySelector("#icon-bookmark");
  const iconBookmarked = document.querySelector("#icon-bookmarked");
  const bookmarkText = document.querySelector("#bookmark-text");

  if (!isMark) {
    iconBookmark.style.display = "none";
    iconBookmarked.style.display = "inline";

    bookmarkText.style.color = "#147A73";
    bookmarkText.innerHTML = "Bookmarked";

    isMark = true;
  } else {
    iconBookmark.style.display = "inline";
    iconBookmarked.style.display = "none";

    bookmarkText.style.color = "#7A7A7A";
    bookmarkText.innerHTML = "Bookmark";

    isMark = false;
  }
});

/* 
  Triger menu container
*/
let navbar = null;

const iconMenu = document.querySelector("#icon-menu");
iconMenu.addEventListener("click", () => {
  const menu = document.querySelector("#menu");
  navbar = document.querySelector("#navbar");
  navbar.style.position = "fixed";

  iconMenu.style.display = "none";
  iconCloseMenu.style.display = "inline";

  showModal("menu");
  modalContainer.insertBefore(navbar, menu);
});

const iconCloseMenu = document.querySelector("#icon-close-menu");
iconCloseMenu.addEventListener("click", () => {
  iconCloseMenu.style.display = "none";
  iconMenu.style.display = "inline";

  const hero = document.querySelector("#hero");
  navbar.style.position = "absolute";
  hero.appendChild(navbar);

  closeModal();
});

const showModal = (name) => {
  modalContainer = document.querySelector(`#${name}-container`);
  modalContainer.classList.add("modal-container");

  const modal = document.querySelector(`#${name}`);
  modal.classList.add("modal");

  if (name !== "menu") {
    const content = document.querySelector(`#${name}-content`);
    content.classList.add("modal__content");

    body.style.overflow = "hidden";
    modalContainer.style.top = `${window.pageYOffset}px`;
    modalContainer.classList.remove("hidden-modal");
    modalContainer.classList.add("show-modal");
  } else {
    modalContainer.classList.add("menu-container");
    modal.classList.add("menu");
  }
};

const showNoReward = () => {
  const container = document.querySelector("#no-reward-container");

  const noRewardContainer = createElementAndSetAttributes(
    "div",
    {
      id: "no-reward",
    },
    "enter-pledge-container"
  );
  container.appendChild(noRewardContainer);

  const noReward = createElementAndSetAttributes("div", {}, "enter-pledge");
  noReward.classList.add("no-reward");
  noRewardContainer.appendChild(noReward);

  const button = createElementAndSetAttributes("button", {}, "btn", "Continue");
  button.addEventListener("click", () => {
    closeModal();
  });
  noReward.appendChild(button);

  return noRewardContainer;
};

const showEnterPledge = (name, initialPledge) => {
  const container = document.querySelector(`#${name}-pledge`);

  const containerEnter = createElementAndSetAttributes(
    "div",
    { id: `${name}-enter` },
    "enter-pledge-container"
  );
  container.appendChild(containerEnter);

  formEnterPledge = createElementAndSetAttributes(
    "form",
    {
      id: `${name}-form`,
    },
    "enter-pledge"
  );

  formEnterPledge.addEventListener("submit", (e) => continueSuccess(e));

  containerEnter.appendChild(formEnterPledge);

  const label = createElementAndSetAttributes(
    "label",
    {
      for: `${name}-input`,
    },
    "",
    "Enter your pledge"
  );
  formEnterPledge.appendChild(label);

  const optionsContainer = createElementAndSetAttributes(
    "div",
    {},
    "enter-pledge__options"
  );
  formEnterPledge.appendChild(optionsContainer);

  const enterPrice = createElementAndSetAttributes("div", {}, "enter-price");
  optionsContainer.appendChild(enterPrice);

  const paragraph = createElementAndSetAttributes("p", {}, "", "$");
  enterPrice.appendChild(paragraph);

  inputValue = createElementAndSetAttributes("input", {
    id: `${name}-input`,
    type: "number",
    min: `${initialPledge}`,
    value: `${initialPledge}`,
    "data-default-value": `${initialPledge}`,
  });
  inputValue.addEventListener("input", (e) => {
    inputValue.value = e.target.value;
  });
  enterPrice.appendChild(inputValue);

  const button = createElementAndSetAttributes(
    "button",
    { type: "submit" },
    "btn",
    "Continue"
  );
  optionsContainer.appendChild(button);

  return containerEnter;
};

const createElementAndSetAttributes = (
  element,
  attributes = {},
  className = "",
  content = ""
) => {
  const newElement = document.createElement(element);

  if (className) {
    newElement.classList.add(className);
  }

  if (Object.keys(attributes).length > 0) {
    for (const prop in attributes) {
      newElement.setAttribute(`${prop}`, attributes[prop]);
    }
  }

  newElement.innerHTML = content;

  return newElement;
};
