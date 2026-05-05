import Dexie, { type Table } from 'dexie';

export interface Note {
  id: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}

export interface Tag {
  label: string;       // primary key
  color: string;
}

class MarkVaultDB extends Dexie {
  notes!: Table<Note, string>;
  tags!: Table<Tag, string>;

  constructor() {
    super('markvault');
    this.version(1).stores({
      notes: 'id, updatedAt, deletedAt, *tags',  // *tags = MultiEntry index
      tags:  'label',
    });
  }
}

export const db = new MarkVaultDB();