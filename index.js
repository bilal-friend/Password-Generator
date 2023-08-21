// Get DOM elements
const inputLength = document.querySelector(".length input"); // Input field for password length
const lenP = document.querySelector(".len"); // Element to display password length
const generateBtn = document.querySelector("button"); // Button to generate password
const passwordInput = document.querySelector(".pass input"); // Input field to display generated password
const lengthInd = document.querySelector(".pass span span");
const copyIcon = document.querySelector("i:first-of-type");
const checkIcon = document.querySelector("i:nth-of-type(2)");
const toggleIcons = () => {
  checkIcon.classList.toggle("hide");
  copyIcon.classList.toggle("hide");
};

// Define character choices
const choices = [
  "abcdefghijklmnopqrstuvwxyz", // Lowercase letters
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Uppercase letters
  "0123456789", // Numbers
  `!@#$%^&*()_+{}[]|:;"'<>,.?/`, // Symbols
  " ", // Space
];
generateBtn.click = generatePassowrd();
// Update length of password (generate new one) on input change
inputLength.addEventListener("change", () => {
  lengthInd.style.width = (inputLength.value * 100) / 30 + "%";
  inputLength.value > 16
    ? (lengthInd.style.background = "#4284ed")
    : inputLength.value <= 8
    ? (lengthInd.style.background = "#d2615d")
    : (lengthInd.style.background = "#e2d04d");
  lenP.textContent = inputLength.value;
  generatePassowrd();
});

// Generate password on button click
generateBtn.addEventListener("click", generatePassowrd);

copyIcon.addEventListener("click", () => {
  toggleIcons();
  setTimeout(toggleIcons, 1500);
  navigator.clipboard.writeText(passwordInput.value);
});
function generatePassowrd() {
  passwordInput.value = ""; // Clear previous password
  const passwordLength = inputLength.value; // Get password length from input field

  const params = [
    document.querySelector("#lc").checked, // Lowercase letters checkbox
    document.querySelector("#uc").checked, // Uppercase letters checkbox
    document.querySelector("#n").checked, // Numbers checkbox
    document.querySelector("#symbols").checked, // Symbols checkbox
    document.querySelector("#is").checked, // Include similar characters checkbox
  ];

  const excludeSimilar = document.querySelector("#xd").checked; // Exclude similar characters checkbox

  const selectedComponents = params.reduce((acc, curr, index) => {
    if (curr) acc.push(index); // Add the index of selected components to the array
    return acc;
  }, []);

  for (let i = 0; i < passwordLength; i++) {
    const randomComponentIndex = Math.floor(
      Math.random() * selectedComponents.length
    ); // Randomly select a component from the selected components
    const randomComponentCharacters =
      choices[selectedComponents[randomComponentIndex]]; // Get the characters for the selected component
    const randomCharacter =
      randomComponentCharacters[
        Math.floor(Math.random() * randomComponentCharacters.length)
      ]; // Randomly select a character from the component

    if (excludeSimilar && passwordInput.value.includes(randomCharacter)) {
      // Check if similar characters should be excluded and if the character is already in the password
      i--; // If so, decrement the loop counter to generate another character
    } else {
      passwordInput.value += randomCharacter; // Append the character to the password
    }
  }
}
