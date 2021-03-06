const hideModal = (e) => {
  e && e.preventDefault();
  $('.modal-underlay').hide();
  $('.modal').hide();
  $('.success-text').hide();
  $('.error-text').hide();
};

const showModal = (e) => {
  e.preventDefault();

  $('.modal-underlay').show();
  $('.modal').show();

  $('.contact-textarea').focus();
};

const resetSubmitButton = () => {
  $('.js-contact-form .primary-button').text('Submit').attr('disabled', false);
};

const resetForm = () => {
  $('.success-text').hide();
  $('.js-contact-form').show();
  $('.contact-textarea').val('');
  resetSubmitButton();
};

$(document).ready(() => {
  $('.js-contact-button').click(showModal);
  $('.js-cancel-button').click(hideModal);
  $('.modal-underlay').click(hideModal);

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideModal();
    }
  });

  $('.js-contact-form').submit((event) => {
    event.preventDefault();
    const content = ($(event.target).find('textarea').val() || '').trim();

    if (!content) {
      return;
    }

    $('.js-contact-form .primary-button').text('Loading...').attr('disabled', true);

    $.ajax('/send-email', {
      contentType: 'application/json',
      data: JSON.stringify({ content }),
      method: 'POST',
    }).done(() => {
      $('.js-contact-form').hide();
      $('.success-text').show();

      window.setTimeout(() => {
        hideModal();
        resetForm();
      }, 3000);
    }).fail(() => {
      $('.error-text').show();
      resetSubmitButton();
    });
  });
});
