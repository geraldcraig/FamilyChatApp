import { createContext, useContext, useReducer } from 'react';

// export const MessagesContext = createContext({
//     messages: [],
//     addMessage: ({ message, date }) => {},
//     // setMessage: (expenses) => {},
//     // deleteMessage: (id) => {},
//     // updateMessage: (id, { description, amount, date }) => {},
// });

const MessagesContext = createContext(null);

const MessagesDispatchContext = createContext(null);

export function MessagesProvider({ children }) {
    const [messages, dispatch] = useReducer(
        messagesReducer,
        initialMessages
    );

    return (
        <MessagesContext.Provider value={messages}>
            <MessagesDispatchContext.Provider value={dispatch}>
                {children}
            </MessagesDispatchContext.Provider>
        </MessagesContext.Provider>
    );
}

export function useMessages() {
    return useContext(MessagesContext);
}

export function useMessagesDispatch() {
    return useContext(MessagesDispatchContext);
}

function messagesReducer(messages, action) {
    switch (action.type) {
        case 'added': {
            return [...messages, {
                id: action.id,
                text: action.text,
                done: false
            }];
        }
        case 'changed': {
            return messages.map(m => {
                if (m.id === action.message.id) {
                    return action.message;
                } else {
                    return m;
                }
            });
        }
            case 'deleted': {
            return  messages.filter(m => m.id !== action.id);
            }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialMessages = [];



// function messagesReducer(state, action) {
//     switch (action.type) {
//         case 'ADD':
//             return [action.payload, ...state];
//         // case 'SET':
//         //     const inverted = action.payload.reverse();
//         //     return inverted;
//         // case 'UPDATE':
//         //     const updatableExpenseIndex = state.findIndex(
//         //         (expense) => expense.id === action.payload.id
//         //     );
//         //     const updatableExpense = state[updatableExpenseIndex];
//         //     const updatedItem = { ...updatableExpense, ...action.payload.data };
//         //     const updatedExpenses = [...state];
//         //     updatedExpenses[updatableExpenseIndex] = updatedItem;
//         //     return updatedExpenses;
//         // case 'DELETE':
//         //     return state.filter((expense) => expense.id !== action.payload);
//         default:
//             return state;
//     }
// }
//
// function MessagesContextProvider({ children }) {
//     const [messagesState, dispatch] = useReducer(messagesReducer, []);
//
//     function addMessage(messageData) {
//         dispatch({ type: 'ADD', payload: messageData });
//     }
//
//     // function setExpenses(expenses) {
//     //     dispatch({ type: 'SET', payload: expenses });
//     // }
//     //
//     // function deleteExpense(id) {
//     //     dispatch({ type: 'DELETE', payload: id });
//     // }
//     //
//     // function updateExpense(id, expenseData) {
//     //     dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
//     // }
//
//     const value = {
//         messages: messagesState,
//         // setExpenses: setExpenses,
//         addMessage: addMessage,
//         // deleteExpense: deleteExpense,
//         // updateExpense: updateExpense,
//     };
//
//     return (
//         <MessagesContext.Provider value={value}>
//             {children}
//         </MessagesContext.Provider>
//     );
// }
//
// export default MessagesContextProvider;
