import dbConnect from '../../../api-lib/dbConnect'
import { getGroup } from '../../../api-lib/db'
import { sendNoDocumentError, sendRequestError } from '../../../api-lib/helper'

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
        try {
            const {groupName} = req.query
            const result = await getGroup({groupName})
            if (result.length <= 0) {
                sendNoDocumentError(res)
            } else {
                res.status(200).json(result)
            }
        } catch (error) {
            sendRequestError(res, error)
        }
        break
    default:
        res.status(405).json({ message: 'Method Not Allowed' })
        break
  }
}