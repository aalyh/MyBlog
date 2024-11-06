'use client'
// import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'
import { Button } from "antd";
import { VerticalAlignTopOutlined } from '@ant-design/icons';
const ScrollTopAndComment = () =>{
    const [show,setShow] = useState(false)
    useEffect(()=>{
        const handleWindowScroll = ()=>{
            if(window.scrollY > 50){
                setShow(true)
            }else{
                setShow(false)
            }
        }

        window.addEventListener('scroll',handleWindowScroll)
        return () => window.removeEventListener('scroll',handleWindowScroll)
    },[])
    const handleScrollTop = ()=>{
        window.scrollTo({ top: 0 })
    }
    return(
        <div className={`fixed bottom-8 right-8 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}>
            <Button aria-label='回到顶部' icon={<VerticalAlignTopOutlined />} onClick={handleScrollTop} className='rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'>
            </Button>
        </div>
    )
}

export default ScrollTopAndComment;