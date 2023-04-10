function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

/**
 * Close modal form
 */
function closeModal() {
  modalbg.style.display = "none";
}

const form = document.querySelector('#reserve');

const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const listCity = document.getElementsByName('location');


/**
 * Vérification avant envoie des champs du formulaire
 * @returns 
 */
function validate() {
  const regexName = /^[A-Z a-z]{2,30}$/; /*min 2 caractères*/
  const regexEmail = /^[a-z A-Z 0-9+_.-]+@[a-z A-Z 0-9.-]+\.[a-z A-Z]+$/;
  const regexQuantity = /^[0-9]+$/;

  let locResult = validateField(firstName, "prénom", regexName);
  locResult &= validateField(lastName, "nom", regexName);
  locResult &= validateField(email, "email", regexEmail);
  locResult &= validateBirthdate();
  locResult &= validateField(quantity,"nombre de tournoi", regexQuantity);
  locResult &= validateCity();
  locResult &= acceptConditions();

  if(!locResult){
    return;
  } else {
    alert('ok');
  } 
};

/**
 * Pour vérifier que les champs Prénom, Nom et Email sont remplis correctement.
 * @param {HTMLElement} parElement 
 * @param {String} parName 
 * @param {RegExp} parRegex 
 * @returns {boolean}
 */
function validateField(parElement, parName, parRegex) {
  const parent = parElement.parentNode;

  if (!parRegex.test(parElement.value)) {
    parElement.focus();
    parent.setAttribute("data-error", "Le champ " + parName + " est requis et/ou n'est pas rempli correctement");
    parent.setAttribute("data-error-visible", "true");
    return false;
  }
  parent.setAttribute("data-error-visible", "false");
  return true;
}

/**
 * Pour valider le fait que l'utilisateur ait bien rentré une date et ait plus de 18 ans.
 * @returns {boolean}
 */
function validateBirthdate(){
  form.addEventListener('submit', function(e) {
    e.preventDefault();
  });
  let locDate = new Date();
  let locDateUser = new Date(birthdate.value);
  let locAge = ageCalculation(locDate, locDateUser);
  const parent = birthdate.parentNode;
  if(locAge < 18){
    birthdate.focus();
    parent.setAttribute("data-error", "Vous devez avoir plus de 18 ans");
    parent.setAttribute("data-error-visible", "true");
    return false;
  }
  parent.setAttribute("data-error-visible", "false");
  return true;
}

/**
 * Pour valider le fait qu'au moins un bouton radio est sélectionné.
 * @returns {boolean}
 */
function validateCity() {
  let locCity = document.getElementById('location1')

  for(let i=0; i<6; i++) {
    if(listCity[i].checked === true) {
      listCity[i].parentNode.setAttribute("data-error-visible", "false");
      return true;
    }
  }
  locCity.parentNode.setAttribute("data-error", "Sélectionnez au moins un tournoi");
  locCity.parentNode.setAttribute("data-error-visible", "true");

  return false;
}

/**
 * Calcul de l'âge partir d'une date de naissance.
 * @param {Date} parDate  : date courante
 * @param {Date} parBirthdate : date entrée par l'utilisateur
 * @returns {number}
 */
function ageCalculation(parDate, parBirthdate){
  let locUserYear = parBirthdate.getYear();
  let locUserMonth = parBirthdate.getMonth();
  let locUserDay = parBirthdate.getDay();

  let locCurrentYear = parDate.getYear();
  let locCurrentMonth = parDate.getMonth();
  let locCurrentDay = parDate.getDay();

  let locAge = locCurrentYear - locUserYear;
  if (locUserMonth < locCurrentMonth){
    locAge-- ;
    return locAge;
  }
  if (locCurrentMonth === locUserMonth) {
    if (locCurrentDay < locUserDay) {
      locAge--;
    }
  }
  return locAge;
}
/**
 * Pour vérifier que le bouton radio est bien coché.
 * @returns {boolean}
 */
function acceptConditions() {
  const locAccept = document.getElementById('checkbox1');
  const locParent = locAccept.parentNode;

  if (locAccept.checked) {
    locParent.setAttribute("data-error-visible", "false");
    return true;
  }
  locParent.setAttribute("data-error", "Vous devez accepter les conditions générales");
  locParent.setAttribute("data-error-visible", "true");

  return false;
}

/*
Pour éviter que la modale se ferme lorsqu'il y a des erreurs.
*/
form.addEventListener('submit', function(e) {
  e.preventDefault();
});