// Import styles
require('./styles.less');

const $ = require('jquery');

$('#contact-button').on('click', () => {
  $('#contact-modal').prop('hidden', false);
});

$('#contact-modal').on('click', (event) => {
  if (event.target.closest('.contact-modal-content')) {
    return;
  }

  $('#contact-modal').prop('hidden', true);
});

$(document).on('keydown', (event) => {
  if (event.key === 'Escape') {
    $('#contact-modal').prop('hidden', true);
  }
});
