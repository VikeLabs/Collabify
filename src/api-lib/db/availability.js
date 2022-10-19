import { Group, Availability } from "../model"

export const addAvailabilityToGroup = async ({
    groupName,
    availability
}) => {
    // Creates availability then adds availabilities ID to the group 'availabilities' array
    // If theres an error function will return true
    let error = false
    const model = new Availability(availability)
    error = await model.save()
    .then(savedDoc => {
        Group.findOneAndUpdate(
            { name: groupName},
            { $push: { availabilities: savedDoc._id}},
            { new: true },
            (err) => {
                if (err) {
                    console.error(err)
                    return true
                }
            }
        )
        return false
    })
    .catch((err) => {
        console.error(err)
        return true
    })

    return error
}