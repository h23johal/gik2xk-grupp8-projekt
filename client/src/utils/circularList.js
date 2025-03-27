class Node {
  constructor(review) {
    this.review = review;
    this.next = null;
  }
}

/**
 * Creates a circular linked list.
 * @param {Array} items - Array of items.
 * @param {Function} [comparator] - Optional comparator for sorting.
 * @returns {Node|null} Head node of the circular list or null if empty.
 */
export function createCircularList(items, comparator) {
  if (items.length === 0) return null;

  const list = comparator ? [...items].sort(comparator) : items;
  const head = new Node(list[0]);
  let current = head;
  
  for (let i = 1; i < list.length; i++) {
    current.next = new Node(list[i]);
    current = current.next;
  }
  
  current.next = head;
  return head;
}
