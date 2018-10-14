
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
// Save the color options
const colorOptions = $('#color').html();

// Set listener on shirt theme to update color selector
$('#design').on('change', function() {
  // hide the color selector if no theme is selected
  if ( $(this).val() === 'Select Theme' ) {
    hideColorSelector(true);
    return;
  }

  // set string to filter colors based on theme
  let searchTheme;
  switch ($(this).val()) {
    case 'js puns':
      searchTheme = 'JS Puns';
      break;
    case 'heart js':
      searchTheme = 'I ♥ JS';
      break;
    default:
      searchTheme = '?';
  }

  // clear previously selected color
  $('#color').val('');
  // reset dropdown to contain all options
  $('#color').html(colorOptions);

  // remove options not related to theme
  //   (Safari does not support hide/show on dropdown options)
  for (let opt of $('#color option')) {
    if ( $(opt).text().includes(searchTheme) ) {
      // set the color selector if it has no value yet
      $('#color').val( $('#color').val() || $(opt).val() );
    } else {
      $(opt).remove();
    }
  }

  // show the color selector
  hideColorSelector(false);
});

// ACTIVITIES
var totalFees = 0;
var totalActivities = 0;

$('.activities input').on('change', function() {
  // function to get the activity fee
  function getFee(activity) {
    let str = activity.parent().text();
    let i = str.indexOf('$');
    if ( i > -1 ) {
      return parseInt(str.substring(i+1));
    } else {
      return 0;
    }
  }

  // function to get the activity time slot
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

  // function to disable/enable an activity
  function setDisabled(activity, newDisabled, newColor) {
    activity.prop('disabled', newDisabled);
    activity.parent().css('color', newColor);
  }

  let checkbox = $(this);
  let selectionIsChecked = checkbox.prop('checked');

  // update total fees
  if (selectionIsChecked) {
    totalFees += getFee(checkbox);
    totalActivities += 1;
  } else {
    totalFees -= getFee(checkbox);
    totalActivities -= 1;
  }
  $('#total-fees').text(`Total fees $${totalFees}`);

  // update other activities with same time slot
  let selectedName = checkbox.attr('name');
  let selectedTime = getTime(checkbox);
  for (let activity of $('.activities input')) {
    if ( $(activity).attr('name') !== selectedName &&
         getTime($(activity)) === selectedTime ) {
      selectionIsChecked
        ? setDisabled($(activity), true, 'dimgray')
        : setDisabled($(activity), false, 'black');
    }
  }

  // check that an activity was selected
  hasNoActivities();
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
$('#cc-num').on('keyup', function(event) {
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
  let errorCount = isNameInvalid() + isEmailInvalid() + hasNoActivities();
  if ( CcIsChecked() )
    errorCount += isCardInvalid() + isZipInvalid() + isCvvInvalid();
  if ( errorCount ) {
    alert('Registration was not submitted. Please correct the errors on the form');
  } else {
    $('form').submit();
    alert('Your registration is submitted, or something.');
  }
});


// FIELD VALIDATION
function createErrorField(element) {
  $(element).
    after('<p class=error-msg style=display:none></p>');
}

function errorIsDisplayed(element) {
  let s = $(element + ' + .error-msg').attr('style');
  return ! s.includes('display: none') &&
         ! s.includes('display:none');
}

function displayError(element, msg) {
  $(element + ' + .error-msg').html(msg).show();

  // 'display' spacer to keep exp-month below error messages
  //   if card# or zip or CVV have an error
  if ( errorIsDisplayed('#cc-num') ||
       errorIsDisplayed('#zip') ||
       errorIsDisplayed('#cvv') )
    { $('#cc-spacer').show(); }

  // add red box around field, except for activities group
  if ( element !== '.activities' )
    $(element).addClass('has-error');
}

function clearError(element) {
  $(element + ' + .error-msg').hide();

  // 'hide' spacer for exp-month
  //  if card# nor zip nor CVV have an error
  if ( ! errorIsDisplayed('#cc-num') &&
       ! errorIsDisplayed('#zip') &&
       ! errorIsDisplayed('#cvv') )
    { $('#cc-spacer').hide(); }

  if ( element !== '.activities' )
    $(element).removeClass('has-error');
}

// Create error message fields
createErrorField('#name');
createErrorField('#mail');
createErrorField('.activities');
createErrorField('#cc-num');
createErrorField('#zip');
createErrorField('#cvv');
// create a spacer to hold exp-month below error messages from
//   fields above it
$("label[for='exp-month']").before(
  "<p id='cc-spacer' style='height:130px; display:none;'></p>");

// Name is not blank
function isNameInvalid() {
  let invalid = $('#name').val().length === 0;
  invalid ? displayError('#name', 'Please enter a name.')
          : clearError('#name');
  return invalid;
}

const emailRegex = /\S+@[a-zA-z0-9\-]+\.[a-zA-Z]{2,3}$/;
function isEmailInvalid() {
  let email = $('#mail').val();
  if ( email.length === 0 ) {
    displayError('#mail', 'Please enter an email address.');
    return true;
  } else if ( ! email.match(emailRegex) ) {
      displayError('#mail','Email must be a valid email address.');
      return true;
  } else {
    clearError('#mail');
    return false;
  }
}

function hasNoActivities() {
  if ( totalActivities === 0 ) {
    displayError('.activities', 'Please select at least one activity');
    return true;
  } else {
    clearError('.activities');
    return false;
  }
}

const ccRegex = /^[0-9]{13,16}$/;
function isCardInvalid() {
  let card = $('#cc-num').val();
  if ( card.length === 0 ) {
    displayError('#cc-num', 'Please enter a card number.');
    return true;
  } else if ( ! card.match(ccRegex) ) {
    displayError('#cc-num', 'Card number must be 13 to 16 digits')
    return true;
  } else {
    clearError('#cc-num');
    return false;
  }
}

const zipRegex = /^[0-9]{5}$/;
function isZipInvalid() {
  let zip = $('#zip').val();
  if ( zip.length === 0 ) {
    displayError('#zip', 'Please enter a zip code');
    return true;
  } else if ( ! zip.match(zipRegex) ) {
    displayError('#zip', 'Zip code must be 5 digits');
    return true;
  } else {
    clearError('#zip');
    return false;
  }
}

const cvvRegex = /^[0-9]{3}$/;
function isCvvInvalid() {
  let cvv = $('#cvv').val();
  if ( cvv.length === 0 ) {
    displayError('#cvv', 'Please enter the card CVV');
    return true;
  } else if ( ! cvv.match(cvvRegex) ) {
    displayError('#cvv', 'CVV must be 3 digits');
    return true;
  } else {
    clearError('#cvv');
    return false;
  }
}
