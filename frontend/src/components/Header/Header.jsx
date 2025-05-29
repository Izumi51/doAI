import NavBar from "../navBar/navBar"
import logo from "../../assets/testeLogo.jpg"
{
// function Header() {
//     return <header className="px-10 flex justify-between justify-items-center">
//         <img src={logo} alt="Logo do doAi!" className="size-20"/>
//         <NavBar />
//     </header>
// }
}

{
// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
//   { name: 'Team', href: '#', current: false },
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Calendar', href: '#', current: false },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// function Header() {
//   return (
//     <Disclosure as="nav" className="bg-gray-800">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             {/* Mobile menu button*/}
//             <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
//               <span className="absolute -inset-0.5" />
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
//               <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
//             </DisclosureButton>
//           </div>
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex shrink-0 items-center">
//               <img
//                 alt="Your Company"
//                 src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
//                 className="h-8 w-auto"
//               />
//             </div>
//             <div className="hidden sm:ml-6 sm:block">
//               <div className="flex space-x-4">
//                 {navigation.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     aria-current={item.current ? 'page' : undefined}
//                     className={classNames(
//                       item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                       'rounded-md px-3 py-2 text-sm font-medium',
//                     )}
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             <button
//               type="button"
//               className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
//             >
//               <span className="absolute -inset-1.5" />
//               <span className="sr-only">View notifications</span>
//               <BellIcon aria-hidden="true" className="size-6" />
//             </button>

//             {/* Profile dropdown */}
//             <Menu as="div" className="relative ml-3">
//               <div>
//                 <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
//                   <span className="absolute -inset-1.5" />
//                   <span className="sr-only">Open user menu</span>
//                   <img
//                     alt=""
//                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                     className="size-8 rounded-full"
//                   />
//                 </MenuButton>
//               </div>
//               <MenuItems
//                 transition
//                 className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
//               >
//                 <MenuItem>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
//                   >
//                     Your Profile
//                   </a>
//                 </MenuItem>
//                 <MenuItem>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
//                   >
//                     Settings
//                   </a>
//                 </MenuItem>
//                 <MenuItem>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
//                   >
//                     Sign out
//                   </a>
//                 </MenuItem>
//               </MenuItems>
//             </Menu>
//           </div>
//         </div>
//       </div>

//       <DisclosurePanel className="sm:hidden">
//         <div className="space-y-1 px-2 pt-2 pb-3">
//           {navigation.map((item) => (
//             <DisclosureButton
//               key={item.name}
//               as="a"
//               href={item.href}
//               aria-current={item.current ? 'page' : undefined}
//               className={classNames(
//                 item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                 'block rounded-md px-3 py-2 text-base font-medium',
//               )}
//             >
//               {item.name}
//             </DisclosureButton>
//           ))}
//         </div>
//       </DisclosurePanel>
//     </Disclosure>
//   )
// }
}

function Header() {
    return(
    <header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <div className="flex items-center lg:order-2">
                <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
                <a href="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get started</a>
                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>)
}


export default Header