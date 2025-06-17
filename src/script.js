// List to store all guests
let guests = [];

// Function to show guests in the list
function showGuests() {
  // Get the list and count elements from HTML
  let guestList = document.getElementById("guest-list");
  let guestCount = document.getElementById("guest-count");

  // Clear the list
  guestList.innerHTML = "";

  // Loop through each guest
  for (let i = 0; i < guests.length; i++) {
    let guest = guests[i];
    // Create a list item
    let li = document.createElement("li");
    li.className = "guest-item";
    li.innerHTML = `
      <div>
        <span class="category-${guest.category.toLowerCase()}">${
      guest.category
    }</span>
        <span>${guest.name}</span>
        <span class="timestamp">Added: ${guest.timestamp}</span>
      </div>
      <div>
        <span class="${
          guest.rsvp ? "rsvp-attending" : "rsvp-not-attending"
        }" onclick="toggleRSVP(${i})">
          ${guest.rsvp ? "Attending" : "Not Attending"}
        </span>
        <button class="edit-btn" onclick="editGuest(${i})">✎</button>
        <button class="remove-btn" onclick="deleteGuest(${i})">✕</button>
      </div>
    `;
    guestList.appendChild(li);
  }

  // Update the total guest count
  guestCount.innerText = guests.length;
  console.log("Guests updated:", guests); // For testing
}

// Function to add a guest
function addGuest(name, category) {
  // Check if the guest list is full
  if (guests.length >= 10) {
    alert("Guest list is full! Maximum 10 guests.");
    return;
  }

  // Only add if name is not empty
  if (name.trim() !== "") {
    // Get current time for timestamp
    let now = new Date();
    let timestamp = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${now.toDateString()}`;

    // Add new guest to the list
    guests.push({
      name: name.trim(),
      category: category,
      rsvp: false,
      timestamp: timestamp,
    });
    showGuests();
  }
}

// Function to toggle RSVP status
function toggleRSVP(index) {
  guests[index].rsvp = !guests[index].rsvp;
  showGuests();
  console.log("RSVP toggled for guest", index); // For testing
}

// Function to delete a guest
function deleteGuest(index) {
  guests.splice(index, 1);
  showGuests();
  console.log("Guest deleted at index", index); // For testing
}

// Function to edit a guest's name
function editGuest(index) {
  let newName = prompt(
    "Enter new name for " + guests[index].name,
    guests[index].name
  );
  if (newName && newName.trim() !== "") {
    guests[index].name = newName.trim();
    showGuests();
    console.log("Guest name updated at index", index); // For testing
  }
}

// When the page loads, set up the form
document.addEventListener("DOMContentLoaded", function () {
  let guestForm = document.getElementById("guest-form");
  let guestNameInput = document.getElementById("guest-name");
  let guestCategorySelect = document.getElementById("guest-category");

  // Handle form submission
  guestForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page from reloading
    addGuest(guestNameInput.value, guestCategorySelect.value);
    guestNameInput.value = ""; // Clear the input field
    console.log("Form submitted, guest added"); // For testing
  });

  // Show the initial guest list
  showGuests();
});
