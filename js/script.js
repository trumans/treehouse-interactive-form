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
