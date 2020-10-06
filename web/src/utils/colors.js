const success = '#1cc88a ';
const info = '#36b9cc';
const warning = '#f6c23e';
const primary = '#4e73df';

export const handleVariant = variant => {
  switch (variant) {
    case 'success':
      return success;
    case 'info':
      return info;
    case 'warning':
      return warning;
    default:
      return primary;
  }
};
