'use client'
import { SunFilled,MoonFilled } from "@ant-design/icons";
import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
const items: MenuProps['items'] = [
    {
        key:'1',
        label:(
            <a onClick={(e) => e.preventDefault()}>
                Light
            </a>
        ),
        icon: <SunFilled />,
    },
    {
        key:'2',
        label:(
            <a onClick={(e) => e.preventDefault()}>
                Dark
            </a>
        ),
        icon: <MoonFilled />,
    }
]

const ThemeSwitch = () => {
    return (
        <Dropdown menu={{items}}>
            <a onClick={(e) => e.preventDefault()} className="cursor-pointer block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400">
                <Space>
                    <SunFilled />
                </Space>
            </a>
        </Dropdown>
    )
}
export default ThemeSwitch;