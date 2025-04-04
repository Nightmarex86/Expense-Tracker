import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, onValue, remove,push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
const firebaseConfig = {
    databaseURL:"https://expense-tracker-5ccb8-default-rtdb.europe-west1.firebasedatabase.app/"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const expenseRef = ref(db, 'expenses/');
// Function to toggle popup visibility
function togglePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.toggle('show'); // Add or remove the 'show' class
}

// Add event listeners for each button
document.getElementById('add-btn').addEventListener('click', () => togglePopup('add-popup'));
document.getElementById('view-btn').addEventListener('click', () => togglePopup('view-popup'));
document.getElementById('delete-btn').addEventListener('click', () => togglePopup('delete-popup'));
document.getElementById('update-btn').addEventListener('click', () => togglePopup('update-popup'));

// Add event listeners for all cancel buttons
document.querySelectorAll('.cancel-btn').forEach((button) => {
    button.addEventListener('click', function () {
        const popup = this.closest('.popup'); // Find the closest popup container
        popup.classList.remove('show'); // Remove the 'show' class to hide the popup
    });
});


const expenseLs = document.getElementById('expense-list');
const addExpenseBtn= document.getElementById('add-expense-btn');




