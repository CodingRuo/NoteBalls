import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNotesStore } from '@/stores/storeNotes';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: {}
  }),
  getters: {

  },
  actions: {
    init() {
      const notesStore = useNotesStore();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push('/')
          notesStore.init();
        } else {
          this.user = {}
          this.router.replace('/auth')
          notesStore.clearNotes()
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user;
      }).catch((error) => {
        console.log(error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    },
    logOut() {
      signOut(auth).then(() => {
        // console.log('User signed out');
      }).catch((error) => {
        console.log(error.message);
      });
    },
    login(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }
})