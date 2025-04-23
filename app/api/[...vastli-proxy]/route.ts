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
  // Extract the path to forward
  const { pathname, search } = req.nextUrl;
  const apiPath = pathname.replace(/^\/api\/vastli-proxy/, "");
  const targetUrl = `${BACKEND_API_URL}${apiPath}${search}`;

  // Prepare the request init
  const headers = new Headers(req.headers);
  // Remove host header to avoid conflicts
  headers.delete("host");

  const fetchInit: RequestInit = {
    method: req.method,
    headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? await req.text() : undefined,
    credentials: "include",
  };
  console.log('targetUrl: ', targetUrl)

  // Proxy the request to the backend
  const backendRes = await fetch(targetUrl, fetchInit);

  console.log('response: ', backendRes.status)

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
