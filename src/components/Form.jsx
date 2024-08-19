
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';

const exportToCSV = (expenses) => {
  const header = 'Title,Category,Amount,Date\n';
  const rows = expenses.map(expense =>
    `${expense.title},${expense.category},${expense.amount},${expense.date}`
  ).join('\n');

  const csvContent = header + rows;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'expenses.csv');
};
function Form({ setGetID, getID, setExpense, expense, formData, setFormData }) {
  const [error, setError] = useState({});

  const validateError = (expensedata) => {
    const { title, category, amount } = expensedata;
    const errorData = {};

    if (!title) {
      errorData.title = "*Title is required";
    }
    if (!category) {
      errorData.category = "*Category is required";
    }
    if (!amount) {
      errorData.amount = "*Amount is required";
    }

    setError(errorData);
    return Object.keys(errorData).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateError(formData)) return;

    const index = expense.findIndex(obj => obj.id === getID);
    if (index !== -1) {
      expense[index].title = formData.title;
      expense[index].category = formData.category;
      expense[index].amount = formData.amount;
      setExpense([...expense]);
      setGetID('');
      setFormData({ title: '', category: '', amount: '' });
      return;
    }

    const newExpenseItem = { ...formData, id: uuidv4() };
    setExpense([...expense, newExpenseItem]);
    setFormData({ title: '', category: '', amount: '' });
  };

  useEffect(() => {
    localStorage.setItem('expense', JSON.stringify(expense));
  }, [expense]);

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <form className='mt-5' onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label fs-4 text-success fw-bolder">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputchange}
                  className="form-control form-control-sm"
                  id="title"
                />
                {error.title && <div className="text-danger">{error.title}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label fs-4 text-success fw-bolder">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputchange}
                  className="form-control form-control-sm"
                  id="category"
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
                {error.category && <div className="text-danger">{error.category}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label fs-4 text-success fw-bolder">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputchange}
                  className="form-control"
                  id="amount"
                />
                {error.amount && <div className="text-danger">{error.amount}</div>}
              </div>
              <button type="submit" className="btn btn-success p-1 p-2" style={{ width: "215px" }}>Submit</button>
          
            </form>
          </div>
          <div className='col-md-4'></div>
          
        </div>
      </div>
      
    </div>
  );
}

export default Form;