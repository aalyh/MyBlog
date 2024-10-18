/* eslint-disable @typescript-eslint/no-explicit-any */

// `layout` 会包裹 `template`，`template` 又会包裹 `page` 模板类似于布局，它也会传入每个子布局或者页面。但不会像布局那样维持状态
// app/template.js
export default function Template({ children }:any) {
    return <div>{children}</div>
  }