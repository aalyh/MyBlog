//中间件
import { NextResponse } from 'next/server'
 
// 中间件可以是 async 函数，如果使用了 await
export function middleware(request:NextResponse) {
  // 假设传入的请求 header 里 "Cookie:nextjs=fast"
  let cookie = request.cookies.get('nextjs');
  const allCookies = request.cookies
  
  request.cookies.has('nextjs');
  request.cookies.delete('nextjs')
  request.cookies.has('nextjs')

  //设置cookie
  const response = NextResponse.next();
  response.cookies.set('vercel', 'fast')
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/',
  })
  cookie = response.cookies.get('vercel');
  console.log(cookie);

  // 响应 header 为 `Set-Cookie:vercel=fast;path=/test`
  return response
  
}

// 设置匹配路径
export const config = {
  matcher: ['/about/:path*',],
}