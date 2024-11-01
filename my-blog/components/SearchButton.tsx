import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
const SearchButton = () => {
   return (
    <Button shape="circle" icon={<SearchOutlined />} className='text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400'/>
   )
}
export default SearchButton