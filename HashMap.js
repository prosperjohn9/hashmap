import { Node } from './Node.js';

export class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity).fill(null);
    this.size = 0;
    this.loadFactor = loadFactor;
  }

  hash(key, bucketLength) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % bucketLength;
    }
    return hashCode;
  }

  resize() {
    const newBuckets = new Array(this.buckets.length * 2).fill(null);
    this.buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode) {
        const newIndex = this.hash(currentNode.key, newBuckets.length);
        const newNode = new Node(
          currentNode.key,
          currentNode.value,
          newBuckets[newIndex]
        );
        newBuckets[newIndex] = newNode;
        currentNode = currentNode.nextNode;
      }
    });
    this.buckets = newBuckets;
  }

  set(key, value) {
    if (this.size / this.buckets.length >= this.loadFactor) {
      this.resize();
    }

    const index = this.hash(key, this.buckets.length);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    let currentNode = this.buckets[index];
    while (currentNode) {
      if (currentNode.key === key) {
        currentNode.value = value;
        return;
      }
      currentNode = currentNode.nextNode;
    }

    console.log(`Inserting key: ${key}, Index: ${index}`);
    const newNode = new Node(key, value, this.buckets[index]);
    this.buckets[index] = newNode;
    this.size++;
  }

  get(key) {
    const index = this.hash(key, this.buckets.length);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    let currentNode = this.buckets[index];
    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.nextNode;
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key, this.buckets.length);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    console.log(`Trying to remove key: ${key}, Index: ${index}`);
    let currentNode = this.buckets[index];
    let previousNode = null;
    while (currentNode) {
      console.log(`Visiting node with key: ${currentNode.key}`);
      if (currentNode.key === key) {
        if (previousNode) {
          previousNode.nextNode = currentNode.nextNode;
        } else {
          this.buckets[index] = currentNode.nextNode;
        }
        this.size--;
        console.log(`Key ${key} removed.`);
        return true;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }
    console.log(`Key ${key} not found.`);
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.buckets.length).fill(null);
    this.size = 0;
  }

  keys() {
    const keysArray = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode) {
        keysArray.push(currentNode.key);
        currentNode = currentNode.nextNode;
      }
    });
    return keysArray;
  }

  values() {
    const valuesArray = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode) {
        valuesArray.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
    });
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode) {
        entriesArray.push([currentNode.key, currentNode.value]);
        currentNode = currentNode.nextNode;
      }
    });
    return entriesArray;
  }
}
