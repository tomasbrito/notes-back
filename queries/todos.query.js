const { FirebaseDB, db } = require("./database")
const { collection, getDocs, doc } = require("firebase/firestore/lite")

const fetchToDos = async (id) => {
    const toDosRefs = db.collection(id)
    const toDos = []
    await toDosRefs.doc('notes').collection('toDos').get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log("No hay tareas")
            } else {
                snapshot.forEach(doc => {
                    toDos.push({ id: doc.id, ...doc.data() })
                });
            }
        })
    return toDos
}

const postToDo = async (body) => {
    const time = new Date()
    const seconds = Math.floor(time.getTime() / 1000); // segundos
    const nanoseconds = time.getMilliseconds() * 1000000;
    const userID = body.userID
    const newTodo = { title: body.title, body: body.body, time, active: true }
    const toDosRefs = db.collection(userID)
    const response = await toDosRefs.doc('notes').collection('toDos').add(newTodo)
    return { id: response.id, time:{seconds, nanoseconds} }

}

const deleteToDo = async (body) => {
    const docID = body.docID
    const userID = body.userID
    const toDosRefs = db.collection(userID)
    await toDosRefs.doc('notes').collection('toDos').doc(docID).set({
        active: false,
    }, { merge: true })
}

const saveChangesToDo = async (body) => {
    try {
        const docID = body.docID
        const userID = body.userID
        const toDo = body.toDo
        const toDosRefs = db.collection(userID)
        const resp = await toDosRefs.doc('notes').collection('toDos').doc(docID).set({
            ...toDo
        }, { merge: true })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    fetchToDos,
    postToDo,
    deleteToDo,
    saveChangesToDo
}