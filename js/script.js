// Functions named xyzIsInvalid return 1 if xyz file is invalid, 0 otherwise

// Set listener on name
$('#name').on('keyup', function() {
  isNameInvalid();
});

// Set listener on email
$('#mail').on('keyup', function(event) {
    isEmailInvalid();
});

// Initially hide Other Job Title field.
// Set listener to show and hide it related to Other option
$('#other-title').hide();
$('#title').on('change', function() {
  if ( $(this).val() === 'other' ) {
    $('#other-title').slideDown(1000);
  } else {
    $('#other-title').slideUp(1000);
  }
});

// COLORS SELECTOR
function hideColorSelector( hide ) {
  if ( hide ) {
    $('#colors-js-puns').addClass('is-hidden');
  } else {
    $('#colors-js-puns').removeClass('is-hidden');
  }
}
// Initially hide colors selector
hideColorSelector(true);

// Set listener on theme to update color selector
$('#design').on('change', function() {
  if ( $(this).val() === 'Select Theme' ) {
    hideColorSelector(true);
  } else {
    // set string for filtering options based on theme
    let search;
    switch ($(this).val()) {
      case 'js puns':
        search = 'JS Puns';
        break;
      case 'heart js':
        search =  'I ♥ JS';
        break;
      default:
        search = "?";
    }
    $('#color').val(''); // clear previously selected color

    // show or hide options based option content
    for (let opt of $('#color option')) {
      if ( $(opt).text().includes(search) ) {
        // set the selected color if it has no value yet
        $('#color').val( $('#color').val() || $(opt).val() );
        $(opt).show();
      } else {
        $(opt).hide();
      }
    }
    hideColorSelector(false);
  }
});

// ACTIVITIES
var totalFees = 0;
var totalActivities = 0;
$('.activities input').on('change', function() {

  // get the fee on an activity
  function getFee(activity) {
    let str = activity.parent().text();
    let i = str.indexOf('$');
    if ( i > -1 ) {
      return parseInt(str.substring(i+1));
    } else {
      return 0;
    }
  }

  // get the time slot on an activity
  function getTime(activity) {
    let str = activity.parent().text();
    let i = str.indexOf('— ');
    if ( i > -1 ) {
      let i2 = str.indexOf(',');
      return str.substring(i+1,i2).trim();
    } else {
      return '';
    }
  }

  // set an activity's disabled state and color
  function setDisabled(activity, newDisabled, newColor) {
    activity.prop('disabled', newDisabled);
    activity.parent().css('color', newColor);
  }

  let checkbox = $(this);
  let selectedName = checkbox.attr('name');
  let fee = getFee(checkbox);
  let selectedTime = getTime(checkbox);
  let selectionIsChecked = checkbox.prop('checked');

  // update total fees
  if (selectionIsChecked) {
    totalFees += fee;
    totalActivities += 1;
  } else {
    totalFees -= fee;
    totalActivities -= 1;
  }
  $('#total-fees').text(`Total fees $${totalFees}`);

  // update activities with same time slot as selected activity
  for (let activity of $('.activities input')) {
    if ( $(activity).attr('name') !== selectedName &&
         getTime($(activity)) === selectedTime ) {
      selectionIsChecked
        ? setDisabled($(activity), true, 'dimgray')
        : setDisabled($(activity), false, 'black');
    }
  }
});

// PAYMENT
// pairs are payment option values and corresponding section ids
var paymentSections = [
  ['credit card', '#credit-card'],
  ['paypal', '#paypal'],
  ['bitcoin', '#bitcoin']
];

// Display a payment section and hide others
//   parameter val is a payment option value
function enablePaymentSection(val) {
  for (section of paymentSections) {
    ( section[0] === val )
      ? $(section[1]).slideDown(1000)
      : $(section[1]).slideUp(1000);
  }
}

// Initially display only credit card section
enablePaymentSection('credit card');

// Create listener for payment selection
$('#payment').on('change', function() {
  enablePaymentSection($(this).val());
});

function CcIsChecked() {
  return $('#payment').val() === 'credit card';
}

// Set listener on card number
$('#cc-no').on('keyup', function(event) {
    isCardInvalid();
});

// Set listener on zip code
$('#zip').on('keyup', function(event) {
    isZipInvalid();
});

// Set listener on CVV
$('#cvv').on('keyup', function(event) {
    isCvvInvalid();
});


// REGISTER
$('button[type="submit"]').on('click', function(event) {
  event.preventDefault();
  let errorCount = isNameInvalid() + isEmailInvalid();
  if ( CcIsChecked() )
    errorCount += isCardInvalid() + isZipInvalid() + isCvvInvalid();
  if ( errorCount === 0 ) {
    $('form').submit();
    alert('Your registration is submitted or something similiar happened.');
  }
});


// FIELD VALIDATION
function createErrorField(element) {
  $(element).
    after('<p class=error-msg style=display:none></p>');
}

function displayError(element, msg) {
  $(element + ' + .error-msg').html(msg + '<br><br>').show();
  $(element).addClass('has-error');
}

function clearError(element) {
  $(element + ' + .error-msg').hide();
  $(element).removeClass('has-error');
}

// Create error message field
createErrorField('#name');
createErrorField('#mail');
createErrorField('#cc-num');
createErrorField('#zip');
createErrorField('#cvv');

// Name is not blank
function isNameInvalid() {
  let invalid = $('#name').val().length === 0;
  invalid ? displayError('#name', 'Name cannot be blank')
          : clearError('#name');
  return invalid ? 1 : 0;
}

function isEmailInvalid() {
  let emailRegex = /\S+@[a-zA-z0-9\-]+\.[a-zA-Z]{2,3}$/;
  let invalid = $('#mail').val().search(emailRegex) === -1;
  invalid ? displayError('#mail','Email must be a valid email format')
          : clearError('#mail');
  return invalid ? 1 : 0;
}

function isCardInvalid() {
  let ccRegex = /^[0-9]{13,16}$/;
  let invalid = $('#cc-num').val().search(ccRegex) === -1;
  invalid ? displayError('#cc-num', 'Card number must be 13 to 16 digits')
          : clearError('#cc-num');
  return invalid ? 1 : 0;
}

function isZipInvalid() {
  let zipRegex = /^[0-9]{5}$/;
  let invalid = $('#zip').val().search(zipRegex) === -1;
  invalid ? displayError('#zip', 'Zip code must be 5 digits')
          : clearError('#zip');
  return invalid ? 1 : 0;
}

function isCvvInvalid() {
  let cvvRegex = /^[0-9]{3}$/;
  let invalid = $('#cvv').val().search(cvvRegex) === -1;
  invalid ? displayError('#cvv', 'CVV must be 3 digits')
          : clearError('#cvv');
  return invalid ? 1 : 0;
}
