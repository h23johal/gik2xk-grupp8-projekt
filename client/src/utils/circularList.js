class Node {
  constructor(review) {
    this.review = review;
    this.next = null;
  }
}

/**
 * Skapar en cirkulär länkad lista.
 * @param {Array} items - Uppsättning av föremål.
 * @param {Function} [comparator] - Valfri komparator för sortering.
 * @returns {Node|null} Huvudnod för den cirkulära listan eller null om tom.
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
