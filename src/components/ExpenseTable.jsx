import React, { useEffect, useState } from 'react';
import Edit from './Edit';
import { Table } from 'react-bootstrap';
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

const ExpenseTable = ({
    expense,
    setExpense,
    totalAmount,
    setTotalAmount,
    setFormData,
    setGetID
}) => {
    const [filterdata, setFilterData] = useState([]);
    const [contextPosition, setContextPosition] = useState({});

    useEffect(() => {
        setFilterData(expense);
    }, [expense]);

    const uniqueCategories = Array.from(new Set(expense.map((elem) => elem.category)));

    const filterByCategory = (e) => {
        const selectedOption = e.target.value;
        const filteredCategory = selectedOption
            ? expense.filter((elem) => elem.category === selectedOption)
            : expense;
        setFilterData(filteredCategory);
    };

    useEffect(() => {
        let total = 0;
        filterdata.forEach((element) => {
            total += parseFloat(element.amount) || 0;
        });
        setTotalAmount(total);
    }, [filterdata]);

    // Context menu handler
    function contextHandler(e, ID) {
        e.preventDefault();
        setGetID(ID);
        const position = { X: e.clientX, Y: e.clientY, ID: ID };
        setContextPosition(position);
    }

    // Sorting handler
    function sortHandler(e) {
        if (e.target.id === 'ascending') {
            setFilterData([...filterdata].sort((a, b) => a.amount - b.amount));
        }
        if (e.target.id === 'descending') {
            setFilterData([...filterdata].sort((a, b) => b.amount - a.amount));
        }
    }

    return (
        <div className="d-flex overflow-hidden">
            <Edit
                contextPosition={contextPosition}
                setContextPosition={setContextPosition}
                expense={expense}
                setExpense={setExpense}
                setFormData={setFormData}
            />
            <Table striped bordered hover>
                <thead className="bg-light">
                    <tr>
                        <th className="text-center">Title</th>
                        <th className="text-center">
                            <select
                                className="form-select"
                                name="filterCategory"
                                onChange={filterByCategory}
                            >
                                <option hidden>Category</option>
                                <option value={''}>All</option>
                                {uniqueCategories.map((elem, idx) => (
                                    <option key={idx} value={elem}>
                                        {elem}
                                    </option>
                                ))}
                            </select>
                        </th>
                        <th className="text-center">
                            Amount{' '}
                            <span
                                className="text-primary mx-1 font-weight-bold cursor-pointer"
                                id="descending"
                                onClick={(e) => sortHandler(e)}
                            >
                                &uarr;
                            </span>
                            <span
                                className="text-primary mx-1 font-weight-bold cursor-pointer"
                                id="ascending"
                                onClick={(e) => sortHandler(e)}
                            >
                                &darr;
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filterdata.map((element) => (
                        <tr
                            key={element.id}
                            className="bg-white cursor-pointer"
                            onContextMenu={(e) => contextHandler(e, element.id)}
                        >
                            <td className="text-center">{element.title}</td>
                            <td className="text-center">{element.category}</td>
                            <td className="text-center">{element.amount}</td>
                        </tr>
                    ))}
                    <tr className="bg-light">
                        <td className="text-left font-weight-bold">Total</td>
                        <td className="text-center"></td>
                        <td className="text-center font-weight-bold">{totalAmount.toFixed(2)}</td>
                    </tr>
                    <button onClick={() => exportToCSV(expense)} className="btn btn-primary mt-3">
        Export 
      </button>
                </tbody>
            </Table>
        </div>
    );
};

export default ExpenseTable;
