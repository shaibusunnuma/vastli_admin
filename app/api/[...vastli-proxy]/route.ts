import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function GET(req: NextRequest) {
  return proxyRequest(req);
}

export async function POST(req: NextRequest) {
  return proxyRequest(req);
}
export async function PATCH(req: NextRequest) {
  return proxyRequest(req);
}

export async function PUT(req: NextRequest) {
  return proxyRequest(req);
}

export async function DELETE(req: NextRequest) {
  return proxyRequest(req);
}

async function proxyRequest(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const apiPath = pathname.replace(/^\/api\/vastli-proxy/, "");
  const targetUrl = `${BACKEND_API_URL}${apiPath}${search}`;

  const headers = new Headers(req.headers);
  // Remove host header to avoid conflicts
  headers.delete("host");

  // Include duplex for streaming bodies (required by Node fetch/undici)
  const fetchInit: RequestInit & { duplex?: 'half' } = {
    method: req.method,
    headers,
    ...(req.method !== "GET" && req.method !== "HEAD" ? { duplex: 'half' as const, body: req.body } : {}),
    credentials: "include",
  };

  console.log('targetUrl: ', targetUrl)

  // Proxy the request to the backend
  const backendRes = await fetch(targetUrl, fetchInit);

  // Prepare the response
  const resHeaders = new Headers(backendRes.headers);
  // Forward Set-Cookie headers
  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    resHeaders.set("set-cookie", setCookie);
  }

  const body = await backendRes.arrayBuffer();
  return new NextResponse(body, {
    status: backendRes.status,
    headers: resHeaders,
  });
}
