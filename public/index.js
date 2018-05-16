'use strict';

var hideModal = function hideModal(e) {
  e && e.preventDefault();
  $('.modal-underlay').hide();
  $('.modal').hide();
  $('.success-text').hide();
  $('.error-text').hide();
};

var showModal = function showModal(e) {
  e.preventDefault();

  $('.modal-underlay').show();
  $('.modal').show();

  $('.contact-textarea').focus();
};

var resetSubmitButton = function resetSubmitButton() {
  $('.js-contact-form .primary-button').text('Submit').attr('disabled', false);
};

var resetForm = function resetForm() {
  $('.success-text').hide();
  $('.js-contact-form').show();
  $('.contact-textarea').val('');
  resetSubmitButton();
};

$(document).ready(function () {
  $('.js-contact-button').click(showModal);
  $('.js-cancel-button').click(hideModal);
  $('.modal-underlay').click(hideModal);

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      hideModal();
    }
  });

  $('.js-contact-form').submit(function (event) {
    event.preventDefault();
    var content = ($(event.target).find('textarea').val() || '').trim();

    if (!content) {
      return;
    }

    $('.js-contact-form .primary-button').text('Loading...').attr('disabled', true);

    $.ajax('/send-email', {
      contentType: 'application/json',
      data: JSON.stringify({ content: content }),
      method: 'POST'
    }).done(function () {
      $('.js-contact-form').hide();
      $('.success-text').show();

      window.setTimeout(function () {
        hideModal();
        resetForm();
      }, 3000);
    }).fail(function () {
      $('.error-text').show();
      resetSubmitButton();
    });
  });
});