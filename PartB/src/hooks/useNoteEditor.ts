import { useCallback } from 'react';
import { useNoteStore } from '../store/noteStore';
import { useDebounce } from './useDebounce';

export function useNoteEditor(noteId: string) {
  const updateNote = useNoteStore(s => s.updateNote);

  const debouncedSave = useDebounce(
    (patch: { title?: string; body?: string }) => updateNote(noteId, patch),
    500
  );

  const handleBodyChange = useCallback(
    (body: string) => debouncedSave({ body }),
    [debouncedSave]
  );

  const handleTitleChange = useCallback(
    (title: string) => debouncedSave({ title }),
    [debouncedSave]
  );

  return { handleBodyChange, handleTitleChange };
}