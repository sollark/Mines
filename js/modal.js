'use strict';

/* 

// html
<button class='openModalBtn'>Open</button>
<dialog class='modal'>
    <p>Modal</p>
    <form method='dialog'>
        <p class='text'></p>
        <button class='close' type="reset">OK</button>
    </form>
</dialog>
<div class="result"></div>

 */

/* 
// CSS
:modal {
  border: 5px solid red;
  background-color: yellow;
  box-shadow: 3px 3px 10px rgba(0 0 0 / 0.5);
}
dialog::backdrop{
    background: hsl(0 0 0, 0.5);
}

 */

const openModalBtn = document.querySelector('.openModalBtn');
const modal = document.querySelector('.modal');
const submitModalBtn = document.querySelector('.submitBtn');
const text = document.querySelector('.text');
const result = document.querySelector('.result');

openModalBtn.addEventListener('click', openModal);

function openModal(e, message) {
  if (typeof modal.showModal === 'function') {
    modal.showModal();

    text.textContent = message || '';
    result.textContent = '';
  } else {
    result.textContent =
      'Sorry, the <dialog> API is not supported by this browser.';
  }
}

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', closeModal);

function closeModal() {
  modal.close();
}

// The close event is fired on an HTMLDialogElement object when the dialog it represents has been closed.
modal.addEventListener('close', (event) => {
  console.log('modal is closed.');
});
