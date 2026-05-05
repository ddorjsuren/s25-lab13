import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { db, type Note, type Tag } from '../db/schema';
import { searchIndex } from '../search/index';

interface NoteStore {
  notes: Note[];
  tags: Tag[];
  activeNoteId: string | null;
  filterTags: string[];
  searchQuery: string;

  // Derived
  activeNote: () => Note | null;
  visibleNotes: () => Note[];

  // Lifecycle
  hydrate: () => Promise<void>;

  // CRUD
  createNote: () => Promise<string>;
  updateNote: (id: string, patch: Partial<Pick<Note, 'title' | 'body' | 'tags'>>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  restoreNote: (id: string) => Promise<void>;

  // Tags
  addTagToNote: (noteId: string, label: string, color?: string) => Promise<void>;
  removeTagFromNote: (noteId: string, label: string) => Promise<void>;
  setFilterTags: (tags: string[]) => void;

  // Search
  setSearchQuery: (query: string) => void;
  setActiveNote: (id: string | null) => void;
}

export const useNoteStore = create<NoteStore>((set, get) => ({
  notes: [],
  tags: [],
  activeNoteId: null,
  filterTags: [],
  searchQuery: '',

  activeNote: () => {
    const { notes, activeNoteId } = get();
    return notes.find(n => n.id === activeNoteId) ?? null;
  },

  visibleNotes: () => {
    const { notes, filterTags, searchQuery } = get();

    let result = notes.filter(n => n.deletedAt === undefined);

    if (filterTags.length > 0) {
      result = result.filter(n =>
        filterTags.every(ft => n.tags.includes(ft))
      );
    }

    if (searchQuery.trim()) {
      const matchedIds = searchIndex.search(searchQuery, { enrich: true });
      const idSet = new Set(
        matchedIds.flatMap(r => r.result.map(item =>
          typeof item === 'object' ? item.id : item
        ))
      );
      result = result.filter(n => idSet.has(n.id));
    }

    return result.sort((a, b) => b.updatedAt - a.updatedAt);
  },

  hydrate: async () => {
    const [notes, tags] = await Promise.all([
      db.notes.toArray(),
      db.tags.toArray(),
    ]);
    set({ notes, tags });
    searchIndex.addAll(
      notes
        .filter(n => !n.deletedAt)
        .map(n => ({ id: n.id, title: n.title, body: n.body }))
    );
  },

  createNote: async () => {
    const note: Note = {
      id: nanoid(),
      title: 'Untitled',
      body: '',
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await db.notes.add(note);
    set(s => ({ notes: [note, ...s.notes], activeNoteId: note.id }));
    searchIndex.add({ id: note.id, title: note.title, body: note.body });
    return note.id;
  },

  updateNote: async (id, patch) => {
    const updatedAt = Date.now();
    await db.notes.update(id, { ...patch, updatedAt });
    set(s => ({
      notes: s.notes.map(n =>
        n.id === id ? { ...n, ...patch, updatedAt } : n
      ),
    }));
    const updated = get().notes.find(n => n.id === id);
    if (updated) {
      searchIndex.update({ id, title: updated.title, body: updated.body });
    }
  },

  deleteNote: async (id) => {
    const deletedAt = Date.now();
    await db.notes.update(id, { deletedAt });
    set(s => ({
      notes: s.notes.map(n => n.id === id ? { ...n, deletedAt } : n),
      activeNoteId: s.activeNoteId === id ? null : s.activeNoteId,
    }));
    searchIndex.remove({ id });
  },

  restoreNote: async (id) => {
    await db.notes.update(id, { deletedAt: undefined });
    set(s => ({
      notes: s.notes.map(n => {
        if (n.id !== id) return n;
        const { deletedAt: _, ...rest } = n;
        return rest;
      }),
    }));
    const note = get().notes.find(n => n.id === id);
    if (note) {
      searchIndex.add({ id, title: note.title, body: note.body });
    }
  },

  addTagToNote: async (noteId, label, color = '#6366f1') => {
    const existingTag = get().tags.find(t => t.label === label);
    if (!existingTag) {
      const newTag = { label, color };
      await db.tags.put(newTag);
      set(s => ({ tags: [...s.tags, newTag] }));
    }
    const note = get().notes.find(n => n.id === noteId);
    if (!note || note.tags.includes(label)) return;
    await get().updateNote(noteId, { tags: [...note.tags, label] });
  },

  removeTagFromNote: async (noteId, label) => {
    const note = get().notes.find(n => n.id === noteId);
    if (!note) return;
    await get().updateNote(noteId, { tags: note.tags.filter(t => t !== label) });
  },

  setFilterTags: (tags) => set({ filterTags: tags }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveNote: (id) => set({ activeNoteId: id }),
}));