import React, { useState } from 'react';

const LandingPage = () => {
  const [userName, setUserName] = useState('John Doe'); // Placeholder user
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupBudget, setGroupBudget] = useState('');
  const [groupNotes, setGroupNotes] = useState('');
  const [currentGroup, setCurrentGroup] = useState(null);
  const [groupExpenses, setGroupExpenses] = useState([]);
  const [user, setUser] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [amount, setAmount] = useState('');

  const addGroup = (e) => {
    e.preventDefault();
    const newGroup = {
      groupName,
      groupBudget: parseFloat(groupBudget),
      groupNotes,
      expenses: []
    };
    setGroups([...groups, newGroup]);
    setGroupName('');
    setGroupBudget('');
    setGroupNotes('');
  };

  const selectGroup = (group) => {
    setCurrentGroup(group);
    setGroupExpenses(group.expenses);
  };

  const addExpense = (e) => {
    e.preventDefault();
    const newExpense = { user, expenseType, amount: parseFloat(amount) };
    const updatedGroup = { ...currentGroup, expenses: [...currentGroup.expenses, newExpense] };
    
    setGroupExpenses(updatedGroup.expenses);
    setGroups(groups.map(group => group === currentGroup ? updatedGroup : group));
    
    setUser('');
    setExpenseType('');
    setAmount('');
  };

  const logout = () => {
    // handle logout logic here
    console.log('User logged out');
  };

  return (
    <div className="container">
      <header>
        <h1>Welcome, {userName}!</h1>
        <button onClick={logout} className="logout-btn">Log Out</button>
      </header>

      <div className="main-content">
        {/* Sidebar: List of Groups */}
        <aside className="sidebar">
          <h2>Your Groups</h2>
          <ul>
            {groups.map((group, index) => (
              <li key={index} onClick={() => selectGroup(group)}>
                {group.groupName}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Section: Group Creation and Expense Management */}
        <section className="content">
          <div className="group-form">
            <h2>Create a New Group</h2>
            <form onSubmit={addGroup}>
              <div>
                <label htmlFor="groupName">Group Name:</label>
                <input
                  type="text"
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="groupBudget">Group Budget:</label>
                <input
                  type="number"
                  id="groupBudget"
                  value={groupBudget}
                  onChange={(e) => setGroupBudget(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="groupNotes">Notes:</label>
                <textarea
                  id="groupNotes"
                  value={groupNotes}
                  onChange={(e) => setGroupNotes(e.target.value)}
                />
              </div>
              <button type="submit">Add Group</button>
            </form>
          </div>

          {/* Expense form for the selected group */}
          {currentGroup && (
            <div className="expense-form">
              <h2>Manage Expenses for {currentGroup.groupName}</h2>
              <form onSubmit={addExpense}>
                <div>
                  <label htmlFor="user">User Name:</label>
                  <input
                    type="text"
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="expenseType">Expense Type:</label>
                  <input
                    type="text"
                    id="expenseType"
                    value={expenseType}
                    onChange={(e) => setExpenseType(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="amount">Amount:</label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Add Expense</button>
              </form>

              {/* Display Expenses */}
              <div className="expense-list">
                <h3>Expenses in {currentGroup.groupName}</h3>
                <ul>
                  {groupExpenses.map((expense, index) => (
                    <li key={index}>
                      {expense.user} added {expense.expenseType} of ${expense.amount.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
