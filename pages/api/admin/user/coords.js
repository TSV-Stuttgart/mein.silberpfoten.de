import getToken from '../../../../lib/auth/getToken'
import db from '../../../../lib/db'
import logger from '../../../../lib/logger'

export default async function handler(request, response) {

  logger.info(`${request.url} | ${request.method}`)

  try {
    const token = await getToken(request)

    if (token.user.status !== 'ADMIN') {

      response.status(401).json({})

      return
    }

    if (request.method === 'POST') {

      const {
        userId,
        lat,
        lon,
      } = request.body

      logger.info(`${request.url} | ${request.method} | update Coords | ${userId}`)

      const updateCoordsRequest = await db.query(`
        UPDATE
          public.user
        SET
          lat = $1,
          lon = $2
        WHERE
          user_id = $3
        RETURNING 
          user_id
        `, [
          lat,
          lon,
          userId,
        ]
      )

      if (updateCoordsRequest.rowCount > 0) {
        logger.info(`${request.url} | ${request.method} | update Coords | success | ${JSON.stringify(updateCoordsRequest.rows[0])}`)

        response.status(200).json({
          statusCode: 200,
          body: {}
        })

        return
      }

      response.status(200).json({
        statusCode: 500,
        body: {}
      })

      return
    }

  } catch(e) {
    logger.info(`api | update Coords | error | ${e}`)

    if (e.message.includes('duplicate key')) {
      response.status(200).json({
        statusCode: 500,
        error: 'conflict'
      })

      return
    }

  }

}
