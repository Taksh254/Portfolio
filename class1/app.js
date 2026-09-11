/**
 * Slot State Management Logic
 * 
 * Architectural rule:
 * Application State -> State Class -> CSS -> Visual Appearance
 * 
 * JavaScript only manages logical state and updates class names.
 * JavaScript NEVER assigns colors, backgrounds, or borders directly via inline styles.
 */

// Initial slots configuration with all 4 distinct demonstration states
const INITIAL_SLOTS = [
  {
    id: "slot-1",
    time: "09:00 AM",
    title: "Morning Slot",
    desc: "Click to select this slot",
    status: "available", // 'available' | 'booked' | 'selected' | 'unavailable'
  },
  {
    id: "slot-2",
    time: "11:30 AM",
    title: "Midday Slot",
    desc: "Already reserved by user",
    status: "booked",
  },
  {
    id: "slot-3",
    time: "02:00 PM",
    title: "Afternoon Slot",
    desc: "Currently chosen slot",
    status: "selected",
  },
  {
    id: "slot-4",
    time: "04:30 PM",
    title: "Evening Slot",
    desc: "Not available for booking",
    status: "unavailable",
  },
];

// Working copy of slot state
let slots = JSON.parse(JSON.stringify(INITIAL_SLOTS));
let statusMessageTimer = null;

/**
 * Renders the slots into the DOM.
 * Applies state classes: .available, .booked, .selected, .unavailable.
 * No inline styles for colors are set.
 */
function renderSlots() {
  const gridContainer = document.getElementById("slotGrid");
  if (!gridContainer) return;

  gridContainer.innerHTML = "";

  slots.forEach((slot) => {
    // Accessible button element for keyboard and screen reader support
    const slotEl = document.createElement("button");
    slotEl.type = "button";
    slotEl.id = slot.id;

    // STEP 4: CSS ONLY FOR VISUAL STATE
    // The class name dictates all styling: slot + status
    slotEl.className = `slot ${slot.status}`;

    // Accessibility attributes based on state
    if (slot.status === "selected") {
      slotEl.setAttribute("aria-pressed", "true");
      slotEl.setAttribute("aria-label", `${slot.time}, ${slot.title}, status: selected`);
    } else if (slot.status === "available") {
      slotEl.setAttribute("aria-pressed", "false");
      slotEl.setAttribute("aria-label", `${slot.time}, ${slot.title}, status: available`);
    } else if (slot.status === "booked") {
      slotEl.setAttribute("aria-disabled", "true");
      slotEl.setAttribute("aria-label", `${slot.time}, ${slot.title}, status: booked, not selectable`);
    } else if (slot.status === "unavailable") {
      slotEl.setAttribute("aria-disabled", "true");
      slotEl.setAttribute("aria-label", `${slot.time}, ${slot.title}, status: unavailable, not selectable`);
    }

    // Badge label text
    const badgeText = slot.status.toUpperCase();

    slotEl.innerHTML = `
      <div class="slot-header">
        <span class="slot-time">${slot.time}</span>
        <span class="slot-badge">${badgeText}</span>
      </div>
      <div class="slot-body">
        <div class="slot-title">${slot.title}</div>
        <div class="slot-desc">${slot.desc}</div>
      </div>
    `;

    // Click handler for interactive selection
    slotEl.addEventListener("click", () => handleSlotClick(slot.id));

    gridContainer.appendChild(slotEl);
  });

  updateFeedback();
}

/**
 * Handles slot interaction:
 * - Clicking 'available' selects it and unselects any previously selected slot (single-slot booking).
 * - Clicking 'selected' unselects it back to 'available'.
 * - 'booked' and 'unavailable' slots cannot be selected.
 */
function handleSlotClick(slotId) {
  const slotIndex = slots.findIndex((s) => s.id === slotId);
  if (slotIndex === -1) return;

  const currentSlot = slots[slotIndex];

  if (currentSlot.status === "booked") {
    showStatusMessage("This slot is already booked and cannot be selected.");
    return;
  }

  if (currentSlot.status === "unavailable") {
    showStatusMessage("This slot is unavailable for booking.");
    return;
  }

  if (currentSlot.status === "selected") {
    // Unselect back to available
    currentSlot.status = "available";
    currentSlot.desc = "Click to select this slot";
    showStatusMessage(`Deselected ${currentSlot.time} (${currentSlot.title}).`);
  } else if (currentSlot.status === "available") {
    // Deselect any previously selected slot so only ONE slot is chosen
    slots.forEach((s) => {
      if (s.status === "selected") {
        s.status = "available";
        s.desc = "Click to select this slot";
      }
    });

    // Select this slot
    currentSlot.status = "selected";
    currentSlot.desc = "Currently chosen slot";
    showStatusMessage(`Selected ${currentSlot.time} (${currentSlot.title}). Click "Confirm Booking" to finalize.`);
  }

  renderSlots();
}

/**
 * Confirms booking for the currently selected slot
 */
function handleConfirmBooking() {
  const selectedIndex = slots.findIndex((s) => s.status === "selected");
  if (selectedIndex === -1) {
    showStatusMessage("Please select an available slot before confirming.");
    return;
  }

  const slot = slots[selectedIndex];
  slot.status = "booked";
  slot.desc = "Reserved by you";

  renderSlots();
  showStatusMessage(`Booking confirmed! You have booked ${slot.time} (${slot.title}).`);
}

/**
 * Updates status bar message with temporary notice or default summary
 */
function showStatusMessage(msg) {
  const msgEl = document.getElementById("statusMessage");
  if (!msgEl) return;

  if (statusMessageTimer) {
    clearTimeout(statusMessageTimer);
    statusMessageTimer = null;
  }

  msgEl.textContent = msg;

  statusMessageTimer = setTimeout(() => {
    updateFeedback();
    statusMessageTimer = null;
  }, 3500);
}

/**
 * Updates summary info and button states in control bar
 */
function updateFeedback() {
  const msgEl = document.getElementById("statusMessage");
  const bookBtn = document.getElementById("bookBtn");

  const selectedSlot = slots.find((s) => s.status === "selected");
  const availableCount = slots.filter((s) => s.status === "available").length;

  if (bookBtn) {
    bookBtn.disabled = !selectedSlot;
  }

  // Only update text if a temporary status message is not actively showing
  if (msgEl && !statusMessageTimer) {
    if (selectedSlot) {
      msgEl.innerHTML = `Selected: <strong>${selectedSlot.time} (${selectedSlot.title})</strong> | Available: <strong>${availableCount}</strong>`;
    } else {
      msgEl.innerHTML = `Selected: <strong>None</strong> | Available: <strong>${availableCount}</strong>`;
    }
  }
}

/**
 * Reset all slots to initial demonstration states
 */
function resetSlots() {
  if (statusMessageTimer) {
    clearTimeout(statusMessageTimer);
    statusMessageTimer = null;
  }
  slots = JSON.parse(JSON.stringify(INITIAL_SLOTS));
  renderSlots();
  showStatusMessage("Slot states reset to default demonstration.");
}

/**
 * Initialize app and bind controls
 */
function init() {
  renderSlots();

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetSlots);
  }

  const bookBtn = document.getElementById("bookBtn");
  if (bookBtn) {
    bookBtn.addEventListener("click", handleConfirmBooking);
  }
}

// Ensure init executes regardless of whether DOMContentLoaded already fired
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
