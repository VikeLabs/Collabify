import { Group } from "../model"

export const createGroup = async ({
    group
}) => {
    // Creates group
    // If theres an error function will return true
    let error = false
    const model = new Group(group)
    error = await model.save()
    .then(() => {
        return false
    })
    .catch((err) => {
        console.error(err)
        return true
    })

    return error
}

export const getGroup = async ({
    groupName
}) => {
    const result = await Group.find({name: groupName})

    return result
}