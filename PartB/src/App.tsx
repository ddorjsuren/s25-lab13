import { useEffect } from 'react';
import { useNoteStore } from './store/noteStore';

export function App() {
  const hydrate = useNoteStore(s => s.hydrate);

  useEffect(() => {
    hydrate().catch(console.error);
  }, [hydrate]);

  // ... render layout
}