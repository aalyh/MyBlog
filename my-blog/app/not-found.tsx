/**
 * 1.当组件抛出notFound函数时触发
 * 2.当路由地址不匹配时触发
 */
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}