SUMMARY
This project is a simple conference registration form. The submit action validates the form data and displays a message whether the form was "submitted" or not. The form is not actually submitted to anywhere.

FEATURES
If JavaScript is disabled all fields are available for input but no validation is applied.

Data validation
- The following fields are validated: name (cannot be blank), email (must be valid email format), and activities selections (minimum of 1). The follow are validated if the payment type is credit card: card# (13 to 16 digits), zip code (5 digits) and CVV (3 digits).
- Some fields have different error messages base on the condition – 1) when the field has no value, 2) when the input doesn't pass validation requirements. These fields are email, credit card#, zip code, CVV.
- Error messages appear in red text below the related field and the input field is highlighted with a red border. The one exception is the “select at least activity” error message which does not put a red border around the activity section.
- When the page initially loads no field validation is done. Validation is applied to individual fields during data entry and for all fields when the form is submitted.

Field Hiding
The Job Role text input field is hidden unless the Other job role is selected form the job dropdown.
The t-shirt colors dropdown are hidden until a t-shirt theme is selected. T-shirt colors are filtered based on the selected theme.
The payment section displays only one of three subsections based on the payment type dropdown. The credit card option is selected by default.

Activities section
- A fee total is updated as activities are selected and deselected.
- When a activity is selected any other activities in the same time slot are disabled and grayed. Deselecting an activity enables any conflicting activities.
- A minimum of one activity must be selected before the form can be submitted.

Form submission
The form is not submitted to a server or another page. An alert is displayed indicating whether the form was “successfully submitted” or that there are errors to be corrected.


CODING COMMENTS
Project includes the normalize.css
Project uses jQuery, included with the jQuery CDN.

When the page is loaded the cursor has focus in the name field.

All input fields are created in index.html.  Other fields that require JavaScript support are created by JS.

Error messages fields are added as a sibling after the related input field. Shared functions handle displaying the error message and adding a red border to the input file, along with hiding the message field and removing the red border.

Elements are hidden based on the value of another field. See the Field Hiding section above.

The checkboxes in the activities fieldset trigger functionality for updating a fees total and disabling items with a conflicting time slot.
