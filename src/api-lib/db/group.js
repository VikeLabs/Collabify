import prisma from 'api-lib/prisma';

/**
 * createGroup
 * @param {{ group: prisma.model.Group }} group - an instance of `Group` schema
 * @param {(groupID: string, err: InternalServerError | null) => void} callback
 */
// export const createGroup = async (group, callback) => {
//   try {
//     /* Extracting password */
//     let pw;
//     if (group.isPrivate) {
//       pw = _.cloneDeep(group.password);
//       delete group.password;
//     }

//     /* Save group */
//     const groupID = await prisma.group.create({data: group}).then((doc) => doc['id']);

//     if (!group.isPrivate) {
//       return callback(groupID, null);
//     }

//     /* Encrypt and save password */
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(pw, saltRounds);

//     await new GroupPasswords({
//       password: hashedPassword,
//       group: groupID,
//     }).save();

//     callback(groupID, null);
//     return;
//   } catch (e) {
//     callback('', new InternalServerError(e));
//   }
// };

export const getGroup = async ({ groupID }) => {
  // Gets the group by the group name
  // Doesn't return error because it gets handled on api side (result.length > 0)
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupID,
      },
    });
    return group
      ? { group, groupError: null }
      : {
          group: null,
          groupError: new NotFoundError(`Group not found: ${groupID}`),
        };
  } catch (e) {
    return {
      group: null,
      groupError: new Error(e),
    };
  }
};

export const getManyGroups = async ({ groupIDs }) => {
  // groupIDs should be an array of ids
  let error = false;
  const groupIDsArray = groupIDs?.map((e) => mongoose.Types.ObjectId(e));
  const groups = await prisma.group.findMany({
    where: {
      id: { in: groupIDsArray },
    },
  });

  if (!groups) {
    error = true;
  }

  return {
    error,
    groups,
  };
};

export const getAllGroups = async () => {
  let error = false;
  const groups = await prisma.group.find();

  if (!groups) {
    error = true;
  }

  return {
    error,
    groups,
  };
};

export const updateGroup = async ({ groupID, group }) => {
  // Updates group
  // If theres an error function will return true
  const { error } = await prisma.group
    .update({
      where: {
        id: groupID,
      },
      data: group,
    })
    .then((e) => {
      console.log(e);
      return {
        error: false,
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        error: true,
      };
    });

  return {
    error,
  };
};
