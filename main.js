import { HashMap } from './HashMap.js';

const test = new HashMap();

// Populate hash map
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log('Get apple:', test.get('apple')); // Should return 'red'
console.log('Get banana:', test.get('banana')); // Should return 'yellow'

// Overwrite some values
test.set('apple', 'green');
test.set('banana', 'brown');

console.log('Size:', test.length()); // Should return 12

// Add more nodes to exceed load factor and trigger resize
test.set('moon', 'silver');

// Test methods
console.log('Size:', test.length()); // Should return 13
console.log('Remove dog:', test.remove('dog')); // Should return true
console.log('Get dog:', test.get('dog')); // Should return null
console.log('Get apple:', test.get('apple')); // Should return 'green'
console.log('Get banana:', test.get('banana')); // Should return 'brown'
console.log('Has grape:', test.has('grape')); // Should return true
console.log('Size after remove:', test.length());
console.log('Keys:', test.keys());
console.log('Values:', test.values());
console.log('Entries:', test.entries());

// Clear the hash map
test.clear();
console.log('Size after clear:', test.length()); // Should return 0
console.log('Keys after clear:', test.keys()); // Should return []
console.log('Values after clear:', test.values()); // Should return []
