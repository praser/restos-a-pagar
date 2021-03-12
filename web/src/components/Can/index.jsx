import rules from 'utils/rbac-rules';
import useCurrentUser from 'hooks/useCurrentUser';

const check = (role, action, data) => {
  const permissions = rules[role];
  if (!permissions) return false;

  const { static: staticPermissions } = permissions;

  if (staticPermissions && staticPermissions.includes(action)) return true;

  const { dynamic: dynamicPermissions } = permissions;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) return false;
    return permissionCondition(data);
  }

  return false;
};

const Can = ({ perform, data, yes, no }) => {
  const currentUser = useCurrentUser();
  let role;
  if (currentUser) {
    role = currentUser.role;
  } else {
    role = 'visitor';
  }

  return check(role, perform, data) ? yes() : no();
};

Can.defaultProps = {
  yes: () => null,
  no: () => null,
};

export default Can;
