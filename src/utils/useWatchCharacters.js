import { watch } from 'vue';

export function useWatchCharacters(value, maxChars = 100) {
  watch(value, (newValue) => {
    if (newValue.length === maxChars) {
      alert(`Only ${maxChars} characters allowed`);
    }
  });
}