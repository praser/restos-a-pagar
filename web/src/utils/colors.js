export const success = 'rgba(28, 200, 138, 1)';
export const successOp80 = 'rgba(20, 200, 138, 0.8)';
export const successOp20 = 'rgba(20, 200, 138, 0.2)';

export const info = 'rgba(54, 185, 204, 1)';
export const infoOp80 = 'rgba(54, 185, 204, 0.8)';
export const infoOp20 = 'rgba(54, 185, 204, 0.2)';

export const warning = 'rgba(246, 194, 62, 1)';
export const warningOp80 = 'rgba(246, 194, 62, 0.8)';
export const warningOp20 = 'rgba(246, 194, 62, 0.2)';

export const primary = 'rgba(78, 115, 223, 1)';
export const primarySc1 = 'rgba(91, 141, 227, 1)';
export const primarySc2 = 'rgba(104, 165, 231, 1)';
export const primarySc3 = 'rgba(117, 186, 234, 1)';
export const primarySc4 = 'rgba(131, 205, 237, 1)';
export const primarySc5 = 'rgba(144, 222, 240, 1)';
export const primarySc6 = 'rgba(158, 237, 243, 1)';
export const primarySc7 = 'rgba(173, 245, 243, 1)';
export const primarySc8 = 'rgba(187, 248, 239, 1)';
export const primarySc9 = 'rgba(202, 250, 237, 1)';
export const primarySc10 = 'rgba(217, 252, 239, 1)';
export const primaryOp80 = 'rgba(78, 115, 223, 0.8)';
export const primaryOp20 = 'rgba(78, 115, 223, 0.2)';

export const danger = 'rgba(234, 67, 53, 1)';
export const dangerOp80 = 'rgba(234, 67, 53, 0.8)';
export const dangerOp20 = 'rgba(234, 67, 53, 0.2)';

export const primaryScale = [
  primarySc1,
  primarySc2,
  primarySc3,
  primarySc4,
  primarySc5,
  primarySc6,
  primarySc7,
  primarySc8,
  primarySc9,
  primarySc10,
];

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
