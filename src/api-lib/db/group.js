import { Group } from '../model';

export const createGroup = async ({ group }) => {
  // Creates group
  // If theres an error function will return true
  const model = new Group(group);
  const error = await model
    .save()
    .then(() => {
      return false;
    })
    .catch((err) => {
      console.error(err);
      return true;
    });

  return error;
};

export const getGroup = async ({ groupName }) => {
  // Gets the group by the group name
  // Doesn't return error because it gets handled on api side (result.length > 0)
  let error = false;
  const group = await Group.findOne({ name: groupName });

  if (!group) {
    error = true;
  }

  return {
    error,
    group,
  };
};
