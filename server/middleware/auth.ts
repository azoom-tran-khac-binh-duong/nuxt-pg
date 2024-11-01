import { getAuth } from 'firebase-admin/auth';
import { ensureAdminApp } from 'vuefire/server'
import { db } from '~~/db';

export default defineEventHandler(async (event) => {
  if(event.path.startsWith('/api')) {
    const [type, token] = getHeaders(event).authorization?.split(' ') || []
    if (!token) {
      setResponseStatus(event, 401)
      return { message: 'Unauthorized' }
    }

    const app = ensureAdminApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    })
    const decodedToken = await getAuth(app).verifyIdToken(token)
    const user = await db.query.usersTable.findFirst({
      where: (usersTable, { eq }) => eq(usersTable.email, decodedToken.email),
    })
    
    if (!user) {
      setResponseStatus(event, 401)
      return { message: 'Unauthorized' }
    }

    const USER_KEY = 'user'
    event.context[USER_KEY] = user
  }
})