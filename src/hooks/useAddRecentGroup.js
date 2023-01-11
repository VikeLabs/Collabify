import { useEffect } from 'react';
import { RECENT_GROUPS_STORED } from 'constants';

export const useAddRecentGroup = (group) => {
  useEffect(() => {
    // Temp solution... We need to only save group.id, and we need to make
    // sure that the recently visited group is at the first array index
    if (group) {
      let storedGroups =
        JSON.parse(localStorage.getItem(RECENT_GROUPS_STORED)) ?? [];
      if (!storedGroups.some((element) => element._id === group._id)) {
        storedGroups.unshift(group);
        localStorage.setItem(
          RECENT_GROUPS_STORED,
          JSON.stringify(storedGroups)
        );
      } else {
        const index = storedGroups.indexOf({ _id: group._id });
        storedGroups.unshift(storedGroups.splice(index, 1)[0]);
        localStorage.setItem(
          RECENT_GROUPS_STORED,
          JSON.stringify(storedGroups)
        );
      }
    }
  }, [group]);
};
