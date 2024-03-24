import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Field is required',
    notType: function notType(_ref) {
      if (_ref.type === 'date') {
        return 'Please enter a valid date';
      }

      return 'Wrong format';
    }
  },
  string: {
    min: 'Min length is ${min}',
    max: 'Max length is ${max}',
    email: 'Invalid email address'
  },
  number: {
    min: 'Min value is ${min}',
    max: 'Max value is ${max}',
    integer: 'Must be a integer number',
    positive: 'Must be a positive number'
  }
});

export { Yup };
