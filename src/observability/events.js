/**
 * observability/events.js
 *
 * Custom Grafana Faro event tracking for library operations.
 *
 * These are frontend telemetry events — not backend REST API calls.
 * Events are only sent after a successful operation is confirmed.
 *
 * Events tracked:
 *   book_added, book_deleted, book_issued, book_returned,
 *   member_added, member_deleted
 */

import { faro } from '@grafana/faro-web-sdk';

/**
 * Push an event to Grafana Faro safely.
 * No-op if Faro is not initialized.
 */
function pushEvent(name, attributes = {}) {
  try {
    if (faro?.api?.pushEvent) {
      // Faro event attributes must all be strings
      const stringAttrs = Object.fromEntries(
        Object.entries(attributes).map(([k, v]) => [k, String(v)])
      );
      faro.api.pushEvent(name, stringAttrs);
    }
  } catch {
    // Never let telemetry errors affect the application
  }
}

export function trackBookAdded(book) {
  pushEvent('book_added', {
    category: book.category,
    status: 'available',
  });
}

export function trackBookDeleted(book) {
  pushEvent('book_deleted', {
    category: book.category,
  });
}

export function trackBookIssued(transaction) {
  pushEvent('book_issued', {
    category: transaction.bookCategory || '',
    status: 'issued',
  });
}

export function trackBookReturned(transaction) {
  pushEvent('book_returned', {
    category: transaction.bookCategory || '',
    status: 'returned',
  });
}

export function trackMemberAdded() {
  pushEvent('member_added', {
    status: 'active',
  });
}

export function trackMemberDeleted() {
  pushEvent('member_deleted', {
    status: 'removed',
  });
}
