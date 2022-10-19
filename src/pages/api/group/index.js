import dbConnect from '../../../api-lib/dbConnect'
import { createGroup } from '../../../api-lib/db'
import { sendDatabaseError, sendRequestError } from '../../../api-lib/helper'

export default async function handler (req, res) {
  const { method, body } = req

  await dbConnect()

  switch (method) {
    case 'POST':
        try {
            const group = JSON.parse(body)
            
            const err = await createGroup({group}) 
            if (err === true) sendDatabaseError(res)
            else res.status(200).send()
        } catch (error) {
            sendRequestError(res, error)
        }
        break
    default:
        res.status(405).json({ message: 'Method Not Allowed' })
        break
  }
}