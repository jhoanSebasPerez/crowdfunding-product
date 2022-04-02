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
const btnNoReward = document.querySelector("#btn-no-reward");

const bambooRadio = document.querySelector("#bamboo-radio");
const bambooForm = document.querySelector("#bamboo-form");

const blackRadio = document.querySelector("#black-radio");
const blackForm = document.querySelector("#black-form");
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
  progressPercentBar.style.width = `${progressPercent}%`;
};

let inputValue = null;
let radio = null;
let container = null;
let enterPledge = null;

const cleanInputs = () => {
  console.log({ radio, container, enterPledge });
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
      enterPledge = document.querySelector("#bamboo-enter");
      enterPledge.style.display = "block";
      break;
    case "black-radio":
      enterPledge = document.querySelector("#black-enter");
      enterPledge.style.display = "block";
      break;
    default:
      enterPledge = document.querySelector("#no-reward");
      enterPledge.style.display = "block";
      break;
  }
};

const btnContinueSuccess = document.querySelector("#success-continue");
btnContinueSuccess.addEventListener("click", () => {
  moneyRaised += parseFloat(inputValue.value);
  totalBackers += 1;
  progressPercent = (moneyRaised * 100) / targetMoney;

  updateInfo({ moneyRaised, totalBackers, progressPercent });
  closeModal();
  cleanInputs();
});

const continueSuccess = (e, inputId) => {
  e.preventDefault();
  inputValue = document.querySelector(`#${inputId}`);

  closeModal();
  showModal("success");
  /* modalContainer = document.querySelector("#success-container");
  modalContainer.style.top = `${window.pageYOffset}px`;

  modalContainer.classList.add("show-modal"); */
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

btnNoReward.addEventListener("click", () => {
  closeModal();
});

bambooForm.addEventListener("submit", (e) =>
  continueSuccess(e, "bamboo-input")
);

blackForm.addEventListener("submit", (e) => continueSuccess(e, "black-input"));

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
