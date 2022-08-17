import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { nanoid } from 'nanoid'

export function middleware(request: NextRequest) {
  // getting cookies from the request
  const cookie = request.cookies.get("poll-token")

  if (cookie) return

  const response = NextResponse.next()

  const cookieValue = nanoid()

  // setting cookies on the response
  response.cookies.set("poll-token", cookieValue, { sameSite: "strict" })

  return response
}
