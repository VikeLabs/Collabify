import { Group } from '../model';

export const createGroup = async ({ group }) => {
  // Creates group
  // If theres an error function will return true
  const model = new Group(group);
  const { error, groupID } = await model
    .save()
    .then((e) => {
      return {
        error: false,
        groupID: e._id,
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        error: true,
        groupID: null,
      };
    });

  return {
    error,
    groupID,
  };
};

export const getGroup = async ({ groupID }) => {
  // Gets the group by the group name
  // Doesn't return error because it gets handled on api side (result.length > 0)
  let error = false;
  const group = await Group.findOne({ _id: groupID });

  if (!group) {
    error = true;
  }

  return {
    error,
    group,
  };
};
