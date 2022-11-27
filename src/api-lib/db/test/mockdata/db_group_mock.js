const publicGroup = {
  isPrivate: false,
  name: 'test_name',
  description: 'test_description',
  icon: 'test_icon',
  calendarMaxTime: '09:00:00',
  calendarMinTime: '17:00:00',
};

const privateGroup = {
  isPrivate: true,
  password: 'password',
  name: 'test_name',
  description: 'test_description',
  icon: 'test_icon',
  calendarMaxTime: '09:00:00',
  calendarMinTime: '17:00:00',
};

export { publicGroup, privateGroup };
