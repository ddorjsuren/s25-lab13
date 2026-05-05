import {
  Document, Page, Text, View, StyleSheet, Link
} from '@react-pdf/renderer';
import type { Note } from '../db/schema';

// @react-pdf/renderer uses its own style system — not CSS
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 56,
    color: '#1a1a1a',
  },
  noteTitle: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  meta: {
    fontSize: 9,
    color: '#888',
    marginBottom: 4,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 16,
  },
  tag: {
    fontSize: 9,
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 16,
  },
  body: {
    lineHeight: 1.6,
  },
  h1: { fontSize: 17, fontFamily: 'Helvetica-Bold', marginBottom: 8, marginTop: 16 },
  h2: { fontSize: 14, fontFamily: 'Helvetica-Bold', marginBottom: 6, marginTop: 12 },
  h3: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginBottom: 4, marginTop: 10 },
  paragraph: { marginBottom: 10 },
  code: {
    fontFamily: 'Courier',
    fontSize: 9,
    backgroundColor: '#f4f4f5',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  listItem: { marginBottom: 4, paddingLeft: 12 },
});

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

/**
 * Minimal markdown → @react-pdf elements converter.
 * Handles headings, paragraphs, fenced code blocks, and bullet lists.
 * For production use, replace with a proper AST walk over the remark tree.
 */
function renderBody(body: string) {
  const lines = body.split('\n');
  const elements: React.ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('# '))      { elements.push(<Text key={i} style={styles.h1}>{line.slice(2)}</Text>); i++; continue; }
    if (line.startsWith('## '))     { elements.push(<Text key={i} style={styles.h2}>{line.slice(3)}</Text>); i++; continue; }
    if (line.startsWith('### '))    { elements.push(<Text key={i} style={styles.h3}>{line.slice(4)}</Text>); i++; continue; }

    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(<Text key={i} style={styles.code}>{codeLines.join('\n')}</Text>);
      i++;
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <Text key={i} style={styles.listItem}>{'• '}{line.slice(2)}</Text>
      );
      i++;
      continue;
    }

    if (line.trim() !== '') {
      elements.push(<Text key={i} style={styles.paragraph}>{line}</Text>);
    }

    i++;
  }

  return elements;
}

interface Props {
  notes: Note[];
}

export function NotePDFDocument({ notes }: Props) {
  return (
    <Document title="MarkVault Export" author="MarkVault">
      {notes.map(note => (
        <Page key={note.id} style={styles.page} wrap>
          <Text style={styles.noteTitle}>{note.title || 'Untitled'}</Text>
          <Text style={styles.meta}>
            Created {formatDate(note.createdAt)}  ·  Updated {formatDate(note.updatedAt)}
          </Text>
          {note.tags.length > 0 && (
            <View style={styles.tagRow}>
              {note.tags.map(tag => (
                <Text key={tag} style={styles.tag}>{tag}</Text>
              ))}
            </View>
          )}
          <View style={styles.divider} />
          <View style={styles.body}>
            {renderBody(note.body)}
          </View>
        </Page>
      ))}
    </Document>
  );
}