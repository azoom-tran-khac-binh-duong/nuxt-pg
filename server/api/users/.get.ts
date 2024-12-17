import { and, like, SQLWrapper } from "drizzle-orm"
import { db } from "~~/db"
import { usersTable } from "~~/db/schema"

export default defineEventHandler(async (event) => { 
  const query = getQuery(event)
  const conditions = conditionMapper(query)

  const users = db.query.usersTable.findMany({
    where: and(...conditions),
  })

  return users
})

type ConditionMap = Record<string, (value: any) => SQLWrapper>
function conditionMapper(query: any) {
  const conditionMap: ConditionMap = {
    'username': (value) => like(usersTable.username, `%${value}%`),
    'email': (value) => like(usersTable.email, `%${value}%`),
  }

  return Object.entries(query).reduce((acc, [key, value]) => {
    if (conditionMap[key]) {
      acc.push(conditionMap[key](value))
    }
    return acc
  }, [] as SQLWrapper[])
}
