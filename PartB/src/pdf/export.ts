import { pdf } from '@react-pdf/renderer';
import { createElement } from 'react';
import { NotePDFDocument } from './notePDFDocument';
import type { Note } from '../db/schema';

export type ExportProgress = {
  current: number;
  total: number;
};

/**
 * Exports a set of notes to a PDF file and triggers a browser download.
 * For large batches renders in chunks to avoid blocking the main thread.
 */
export async function exportNotesToPDF(
  notes: Note[],
  filename: string = 'markvault-export.pdf',
  onProgress?: (p: ExportProgress) => void
): Promise<void> {
  const CHUNK_SIZE = 10;
  const chunks: Note[][] = [];

  for (let i = 0; i < notes.length; i += CHUNK_SIZE) {
    chunks.push(notes.slice(i, i + CHUNK_SIZE));
  }

  const processedNotes: Note[] = [];

  for (let i = 0; i < chunks.length; i++) {
    await new Promise<void>(resolve => setTimeout(resolve, 0)); // yield to event loop
    processedNotes.push(...chunks[i]);
    onProgress?.({ current: processedNotes.length, total: notes.length });
  }

  const doc = createElement(NotePDFDocument, { notes: processedNotes });
  const blob = await pdf(doc).toBlob();

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}