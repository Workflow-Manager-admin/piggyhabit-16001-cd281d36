# PiggyHabit Main Container: Requirements Document

## Overview

PiggyHabit is a motivational, web-based piggy bank tracking application. It enables users to manually manage their savings in a fun, visually appealing interface that simulates the classic piggy bank experience. The main container is the primary React frontend, designed for all ages, with a focus on habit-building around savings—without dealing with real money transactions.

---

## Product Features

- **Add Savings:** Users can manually enter an amount to increase their piggy bank balance.
- **Remove Savings:** Users can subtract an amount, simulating spending or withdrawal from their savings.
- **Savings History:** The app presents a chronological log of all savings added or withdrawn for user review and tracking.
- **Set Savings Goal:** Users set a target amount to save, which the app tracks and visually indicates progress toward.
- **Progress Visualization:** A progress bar, piggy bank graphic, or similar visual indicator shows how close the user is to reaching their savings goal.

---

## UI/UX Guidelines

- **Theme:** Light, motivational, and colorful to appeal to children as well as adults.
- **Color Palette:**  
  - Primary: `#FFB300`
  - Secondary: `#FFF8E1`
  - Accent: `#E65100`
- **Layout:**  
  - Prominent piggy bank icon and large display of current balance at center/top.
  - Add and Remove Savings actions as prominent buttons.
  - Savings goal progress shown with a bar or graphic (e.g., filling piggy bank).
  - Savings History section/tab for reviewing transactions.
  - Clean, spacious, responsive design to ensure readability and accessibility.
  - Visual cues and feedback for user actions (button transitions, highlights, completeness when goal met).
- **Accessibility:**  
  - Text and UI controls designed to be usable with keyboard and screen readers.
  - Sufficient contrast; proper semantic HTML for headings, roles, and inputs.
  - Responsive design for desktop/tablet/mobile screens.

---

## Technical Stack

- **Frontend:** React JS (no frameworks or libraries beyond React)
- **Language:** JavaScript (ES6+)
- **Styling:** Pure CSS, using class names scoped for PiggyHabit (avoid conflicts with global or template styles)
- **Backend:** None—entirely client-side, optional `localStorage` support for persistence, but not required by default.
- **Build/Run:** Use standard React scripts (`react-scripts`) for local development and build processes.

---

## Major Components (Planned)

- **Main Container (App):** Entry point, handles state and routing (if needed, though single-page for MVP).
- **Piggy Bank Display:** Shows current balance and graphical piggy bank/progress bar.
- **Savings Input & Actions:** Components for inputting new savings or withdrawals, including validation and positive feedback.
- **Savings History List:** Displays all transactions, sorted chronologically, with date/amount/action type.
- **Goal Setting:** UI for setting or updating the savings target and visual progress display.

---

## Expected User Interactions

- **Adding Savings:** 
  - Click 'Add Savings', enter an amount, confirm (with potential animation or sound).
  - Updated balance and visual indicator respond instantly.
- **Removing Savings:**
  - Click 'Remove Savings', enter amount, confirm. Prevent negative balances.
  - Savings history and balance update accordingly.
- **Setting/Updating Goal:** 
  - User inputs a target value; app recalculates progress and updates visualization.
- **Reviewing History:** 
  - Navigate to/view savings history, see details for each transaction (amount, date, type).
- **View Progress:** 
  - Visual summary shows at a glance how close they are to their goal.

---

## Architectural Constraints

- All logic is managed through React Hooks and local component state. No backend integration or persistent user accounts.
- No reliance on any UI framework (e.g., Material UI, Bootstrap)—all UI is custom using CSS.
- CSS class names should be unique to PiggyHabit to avoid conflicts with global or template styles.
- Optionally, non-intrusive uses of `localStorage` for persistence can be offered, but the default requirement assumes purely in-memory.
- Application must be maintainable, with components structured for readability and ease of future expansion.
- Must meet accessibility standards (contrast, ARIA, keyboard navigation).
- App should be visually responsive and function reliably on broad modern devices and browsers.

---

## Out of Scope

- No real-money transactions or integration with payment systems.
- No user authentication, accounts, or network features.
- No advanced gamification (e.g., badges, competitions) beyond described motivational visuals.

---

## Glossary

- **Piggy Bank:** Metaphor for a personal savings tracker; no real monetary transfer occurs.
- **Savings Goal:** The target amount the user aims to reach, settable in-app.
- **Savings History:** Transaction log of every add/remove action the user performed.

---

## Revision History

- **Version 1.0** — Initial version generated for PiggyHabit MVP

