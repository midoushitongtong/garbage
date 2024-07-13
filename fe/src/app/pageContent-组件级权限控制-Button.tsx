'use client';
import { useMemo, useState } from 'react';

type Props = {
  permission: string | string[];
  children: React.ReactNode | ((_userPermissions: string[]) => React.ReactNode);
};

const Authority = (props: Props) => {
  const { children, permission } = props;
  const [userPermissions] = useState(['add', 'edit']);
  const hasPermission = useMemo(() => {
    if (typeof permission === 'string') {
      return userPermissions.includes(permission);
    }
    return permission.every((item) => userPermissions.includes(item));
  }, [permission, userPermissions]);

  if (typeof children === 'function') {
    return children(userPermissions);
  }

  return hasPermission ? children : null;
};

export default Authority;
