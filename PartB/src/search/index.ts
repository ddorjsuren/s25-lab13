import FlexSearch from 'flexsearch';

interface IndexEntry {
  id: string;
  title: string;
  body: string;
}

export interface SearchMatch {
  id: string;
  field: 'title' | 'body';
  positions: number[];
}

export const searchIndex = new FlexSearch.Document<IndexEntry>({
  document: {
    id: 'id',
    index: [
      { field: 'title', tokenize: 'forward', resolution: 9 },
      { field: 'body',  tokenize: 'forward', resolution: 5 },
    ],
  },
  cache: 100,
});

/**
 * Returns a map of noteId → array of matched token strings,
 * used by the Sidebar to highlight snippets.
 */
export function searchWithHighlights(
  query: string
): Map<string, { field: 'title' | 'body'; term: string }[]> {
  const results = searchIndex.search(query, { enrich: true, limit: 200 });
  const highlights = new Map<string, { field: 'title' | 'body'; term: string }[]>();

  for (const fieldResult of results) {
    const field = fieldResult.field as 'title' | 'body';
    for (const match of fieldResult.result) {
      if (typeof match === 'object' && match.doc) {
        const id = match.doc.id;
        const existing = highlights.get(id) ?? [];
        highlights.set(id, [...existing, { field, term: query }]);
      }
    }
  }

  return highlights;
}