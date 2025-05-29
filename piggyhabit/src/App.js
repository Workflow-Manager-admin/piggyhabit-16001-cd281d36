import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Core state
  const [balance, setBalance] = useState(0);
  const [goal, setGoal] = useState(100);
  const [addAmount, setAddAmount] = useState('');
  const [removeAmount, setRemoveAmount] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [goalInput, setGoalInput] = useState('');
  const [error, setError] = useState('');
  const [justAdded, setJustAdded] = useState(false);
  const [justRemoved, setJustRemoved] = useState(false);

  // Initial mount: load from localStorage
  useEffect(() => {
    const stored = window.localStorage.getItem('piggyhabit__data');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setBalance(parsed.balance || 0);
        setGoal(parsed.goal || 100);
        setHistory(parsed.history || []);
      } catch {
        // corrupted storage, ignore
      }
    }
  }, []);
  // Save state to localStorage anytime it changes
  useEffect(() => {
    window.localStorage.setItem(
      'piggyhabit__data',
      JSON.stringify({ balance, goal, history })
    );
  }, [balance, goal, history]);

  // Accessibility: focus management for error messages
  const errorRef = useRef();

  useEffect(() => {
    if (error && errorRef.current) errorRef.current.focus();
  }, [error]);

  // Add Savings
  // PUBLIC_INTERFACE
  function handleAdd(e) {
    e.preventDefault();
    setError('');
    let amount = parseFloat(addAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a positive number to add.');
      return;
    }
    const newBalance = balance + amount;
    setBalance(newBalance);
    setHistory([
      { type: 'add', amount, timestamp: Date.now() },
      ...history,
    ]);
    setAddAmount('');
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 600);
  }

  // Remove Savings
  // PUBLIC_INTERFACE
  function handleRemove(e) {
    e.preventDefault();
    setError('');
    let amount = parseFloat(removeAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a positive number to remove.');
      return;
    }
    if (amount > balance) {
      setError('Cannot remove more than your current balance.');
      return;
    }
    const newBalance = balance - amount;
    setBalance(newBalance);
    setHistory([
      { type: 'remove', amount, timestamp: Date.now() },
      ...history,
    ]);
    setRemoveAmount('');
    setJustRemoved(true);
    setTimeout(() => setJustRemoved(false), 600);
  }

  // Set Goal
  // PUBLIC_INTERFACE
  function handleSetGoal(e) {
    e.preventDefault();
    setError('');
    let goalVal = parseFloat(goalInput);
    if (isNaN(goalVal) || goalVal <= 0) {
      setError('Please enter a positive savings goal.');
      return;
    }
    setGoal(goalVal);
    setGoalInput('');
  }

  // Clear History
  function handleClearHistory() {
    if (
      window.confirm(
        'Are you sure you want to clear your history? This cannot be undone.'
      )
    ) {
      setHistory([]);
      setBalance(0);
    }
  }

  // Progress computation
  const progress =
    goal > 0 ? Math.min(balance / goal, 1) : 0;
  const progressPercent = Math.round(progress * 100);

  // Progress text color for accessibility:
  let progressColor =
    progress >= 1
      ? 'var(--accent-color)'
      : 'var(--primary-color)';
  let progressBg =
    progress >= 1
      ? 'var(--secondary-color)'
      : 'var(--accent-bg-color)';

  // Fun message
  const progressMsg =
    progress >= 1
      ? "Goal achieved! 🎉 Great job!"
      : progressPercent >= 80
      ? "You're almost there!"
      : progressPercent >= 50
      ? "Halfway to your goal!"
      : progressPercent >= 20
      ? "Good start, keep going!"
      : "Start your savings journey!";

  // Format number as currency:
  // PUBLIC_INTERFACE
  function formatMoney(amt) {
    return "$" + amt.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2});
  }

  // Keyboard accessibility on tabs/history
  function handleNavKey(e) {
    if (["Enter", " "].includes(e.key)) setShowHistory((s) => !s);
  }

  // ARIA labels for buttons and inputs
  return (
    <div className="app piggy-main-bg">
      <nav className="navbar" role="navigation" aria-label="PiggyHabit Top Navigation">
        <div className="container" style={{maxWidth: 990}}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div className="logo piggy-logo-flex">
              <span className="logo-symbol piggy-pig-emoji" aria-label="Piggy Bank" role="img">
                🐷
              </span>
              PiggyHabit
            </div>
            <button
              className="btn piggy-tab-btn"
              aria-label={showHistory ? "Go to main screen" : "View savings history"}
              aria-pressed={showHistory}
              tabIndex="0"
              onClick={() => setShowHistory((b) => !b)}
              onKeyDown={handleNavKey}
              style={{
                backgroundColor: 'var(--secondary-color)',
                color: 'var(--accent-color)',
                border: '1.5px solid var(--accent-color)',
              }}
            >
              {showHistory ? "← Home" : "View History"}
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          {/* User feedback for errors */}
          {error && (
            <div
              className="piggy-error"
              role="alert"
              tabIndex="-1"
              ref={errorRef}
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          {/* Main UI or History */}
          {!showHistory ? (
            <section className="piggy-main">
              {/* Piggy Bank Icon and Balance */}
              <div className="piggy-bank-icon-area">
                <span
                  className={
                    "piggy-emoji-giant" +
                    (justAdded ? " piggy-bounce" : "") +
                    (justRemoved ? " piggy-shake" : "")
                  }
                  aria-label="Giant piggy bank icon"
                  role="img"
                >
                  🐷
                </span>
                <div
                  className="piggy-balance-display"
                  aria-live="polite"
                  aria-label={`Current balance is ${formatMoney(balance)}`}
                >
                  Current Balance:{" "}
                  <span className="piggy-balance-num">
                    {formatMoney(balance)}
                  </span>
                </div>
              </div>

              {/* Goal & Progress */}
              <section className="piggy-goal-section" aria-label="Savings Goal and Progress">
                <form className="piggy-goal-form" onSubmit={handleSetGoal}>
                  <label htmlFor="goal" className="piggy-goal-label">
                    Goal:{" "}
                    <span className="piggy-goal-val" aria-live="polite">
                      {formatMoney(goal)}
                    </span>
                  </label>
                  <input
                    id="goal"
                    type="number"
                    className="piggy-goal-input"
                    min="1"
                    step="1"
                    placeholder="Set new goal"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    aria-label="New goal amount"
                  />
                  <button className="btn piggy-small-btn" type="submit" aria-label="Set goal amount">
                    Set
                  </button>
                </form>
                <div
                  className="piggy-progress-bar-outer"
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Progress towards savings goal"
                >
                  <div
                    className="piggy-progress-bar-inner"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: progressColor,
                      transition: 'width 0.4s cubic-bezier(.71,1.7,.77,1.24)'
                    }}
                  ></div>
                </div>
                <div className="piggy-progress-main-line">
                  <span>
                    Progress: &nbsp;
                    <span className="piggy-progress-pct" aria-live="polite">
                      {progressPercent}%
                    </span>
                  </span>
                  <span
                    className="piggy-progress-msg"
                    aria-live="polite"
                  >
                    {progressMsg}
                  </span>
                </div>
              </section>

              {/* Add/Remove */}
              <section className="piggy-actions-section" aria-label="Add or remove money from piggy bank">
                <form
                  className="piggy-action-form"
                  onSubmit={handleAdd}
                  aria-label="Add savings form"
                  autoComplete="off"
                >
                  <label htmlFor="add-amount" className="sr-only">
                    Amount to add
                  </label>
                  <input
                    id="add-amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    className="piggy-action-input"
                    placeholder="Add $"
                    aria-label="Amount to add"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                  />
                  <button className="btn piggy-action-btn" type="submit" aria-label="Add to savings">
                    + Add
                  </button>
                </form>
                <form
                  className="piggy-action-form"
                  onSubmit={handleRemove}
                  aria-label="Remove savings form"
                  autoComplete="off"
                >
                  <label htmlFor="remove-amount" className="sr-only">
                    Amount to remove
                  </label>
                  <input
                    id="remove-amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    className="piggy-action-input"
                    placeholder="Remove $"
                    aria-label="Amount to remove"
                    value={removeAmount}
                    onChange={(e) => setRemoveAmount(e.target.value)}
                  />
                  <button className="btn piggy-action-btn piggy-accent-btn"
                      type="submit" aria-label="Remove from savings">
                    − Remove
                  </button>
                </form>
              </section>
            </section>
          ) : (
            <section className="piggy-history-section" aria-label="Savings history list">
              <h2 className="piggy-history-title">Savings History</h2>
              <button
                className="btn piggy-small-btn piggy-clear-btn"
                onClick={handleClearHistory}
                aria-label="Clear history and balance"
                style={{
                  marginBottom: 22,
                  backgroundColor: 'var(--accent-color)',
                  color: 'white',
                  border: '1px solid var(--accent-color)',
                  float: 'right'
                }}
              >
                Clear History
              </button>
              {history.length === 0 ? (
                <div className="piggy-history-empty" aria-live="polite">
                  No history yet. Start saving!
                </div>
              ) : (
                <ul className="piggy-history-list">
                  {history.map((entry, idx) => (
                    <li key={history.length - idx - 1} className={"piggy-history-item piggy-hist-" + entry.type}>
                      <span className="piggy-hist-timestamp">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                      <span
                        className={'piggy-hist-type ' + (entry.type === 'add' ? 'piggy-hist-add':'piggy-hist-remove')}
                        aria-label={entry.type === 'add' ? "Savings added" : "Savings removed"}
                      >
                        {entry.type === 'add' ? '+' : '−'}
                        {formatMoney(entry.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
          {/* End main/history card */}
        </div>
      </main>
      <footer className="piggy-footer" tabIndex="-1" aria-label="Footer">
        <div className="container piggy-footer-container">
          <span className="piggy-footer-msg">
            {showHistory
              ? "Reflect on your journey and keep saving! 🐷✨"
              : "PiggyHabit — grow your savings, one step at a time."}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
