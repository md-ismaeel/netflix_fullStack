import { IoMdArrowDropdown } from "react-icons/io";
import { Line } from "../Line";
import "../Footer/Footer.css"

export const Footer = () => {

    const serviceData = [
        { name: 'FAQ', link: 'https://help.netflix.com/en/node/412' },
        { name: 'Investor Relations', link: 'https://ir.netflix.net/ir-overview/profile/default.aspx' },
        { name: 'Privacy', link: 'https://help.netflix.com/legal/privacy' },
        { name: 'Speed Test', link: 'https://fast.com/' },
        { name: 'Help Center', link: 'https://help.netflix.com/en' },
        { name: 'Jobs', link: 'https://jobs.netflix.com/' },
        { name: 'Cookie Preferences', link: 'https://help.netflix.com/legal/notices' },
        { name: 'Legal Notices', link: 'https://help.netflix.com/legal/notices' },
        { name: 'Account', link: 'https://www.netflix.com/login?nextpage=https%3A%2F%2Fwww.netflix.com%2Fyouraccount' },
        { name: 'Ways to watch', link: 'https://help.netflix.com/en/node/14361' },
        { name: 'Corporate Information', link: 'https://help.netflix.com/en/node/134094' },
        { name: 'Only on NetFlix', link: 'https://www.netflix.com/in/browse/genre/839338' },
        { name: 'Media Center', link: 'https://media.netflix.com/en/' },
        { name: 'Team of Use', link: 'https://help.netflix.com/legal/termsofuse' },
        { name: 'Contact Us', link: 'https://help.netflix.com/en/contactus' },
    ]

    return (
        <>
            <Line />
            <div className="w-full h-[400px] py-4 bg-black text-white flex flex-col justify-center items-center">
                <p style={{ fontSize: "15px" }} className="w-[80%] opacity-75">Questions? Call <a href="#"> 000-800-919-1694</a></p>

                <div style={{ fontSize: "15px" }} className="w-[80%] flex flex-wrap px-2 py-2">
                    {serviceData.map((item, index) => (<li key={index} className="list-none link w-[25%] mt-2 opacity-75">
                        <a href={item.link} target="_blank" className="underline">{item.name}</a>
                    </li>))}
                </div>

                <div className='w-[80%] relative mt-6 opacity-75'>
                    <select className='bg-black z-10 px-10 py-1 rounded-md border appearance-none'>
                        <option>English</option>
                        <option>हिंदी</option>
                    </select>
                    <svg className='absolute top-2 left-2' xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="LanguagesSmall" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M10.7668 5.33333L10.5038 5.99715L9.33974 8.9355L8.76866 10.377L7.33333 14H9.10751L9.83505 12.0326H13.4217L14.162 14H16L12.5665 5.33333H10.8278H10.7668ZM10.6186 9.93479L10.3839 10.5632H11.1036H12.8856L11.6348 7.2136L10.6186 9.93479ZM9.52722 4.84224C9.55393 4.77481 9.58574 4.71045 9.62211 4.64954H6.41909V2H4.926V4.64954H0.540802V5.99715H4.31466C3.35062 7.79015 1.75173 9.51463 0 10.4283C0.329184 10.7138 0.811203 11.2391 1.04633 11.5931C2.55118 10.6795 3.90318 9.22912 4.926 7.57316V12.6667H6.41909V7.51606C6.81951 8.15256 7.26748 8.76169 7.7521 9.32292L8.31996 7.88955C7.80191 7.29052 7.34631 6.64699 6.9834 5.99715H9.06968L9.52722 4.84224Z" fill="currentColor"></path></svg>
                    <IoMdArrowDropdown className='absolute left-28 top-2' />
                </div>
                <p className='w-[80%] opacity-75 mt-4'>NetFlix India</p>

            </div>
        </>
    )
}