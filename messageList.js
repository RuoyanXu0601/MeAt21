export let messages = [];

/**
 * Add new message to list
 * @param {string} message
 */
export function addMessage(message) {
  messages.push(message);
}

/**
 * Update message
 * @param {number} index
 * @param {string} newText
 */
export function updateMessage(index, newText) {
  messages[index] = newText;
}

/**
 * Delete message
 * @param {number} index
 */
export function deleteMessage(index) {
  messages.splice(index, 1);
}

/**
 * Clear all message
 */
export function clearAllMessages() {
  messages.length = 0;
}
