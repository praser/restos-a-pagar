const success = '#1cc88a ';
const info = '#36b9cc';
const warning = '#f6c23e';
const primary = '#4e73df';
const danger = '#ea4335';

export const handleVariant = variant => {
  switch (variant) {
    case 'success':
      return success;
    case 'info':
      return info;
    case 'warning':
      return warning;
    case 'danger':
      return danger;
    default:
      return primary;
  }
};
