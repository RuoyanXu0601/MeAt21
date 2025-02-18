import {
    messages,
    addMessage,
    updateMessage,
    deleteMessage,
    clearAllMessages
  } from './messageList.js';
  
  // elements
  const messageInput = document.getElementById('messageInput');
  const addBtn       = document.getElementById('addBtn');
  const sendBtn      = document.getElementById('sendBtn');
  const clearBtn     = document.getElementById('clearBtn');
  const messageListEl= document.getElementById('messageList');
  
  /**
   * messages
   */
  function renderMessages() {
    messageListEl.innerHTML = '';
  
    messages.forEach((msg, index) => {
      const li = document.createElement('li');
      li.className = 'message-item';
  
      const span = document.createElement('span');
      span.className = 'message-text';
      span.textContent = msg;
  
      // edit
      const editIcon = document.createElement('i');
      editIcon.className = 'fas fa-pen icon-btn edit-icon';
      editIcon.title = 'Edit message';
      editIcon.addEventListener('click', () => {
        const newText = prompt('Edit your message:', msg);
        if (newText !== null) {
          updateMessage(index, newText.trim());
          renderMessages();
        }
      });
  
      // delete
      const trashIcon = document.createElement('i');
      trashIcon.className = 'fas fa-trash icon-btn trash-icon';
      trashIcon.title = 'Delete message';
      trashIcon.addEventListener('click', () => {
        deleteMessage(index);
        renderMessages();
      });
  
      li.appendChild(span);
      li.appendChild(editIcon);
      li.appendChild(trashIcon);
      messageListEl.appendChild(li);
    });
  }
  
  
  // add message
  addBtn.addEventListener('click', () => {
    const text = messageInput.value.trim();
    if (!text) {
      toastr.warning('Please enter a message first.');
      return;
    }
    addMessage(text);
    messageInput.value = '';
    renderMessages();
  });
  
  // SEND NOW
  sendBtn.addEventListener('click', () => {
    if (messages.length === 0) {
      toastr.info('No messages to send.');
      return;
    }
  
    // message
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    };
  
    toastr.success('Messages sent!', 'Success');
    console.log('Sending messages:', messages);
  
    clearAllMessages();
    renderMessages();
  });
  
  // CLEAR ALL
  clearBtn.addEventListener('click', () => {
    if (messages.length === 0) {
      toastr.warning('No messages to clear.');
      return;
    }
  
    // confirmation
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      onclick: null,
      timeOut: 0,
      extendedTimeOut: 0,
      showDuration: '300',
      hideDuration: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    };
  
    // "Yes" or "No" button
    const messageHtml = `
      All messages will be forever lost and are unrecoverable. Are you sure?
      <br/><br/>
      <button type="button" class="toast-btn toast-yes">Yes</button>
      <button type="button" class="toast-btn toast-no">No</button>
    `;
  
    // warning
    const $toast = toastr.warning(messageHtml, 'Warning');
  
    // click handlers
    if ($toast.find('.toast-yes').length) {
      $toast.find('.toast-yes').on('click', function() {
        clearAllMessages();
        renderMessages();
        toastr.error('All messages cleared!', 'Warning');
        $toast.remove(); 
      });
    }
  
    if ($toast.find('.toast-no').length) {
      $toast.find('.toast-no').on('click', function() {
        // user cancel
        $toast.remove(); // remove  warning
      });
    }
  });
  
  // initial render
  renderMessages();
  