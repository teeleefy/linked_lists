// <aside>
// 💡 **Warning: Go Slow & Check Your Code!** It’s very easy to make methods that don’t work for every case — make sure you properly handle cases of items being at the start, middle, or end of the list, as well as handling empty lists.

// </aside>

/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  // ***push(val) :*** Appends a new node with value ***val*** to the tail. Returns undefined.

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length = 1;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.length += 1;
    }
  }

  // ***unshift(val) :*** Add a new node with value ***val*** to the head. Returns undefined.

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    if (this.head) {
      let newNode = new Node(val);
      newNode.next = this.head;
      this.head = newNode;
      this.length += 1;
    } else {
      this.push(val);
    }
  }

  // ***pop() :*** Remove & return tail value. Throws error if list is empty.
  /** pop(): return & remove last item. */

  pop() {
    if (!this.head) {
      throw new Error("List is currently empty. Cannot use pop method.");
    } else if (this.length === 1) {
      let popped = this.tail;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return popped;
    } else if (this.length === 2) {
      let popped = this.tail;
      this.tail = this.head;
      this.length = 1;
      return popped;
    } else {
      let popped = this.tail;
      let currentNode = this.head;
      while (currentNode.next.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = null;
      this.tail = currentNode;
      this.length -= 1;
      return popped;
    }
  }

  // ***shift() :*** Remove & return head value. Throws error if list is empty.
  /** shift(): return & remove first item. */

  shift() {
    if (!this.head) {
      throw new Error("List is currently empty. Cannot use shift method.");
    } else if (this.length === 1) {
      return this.pop();
    } else {
      let oldHead = this.head;
      let newHead = this.head.next;
      this.head = newHead;
      this.length -= 1;
      if (this.length === 1) {
        this.tail = newHead;
      }
      return oldHead;
    }
  }

  // ***getAt(idx) :*** Retrieve value at index position ***idx***. Throws error if index is invalid.
  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (Number.isInteger(idx)) {
      if (!this.head) {
        throw new Error(
          "List is currently empty. Cannot use find any value at any index."
        );
      } else {
        let indexTop = this.length - 1;
        if (idx > indexTop || idx < 0) {
          throw new Error(
            `Index value is out of range. Please choose a value between 0 and ${indexTop}, inclusively.`
          );
        } else {
          let loopCount = 0;
          let currentValue = this.head;
          while (currentValue !== null) {
            if (loopCount === idx) {
              return currentValue.val;
            }
            currentValue = currentValue.next;
            loopCount += 1;
          }
        }
      }
    } else {
      throw new Error("Index must be a whole number.");
    }
  }

  // ***setAt(idx, val) :*** Set value of node at index position ***idx*** to ***val***. Throws error if index is invalid.
  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (Number.isInteger(idx)) {
      if (!this.head) {
        throw new Error(
          "List is currently empty. Cannot use find any value at any index."
        );
      } else {
        if (idx > this.length || idx < 0) {
          throw new Error(
            `Index value is out of range. Please choose a value between 0 and ${this.length}, inclusively.`
          );
        } else if (idx === 0) {
          this.head.val = val;
          return;
        } else if (idx === this.length - 1) {
          this.tail.val = val;
          return;
        } else if (idx === this.length) {
          this.push(val);
          return;
        } else {
          let loopCount = 1;
          let currentValue = this.head.next;
          while (currentValue !== null) {
            if (loopCount === idx) {
              let oldVal = currentValue.val;
              currentValue.val = val;
              return `Old value at index ${idx} was ${oldVal}. The updated value is ${currentValue.val}.`;
            }
            currentValue = currentValue.next;
            loopCount += 1;
          }
        }
      }
    } else {
      throw new Error("Index must be a whole number.");
    }
  }

  // ***insertAt(idx, val) :*** Insert a new node at position ***idx*** with value ***val***. Throws error if index is invalid. Returns undefined.
  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (Number.isInteger(idx)) {
      if (idx > this.length || idx < 0) {
        throw new Error(
          `Index value is out of range. Please choose a value between 0 and ${this.length}, inclusively.`
        );
      } else if (idx === 0) {
        return this.unshift(val);
      } else if (idx === this.length) {
        return this.push(val);
      } else {
        let newNode = new Node(val);
        let loopCount = 1;
        let previousValue = this.head;
        let currentValue = this.head.next;
        while (currentValue !== null) {
          if (loopCount === idx) {
            previousValue.next = newNode;
            newNode.next = currentValue;
            this.length += 1;
            return;
          }
          previousValue = currentValue;
          currentValue = currentValue.next;
          loopCount += 1;
        }
      }
    } else {
      throw new Error("Index must be a whole number.");
    }
  }

  // ***removeAt(idx) :*** Remove & return value at position ***idx***. Throws error if index is invalid.
  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (Number.isInteger(idx)) {
      if (!this.head) {
        throw new Error("List is currently empty. Cannot remove at any index.");
      } else {
        if (idx > this.length - 1 || idx < 0) {
          throw new Error(
            `Index value is out of range. Please choose a value between 0 and ${
              this.length - 1
            }, inclusively.`
          );
        } else if (idx === 0) {
          return this.shift();
        } else if (idx === this.length - 1) {
          return this.pop();
        } else {
          let loopCount = 1;
          let previousValue = this.head;
          let currentValue = this.head.next;
          let nextValue = currentValue.next;
          while (currentValue !== null) {
            if (loopCount === idx) {
              previousValue.next = nextValue;
              this.length -= 1;
              return currentValue;
            }
            previousValue = currentValue;
            currentValue = nextValue;
            nextValue = currentValue.next;
            loopCount += 1;
          }
        }
      }
    } else {
      throw new Error("Index must be a whole number.");
    }
  }

  // ## **Average Of List**
  // Given a linked list containing numbers, return the average of those numbers.
  /** average(): return an average of all values in the list */
  average() {
    if (!this.head) {
      return 0;
    } else {
      let sum = 0;
      let current = this.head;
      while (current !== null) {
        sum += current.val;
        current = current.next;
      }
      let average = sum / this.length;
      return average;
    }
  }
}

module.exports = LinkedList;
