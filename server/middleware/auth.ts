import { getAuth } from 'firebase-admin/auth';
import { ensureAdminApp } from 'vuefire/server'
import { db } from '~~/db';
import { appError } from '../utils/error';

export default defineEventHandler(async (event) => {
  if(event.path.startsWith('/api')) {
    const accessToken = extractTokenFromHeaders(event)

    const firebaseAdminApp = ensureAdminApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    })
    const decodedToken = await getAuth(firebaseAdminApp).verifyIdToken(accessToken)
    
    const user = await getUserByEmail(decodedToken.email)
    const USER_KEY = 'user'
    event.context[USER_KEY] = user
  }
})

function extractTokenFromHeaders(event) {
  const [_type, token] = getHeaders(event).authorization?.split(' ') || []
  
  if (!token) {
    throw appError(401, 'Unauthorized')
  }

  return token
}

async function getUserByEmail(email: string) {
  const user = await db.query.usersTable.findFirst({
    where: (usersTable, { eq }) => eq(usersTable.email, email),
  })
  
  if (!user) {
    throw appError(401, 'Unauthorized')
  }

  return user
}