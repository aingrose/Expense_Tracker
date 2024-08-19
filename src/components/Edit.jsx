import React from 'react';

function Edit({ contextPosition, expense, setExpense, setContextPosition, setFormData }) {
 
    if (!contextPosition.X || !contextPosition.Y) {
        return null; 
    }

    const ID = contextPosition.ID;

    function deleteHandler() {
        setExpense(expense.filter((elem) => elem.id !== ID));
        setContextPosition({}); 
    }

    function editHandler() {
        const toEdit = expense.find((elem) => elem.id === ID); 
        setFormData(toEdit); 
        setContextPosition({}); 
    }

    return (
        <div
            className=" rounded-1 position-absolute"
            style={{
                width: "70px",
                top: `${contextPosition.Y + 10}px`,
                left: `${contextPosition.X + 20}px`,
                fontWeight: "600",
                borderRadius: "0.375rem",
                zIndex: 10,
            }}
        >
            <div className="bg-success   p-2" style={{borderRadius:"5px 5px 0 0"}} onClick={editHandler}>
                Edit
            </div>
            <div className="bg-danger  p-2" style={{borderRadius:"0  0 5px 5px "}} onClick={deleteHandler}>
                Delete
            </div>
        </div>
    );
}

export default Edit;
