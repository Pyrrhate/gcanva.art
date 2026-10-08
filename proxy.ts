import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]

  if (host === "gcanva.art") {
    const url = request.nextUrl.clone()
    url.protocol = "https"
    url.host = "www.gcanva.art"
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}
