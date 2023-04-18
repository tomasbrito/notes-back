const { firebase } = require('./database')
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } = require('firebase/auth')

const provider = new GoogleAuthProvider();

const loginWithEmailAndPassword = async (email, password) => {

    const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await auth.currentUser.getIdToken(true)
    // falta buscar el usuario
    const response = {}
    response.displayName = userCredential.user.displayName
    response.uid = auth.currentUser.uid
    response.token = idToken
    return response
}

const registerWithEmailAndPassword = async (email, password, displayName) => {
    const auth = getAuth()
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    await updateProfile(user, { displayName })
    return user
}


module.exports = {
    loginWithEmailAndPassword,
    registerWithEmailAndPassword
}