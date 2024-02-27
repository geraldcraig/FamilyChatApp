import { createContext, useReducer } from 'react';

export const MessagesContext = createContext({
    messages: [],
    addMessage: ({ message, date }) => {},
    // setMessage: (expenses) => {},
    // deleteMessage: (id) => {},
    // updateMessage: (id, { description, amount, date }) => {},
});

function messagesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        // case 'SET':
        //     const inverted = action.payload.reverse();
        //     return inverted;
        // case 'UPDATE':
        //     const updatableExpenseIndex = state.findIndex(
        //         (expense) => expense.id === action.payload.id
        //     );
        //     const updatableExpense = state[updatableExpenseIndex];
        //     const updatedItem = { ...updatableExpense, ...action.payload.data };
        //     const updatedExpenses = [...state];
        //     updatedExpenses[updatableExpenseIndex] = updatedItem;
        //     return updatedExpenses;
        // case 'DELETE':
        //     return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function MessagesContextProvider({ children }) {
    const [messagesState, dispatch] = useReducer(messagesReducer, []);

    function addMessage(messageData) {
        dispatch({ type: 'ADD', payload: messageData });
    }

    // function setExpenses(expenses) {
    //     dispatch({ type: 'SET', payload: expenses });
    // }
    //
    // function deleteExpense(id) {
    //     dispatch({ type: 'DELETE', payload: id });
    // }
    //
    // function updateExpense(id, expenseData) {
    //     dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    // }

    const value = {
        messages: messagesState,
        // setExpenses: setExpenses,
        addMessage: addMessage,
        // deleteExpense: deleteExpense,
        // updateExpense: updateExpense,
    };

    return (
        <MessagesContext.Provider value={value}>
            {children}
        </MessagesContext.Provider>
    );
}

export default MessagesContextProvider;