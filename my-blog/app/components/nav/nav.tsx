import Link from '../Link'
import siteMetadata from '@/data/siteMetadata'
import Logo from '@/data/logo.png'
import Image from 'next/image'
import headerNavLinks from '@/data/headerNavLinks'
import SearchButton from '../SearchButton'
import ThemeSwitch from '../ThemeSwitch'

const Nav = () => {
    const headerClass:string = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
    return (
        <header className={headerClass}>
            <Link href="/" aria-label={siteMetadata.title}>
                <div className='flex items-center justify-between'>
                    <div className='mr-3'>
                        <Image src={Logo} alt="logo" width={50} height={50}></Image>
                    </div>
                    {typeof siteMetadata.title === 'string' ? ( 
                        <div className='hidden h-6 text-xl font-normal sm:block'>{siteMetadata.title}</div>
                    ) : (siteMetadata.title)}
                </div>
            </Link>
            <div className='flex items-center space-x-4 leading-5 sm:space-x-6'>
                <div className='no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96'>
                    {headerNavLinks.filter((link) => link.href !== '/').map((link)=>(
                        <Link 
                            key={link.title} 
                            href={link.href}
                            className='block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400'
                        >{link.title}</Link>
                    ))}
                </div>
                <SearchButton></SearchButton>
                <ThemeSwitch></ThemeSwitch>
            </div>
        </header>
    )
}

export default Nav;