
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Form from './components/Form';
import ExpenseTable from './components/ExpenseTable';

function App() {
  const [formData, setFormData] = useState({ title: "", category: "", amount: 0 });
  const [getID, setGetID] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  
  const [expense, setExpense] = useState(() => {
    return JSON.parse(localStorage.getItem('expense')) ? JSON.parse(localStorage.getItem("expense")) : [];
  });

  return (
    <>
      <Header />
      <Form setGetID={setGetID} getID={getID} formData={formData} setFormData={setFormData} expense={expense} setExpense={setExpense} />
      <ExpenseTable setGetID={setGetID} setFormData={setFormData} expense={expense} setExpense={setExpense} totalAmount={totalAmount} setTotalAmount={setTotalAmount} />
    </>
  );
}
 export default App;