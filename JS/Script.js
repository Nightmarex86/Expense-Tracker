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
const viewBtn = document.getElementById('view-btn');

addExpenseBtn.addEventListener('click', function() {
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;
    const date = document.getElementById('expense-date').value;
    const id = push(expenseRef).key; // Generate a unique key for the new expense
    set(ref(db, 'expenses/' + id), {
        name: name,
        amount: amount,
        date: date
    }).then(() => {
        alert("Expense added successfully!");
        togglePopup('add-popup'); // Hide the popup after adding expense
    }).catch((error) => {
        console.error("Error adding expense:", error);
    });
})

viewBtn.addEventListener('click', function() {})
    
        onValue(expenseRef, (snapshot) => {
            expenseLs.innerHTML = ""; // Clear the list before adding new items
            snapshot.forEach((childSnapshot) => {
                expenseLs.innerHTML += `<div class="expense-child">Expense name: ${childSnapshot.val().name} <br>Expense amount: ${childSnapshot.val().amount} L.L <br> Expense date: ${childSnapshot.val().date}</div>`;
        });
});
const deleteExpense = document.getElementById('delete-btn');
const deleteExpenseBtn = document.getElementById('delete-expense-btn');

deleteExpenseBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission
    const expenseName = document.getElementById('delete-expense-name').value;

    // Search for the expense by name
    onValue(expenseRef, (snapshot) => {
        let expenseFound = false;
        snapshot.forEach((childSnapshot) => {
            const expense = childSnapshot.val();
            if (expense.name === expenseName) {
                const expenseId = childSnapshot.key; // Get the unique key of the expense
                remove(ref(db, 'expenses/' + expenseId))
                    .then(() => {
                        alert(`Expense "${expenseName}" deleted successfully!`);
                        togglePopup('delete-popup'); // Hide the popup after deleting expense
                    })
                    .catch((error) => {
                        console.error("Error deleting expense:", error);
                    });
                expenseFound = true;
            }
        });

        if (!expenseFound) {
            alert(`Expense "${expenseName}" not found!`);
        }
    });
});
const updateExpenseBtn = document.getElementById('update-expense-btn');
updateExpenseBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission
    const expenseName = document.getElementById('update-expense-name').value;
    const newAmount = document.getElementById('update-expense-amount').value;
    const newDate = document.getElementById('update-expense-date').value;

    // Search for the expense by name
    onValue(expenseRef, (snapshot) => {
        let expenseFound = false;
        snapshot.forEach((childSnapshot) => {
            const expense = childSnapshot.val();
            if (expense.name === expenseName) {
                const expenseId = childSnapshot.key; // Get the unique key of the expense
                set(ref(db, 'expenses/' + expenseId), {
                    name: expense.name, // Keep the original name
                    amount: newAmount,
                    date: newDate
                })
                    .then(() => {
                        alert(`Expense "${expenseName}" updated successfully!`);
                        togglePopup('update-popup'); // Hide the popup after updating expense
                    })
                    .catch((error) => {
                        console.error("Error updating expense:", error);
                    });
                expenseFound = true;
            }
        });

        if (!expenseFound) {
            alert(`Expense "${expenseName}" not found!`);
        }
    });
});