// In: src/lib/algorithms.js

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  
  const auxiliaryArray = [...array];
  const n = auxiliaryArray.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({
        type: 'compare',
        indices: [j, j + 1],
        line: 5,
        explanation: `Comparing elements at index ${j} (${auxiliaryArray[j]}) and ${j + 1} (${auxiliaryArray[j + 1]}).`,
      });

      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        animations.push({
          type: 'swap',
          indices: [j, j + 1],
          values: [auxiliaryArray[j + 1], auxiliaryArray[j]],
          line: 8,
          explanation: `${auxiliaryArray[j]} > ${auxiliaryArray[j+1]}. Swapping elements.`,
        });
        [auxiliaryArray[j], auxiliaryArray[j + 1]] = [auxiliaryArray[j + 1], auxiliaryArray[j]];
      }
    }
  }
  return animations;
}

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = [...array];
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push({ type: 'compare', indices: [i, j], line: 14, explanation: `Comparing auxiliary array elements at indices ${i} and ${j}.` });
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({ type: 'overwrite', index: k, value: auxiliaryArray[i], line: 16, explanation: `Overwriting index ${k} with value ${auxiliaryArray[i]}.` });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({ type: 'overwrite', index: k, value: auxiliaryArray[j], line: 19, explanation: `Overwriting index ${k} with value ${auxiliaryArray[j]}.` });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push({ type: 'overwrite', index: k, value: auxiliaryArray[i], line: 24, explanation: `Overwriting index ${k} with value ${auxiliaryArray[i]}.` });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push({ type: 'overwrite', index: k, value: auxiliaryArray[j], line: 28, explanation: `Overwriting index ${k} with value ${auxiliaryArray[j]}.` });
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// --- Linked List Logic ---
export class SLLNode {
    constructor(id, value, next = null) {
        this.id = id;
        this.value = value;
        this.next = next;
    }
}

export function getSLLInsertAtHeadAnimations(currentHeadId, newValue) {
    const animations = [];
    const newNodeId = Date.now(); 
    animations.push({ type: 'create', nodeId: newNodeId, value: newValue, explanation: `Create a new node with value ${newValue}.` });
    if (currentHeadId !== null) {
        animations.push({ type: 'set-next', sourceId: newNodeId, targetId: currentHeadId, explanation: `Set the new node's 'next' pointer to the current head.` });
    }
    animations.push({ type: 'update-head', newHeadId: newNodeId, explanation: `Update the head pointer to point to the new node.` });
    animations.push({ type: 'finish', explanation: `Insertion complete.` });
    return animations;
}

export function getSLLDeleteByValueAnimations(nodes, head, valueToDelete) {
    const animations = [];
    if (!head) {
        animations.push({ type: 'finish', explanation: 'List is empty. Nothing to delete.' });
        return animations;
    }
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    if (nodeMap.get(head).value === valueToDelete) {
        const newHead = nodeMap.get(head).next;
        animations.push({ type: 'found', nodeId: head, explanation: `Found value ${valueToDelete} at the head.` });
        animations.push({ type: 'update-head', newHeadId: newHead, explanation: `Update head to point to the next node.` });
        animations.push({ type: 'delete', nodeId: head, explanation: `Delete the old head node.` });
        animations.push({ type: 'finish', explanation: 'Deletion complete.' });
        return animations;
    }
    let prev = null;
    let curr = head;
    while (curr !== null && nodeMap.get(curr).value !== valueToDelete) {
        animations.push({ type: 'traverse', prevId: prev, currId: curr, explanation: `Checking node with value ${nodeMap.get(curr).value}.` });
        prev = curr;
        curr = nodeMap.get(curr).next;
    }
    if (curr !== null) {
        const currNode = nodeMap.get(curr);
        animations.push({ type: 'found', nodeId: curr, explanation: `Found value ${valueToDelete}.` });
        animations.push({ type: 'relink', prevId: prev, nextId: currNode.next, explanation: `Update previous node's pointer to skip the deleted node.` });
        animations.push({ type: 'delete', nodeId: curr, explanation: `Delete the node.` });
    } else {
        animations.push({ type: 'not-found', explanation: `Value ${valueToDelete} not found in the list.` });
    }
    animations.push({ type: 'finish', explanation: 'Deletion complete.' });
    return animations;
}

// --- Stack Logic ---
export class StackNode {
    constructor(id, value) {
        this.id = id;
        this.value = value;
    }
}

export function getStackPushAnimations(newValue) {
    const animations = [];
    const newNodeId = Date.now();
    animations.push({ type: 'create', nodeId: newNodeId, value: newValue, explanation: `Create a new element with value ${newValue}.` });
    animations.push({ type: 'move-to-stack', nodeId: newNodeId, explanation: `Move element onto the stack.` });
    animations.push({ type: 'finish', explanation: 'Push operation complete.' });
    return animations;
}

export function getStackPopAnimations(stack) {
    const animations = [];
    if (stack.length === 0) {
        animations.push({ type: 'finish', explanation: 'Stack is empty. Cannot pop.' });
        return animations;
    }
    const topNodeId = stack[stack.length - 1].id;
    animations.push({ type: 'highlight-pop', nodeId: topNodeId, explanation: `Highlight element at the top of the stack to be popped.` });
    animations.push({ type: 'delete', nodeId: topNodeId, explanation: `Remove (pop) the element from the stack.` });
    animations.push({ type: 'finish', explanation: 'Pop operation complete.' });
    return animations;
}

// --- Binary Search Tree Logic ---
export class BSTNode {
    constructor(id, value, parentId = null) {
        this.id = id;
        this.value = value;
        this.left = null;
        this.right = null;
        this.parentId = parentId;
    }
}

export function getBSTInsertAnimations(bst, valueToInsert) {
    const animations = [];
    const newNodeId = Date.now();
    
    animations.push({ type: 'create', nodeId: newNodeId, value: valueToInsert, explanation: `Create a new node with value ${valueToInsert}.`});

    if (bst.root === null) {
        animations.push({ type: 'set-root', nodeId: newNodeId, explanation: `Tree is empty. Set new node as the root.` });
        animations.push({ type: 'finish', explanation: 'Insertion complete.' });
        return animations;
    }

    let currentNodeId = bst.root;
    let parentId = null;

    while (currentNodeId !== null) {
        parentId = currentNodeId;
        const currentNode = bst.nodes[currentNodeId];
        animations.push({ type: 'traverse', nodeId: currentNodeId, explanation: `Traversing to node with value ${currentNode.value}.` });

        if (valueToInsert < currentNode.value) {
            animations.push({ type: 'compare', nodeId: currentNodeId, explanation: `${valueToInsert} < ${currentNode.value}. Go left.` });
            currentNodeId = currentNode.left;
        } else if (valueToInsert > currentNode.value) {
            animations.push({ type: 'compare', nodeId: currentNodeId, explanation: `${valueToInsert} > ${currentNode.value}. Go right.` });
            currentNodeId = currentNode.right;
        } else {
            animations.push({ type: 'found', nodeId: currentNodeId, explanation: `Value ${valueToInsert} already exists in the tree.` });
            animations.push({ type: 'finish', explanation: `Operation complete.` });
            return animations;
        }
    }

    animations.push({ type: 'relink', parentId: parentId, childId: newNodeId, direction: valueToInsert < bst.nodes[parentId].value ? 'left' : 'right', explanation: `Insert new node as the child of ${bst.nodes[parentId].value}.` });
    animations.push({ type: 'finish', explanation: 'Insertion complete.' });
    return animations;
}

export function getBSTSearchAnimations(bst, valueToSearch) {
    const animations = [];
    if (bst.root === null) {
        animations.push({ type: 'not-found', explanation: `Tree is empty. Value ${valueToSearch} not found.` });
        animations.push({ type: 'finish', explanation: 'Search complete.' });
        return animations;
    }

    let currentNodeId = bst.root;
    while (currentNodeId !== null) {
        const currentNode = bst.nodes[currentNodeId];
        animations.push({ type: 'traverse', nodeId: currentNodeId, explanation: `Traversing to node with value ${currentNode.value}.` });

        if (valueToSearch < currentNode.value) {
            animations.push({ type: 'compare', nodeId: currentNodeId, explanation: `${valueToSearch} < ${currentNode.value}. Go left.` });
            currentNodeId = currentNode.left;
        } else if (valueToSearch > currentNode.value) {
            animations.push({ type: 'compare', nodeId: currentNodeId, explanation: `${valueToSearch} > ${currentNode.value}. Go right.` });
            currentNodeId = currentNode.right;
        } else {
            animations.push({ type: 'found', nodeId: currentNodeId, explanation: `Value ${valueToSearch} found!` });
            animations.push({ type: 'finish', explanation: 'Search complete.' });
            return animations;
        }
    }

    animations.push({ type: 'not-found', explanation: `Value ${valueToSearch} not found in the tree.` });
    animations.push({ type: 'finish', explanation: 'Search complete.' });
    return animations;
}