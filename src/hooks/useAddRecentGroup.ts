import { useEffect } from 'react';
import { RECENT_GROUPS_STORED } from 'constants/index';

export const useAddRecentGroup = (groupID: number) => {
  useEffect(() => {
    if (!groupID) return;

    const lsGroups = window.localStorage.getItem(RECENT_GROUPS_STORED);
    const groups: number[] = lsGroups !== null ? JSON.parse(lsGroups) : [];

    if (groups.length === 0) {
      groups.push(groupID);
      setItem(groups);
      return;
    }

    const groupIdx = groups.findIndex((id) => id === groupID);
    if (groupIdx === 0) return;

    if (groupIdx === -1) {
      setItem([groupID, ...groups]);
      return;
    }

    const leftArr = groups.slice(0, groupIdx);
    const rightArr = groups.slice(groupIdx + 1);
    setItem([groupID, ...leftArr, ...rightArr]);
  }, [groupID]);
};

function setItem(groupIDs: number[]) {
  window.localStorage.setItem(RECENT_GROUPS_STORED, JSON.stringify(groupIDs));
}
