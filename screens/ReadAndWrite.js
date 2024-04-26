import {addDoc, collection, doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from '../firebaseConfig';

const postNewMessage = async () => {
// Add a new document in collection "cities"
    await setDoc(doc(db, "cities", "BJ"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    });

// create or merge
    const cityRef = doc(db, 'cities', 'BJ');
    setDoc(cityRef, {capital: true}, {merge: true});

// add a document - must specify ID
    await setDoc(doc(db, "cities", userId), {});

// Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "cities"), {
        name: "Tokyo",
        country: "Japan"
    });
    console.log("Document written with ID: ", docRef.id);

// update doc
    const washingtonRef = doc(db, "cities", "LA");

// Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
        capital: true
    });

// Create an initial document to update.
    const frankDocRef = doc(db, "users", "frank");
    await setDoc(frankDocRef, {
        name: "Frank",
        favorites: {food: "Pizza", color: "Blue", subject: "recess"},
        age: 12
    });

// To update age and favorite color:
    await updateDoc(frankDocRef, {
        "age": 13,
        "favorites.color": "Red"
    });
}