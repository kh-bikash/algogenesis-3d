// In: backend/problems.js
    
const problems = {
  array: [
    {
      id: 'arr-bubble-sort',
      title: 'Bubble Sort',
      description: 'Implement the Bubble Sort algorithm. To visualize your code, you MUST call the special function visualizeStep({ type, indices, explanation }) for comparisons and visualizeStep({ type, indices, values, explanation }) for swaps.',
      defaultCode: `function main(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      
      // Visualize the comparison step
      visualizeStep({
        type: 'compare',
        indices: [j, j + 1],
        explanation: \`Comparing elements at index \${j} (\${arr[j]}) and \${j + 1} (\${arr[j+1]}).\`
      });

      if (arr[j] > arr[j + 1]) {
        // Visualize the swap step
        visualizeStep({
          type: 'swap',
          indices: [j, j + 1],
          values: [arr[j+1], arr[j]],
          explanation: \`\${arr[j]} > \${arr[j+1]}. Swapping elements.\`
        });

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  // Final step to end the animation
  visualizeStep({ type: 'finish', explanation: 'Sorting complete.' });

  return arr;
}`,
      algorithmKey: 'bubbleSort',
      initialData: [29, 10, 14, 37, 13],
    },
    // ... other problems remain the same for now
    {
      id: 'arr-merge-sort',
      title: 'Merge Sort',
      description: 'Implement the Merge Sort algorithm. This efficient, divide-and-conquer algorithm recursively splits the array and merges the sorted halves.',
      defaultCode: `function main(arr) {
  // Note: Visualizing Merge Sort requires a more complex
  // implementation with an auxiliary array passed to visualizeStep.
  // This is a placeholder.
  console.log("Merge Sort visualization from user code is not yet implemented in this example.");
  return arr;
}`,
      algorithmKey: 'mergeSort',
      initialData: [38, 27, 43, 3, 9, 82, 10],
    },
  ],
  bst: [
    {
      id: 'bst-insert',
      title: 'Insert into BST',
      description: 'Insert a new value into the Binary Search Tree while maintaining the BST property (left child < parent < right child). The visualization shows the traversal to find the correct insertion point.',
      defaultCode: `function main(bst, val) {
  // User code for BST insert would go here, with visualizeStep calls
  console.log("BST Insert visualization from user code is not yet implemented in this example.");
  return bst;
}`,
      algorithmKey: 'insert',
      initialData: {
          nodes: {
              50: { id: 50, value: 50, left: 30, right: 70, parentId: null },
              30: { id: 30, value: 30, left: 20, right: 40, parentId: 50 },
              70: { id: 70, value: 70, left: 60, right: 80, parentId: 50 },
              20: { id: 20, value: 20, left: null, right: null, parentId: 30 },
              40: { id: 40, value: 40, left: null, right: null, parentId: 30 },
              60: { id: 60, value: 60, left: null, right: null, parentId: 70 },
              80: { id: 80, value: 80, left: null, right: null, parentId: 70 },
          },
          root: 50,
      },
    },
    {
      id: 'bst-search',
      title: 'Search in BST',
      description: 'Search for a value in the Binary Search Tree. The visualization highlights the search path taken from the root.',
      defaultCode: `function main(bst, val) {
    // User code for BST search would go here, with visualizeStep calls
    console.log("BST Search visualization from user code is not yet implemented in this example.");
    return bst;
};`,
      algorithmKey: 'search',
      initialData: {
          nodes: {
              100: { id: 100, value: 100, left: 50, right: 150, parentId: null },
              50: { id: 50, value: 50, left: 25, right: 75, parentId: 100 },
              150: { id: 150, value: 150, left: 125, right: 175, parentId: 100 },
              25: { id: 25, value: 25, left: null, right: null, parentId: 50 },
              75: { id: 75, value: 75, left: null, right: null, parentId: 50 },
              125: { id: 125, value: 125, left: null, right: null, parentId: 150 },
              175: { id: 175, value: 175, left: null, right: null, parentId: 150 },
          },
          root: 100,
      },
    },
  ],
  linkedList: [],
  stack: [],
};

module.exports = { problems };