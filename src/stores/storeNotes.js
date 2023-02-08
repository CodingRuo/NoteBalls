import { defineStore } from "pinia";
import { db } from "@/firebase/config";
import { collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy, limit } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import { useAuthStore } from '@/stores/storeAuth';

let notesCollectionRef;
let notesCollectionQuery;

let getNotesSnapshot = null;

export const useNotesStore = defineStore('notesStore', {
  state: () => ({
    notes: [],
    isPending: false
  }),
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id)[0].content
      }
    },
    totalNotesCount: (state) => state.notes.length,
    totalCharacterCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  },
  actions: {
    init() {
      const authStore = useAuthStore();
      notesCollectionRef = collection(db, "users", authStore.user.id, 'notes');
      notesCollectionQuery = query(notesCollectionRef, orderBy('id', 'desc'))
      this.getNotes()
    },
    async getNotes() {
      this.isPending = true
      // Get Data normal
      // const querySnapshot = await getDocs(collection(db, "notes"))
      // querySnapshot.forEach((doc) => {
      //   let note = {
      //     id: doc.id,
      //     content: doc.data().content
      //   }
      //   this.notes.push(note)
      // })

      // Get Data in RealTime
      // unsubscribe from any active listener
      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        })
        this.notes = notes
        this.isPending = false
      }, error => {
        console.log(error.message)
      })
    },
    async addNote(newNote) {
      let currentDate = new Date().getTime().toString()
      await addDoc(notesCollectionRef, {
        id: uuid(),
        content: newNote,
        date: currentDate
      })
    },
    async deleteNote(noteID) {
      await deleteDoc(doc(notesCollectionRef, noteID))
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content: content
      })
    },
    clearNotes() {
      this.notes = []
      if (getNotesSnapshot) getNotesSnapshot()
    }
  }
})