import { DropdownMenu } from 'components/common/DropdownMenu';
import { useRouter } from 'next/router';

export const Menu = () => {
  const router = useRouter();

  const menuItems = [
    {
      icon: 'Settings',
      text: 'Group Settings',
      onClick: () => router.replace(`/${groupID}/settings`),
    },
    {
      icon: 'ArrowBack',
      text: 'Back',
      onClick: () => router.replace('/'),
    },
  ];

  return <DropdownMenu menuItems={menuItems} />;
};
