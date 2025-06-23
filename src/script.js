    let guests = [];

    function showGuests() {
      const guestList = document.getElementById("guest-list");
      const guestCount = document.getElementById("guest-count");
      const friendCount = document.getElementById("friend-count");
      const familyCount = document.getElementById("family-count");
      const colleagueCount = document.getElementById("colleague-count");
      const rsvpAttendingCount = document.getElementById("rsvp-attending-count");
      const rsvpNotAttendingCount = document.getElementById("rsvp-not-attending-count");

      guestList.innerHTML = "";

      for (let i = 0; i < guests.length; i++) {
        let guest = guests[i];
        let tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="font-medium">${guest.name}</td>
          <td class="category-${guest.category.toLowerCase()}">${guest.category}</td>
          <td class="text-gray-600 text-sm">${guest.timestamp}</td>
          <td>
            <span class="${guest.rsvp ? 'rsvp-attending' : 'rsvp-not-attending'}" onclick="toggleRSVP(${i})">
              <i class="fas ${guest.rsvp ? 'fa-check' : 'fa-times'}"></i> ${guest.rsvp ? 'Attending' : 'Not Attending'}
            </span>
          </td>
          <td>
            <button class="edit-btn" onclick="editGuest(${i})"><i class="fas fa-edit"></i></button>
            <button class="remove-btn" onclick="deleteGuest(${i})"><i class="fas fa-trash"></i></button>
          </td>
        `;
        guestList.appendChild(tr);
      }

      guestCount.textContent = guests.length;
      friendCount.textContent = guests.filter(g => g.category === 'Friend').length;
      familyCount.textContent = guests.filter(g => g.category === 'Family').length;
      colleagueCount.textContent = guests.filter(g => g.category === 'Colleague').length;
      rsvpAttendingCount.textContent = guests.filter(g => g.rsvp).length;
      rsvpNotAttendingCount.textContent = guests.filter(g => !g.rsvp).length;

      console.log("Guests updated:", guests);
    }

    function addGuest(name, category) {
      if (guests.length >= 10) {
        alert("Guest list is full! Maximum 10 guests.");
        return;
      }

      if (name.trim() !== "") {
        let now = new Date();
        let timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")} ${now.toDateString()}`;
        guests.push({
          name: name.trim(),
          category: category,
          rsvp: false,
          timestamp: timestamp,
        });
        showGuests();
      }
    }

    function toggleRSVP(index) {
      guests[index].rsvp = !guests[index].rsvp;
      showGuests();
      console.log("RSVP toggled for guest", index);
    }

    function deleteGuest(index) {
      guests.splice(index, 1);
      showGuests();
      console.log("Guest deleted at index", index);
    }

    function editGuest(index) {
      let newName = prompt("Enter new name for " + guests[index].name, guests[index].name);
      if (newName && newName.trim() !== "") {
        guests[index].name = newName.trim();
        showGuests();
        console.log("Guest name updated at index", index);
      }
    }

    document.addEventListener("DOMContentLoaded", function () {
      const guestForm = document.getElementById("guest-form");
      const guestNameInput = document.getElementById("guest-name");
      const guestCategorySelect = document.getElementById("guest-category");

      guestForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addGuest(guestNameInput.value, guestCategorySelect.value);
        guestNameInput.value = "";
        console.log("Form submitted, guest added");
      });

      showGuests();
    });