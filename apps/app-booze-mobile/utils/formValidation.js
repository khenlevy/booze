/**
 * Form validation utilities for drink log entry form
 */

export const validateDrinkLogForm = (formData) => {
  const errors = {};

  // Validate drink selection
  if (!formData.drinkId || formData.drinkId.trim() === '') {
    errors.drinkId = 'Please select a drink';
  }

  // Validate quantity
  if (!formData.quantity || formData.quantity.trim() === '') {
    errors.quantity = 'Please enter a quantity';
  } else {
    const qty = parseFloat(formData.quantity);
    if (isNaN(qty) || qty <= 0) {
      errors.quantity = 'Quantity must be a positive number';
    }
    if (qty > 10000) {
      errors.quantity = 'Quantity seems too large';
    }
  }

  // Validate rating
  if (formData.rating === 0 || formData.rating === null || formData.rating === undefined) {
    errors.rating = 'Please rate the drink';
  } else if (formData.rating < 1 || formData.rating > 5) {
    errors.rating = 'Rating must be between 1 and 5';
  }

  // Validate date
  if (!formData.date) {
    errors.date = 'Please select a date';
  } else {
    const selectedDate = new Date(formData.date);
    const today = new Date();
    if (selectedDate > today) {
      errors.date = 'Date cannot be in the future';
    }
  }

  // Validate time
  if (!formData.time) {
    errors.time = 'Please select a time';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const getErrorMessage = (fieldName, errors) => {
  return errors[fieldName] || null;
};

export const hasError = (fieldName, errors) => {
  return !!errors[fieldName];
};
