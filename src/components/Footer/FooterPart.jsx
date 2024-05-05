import React from 'react'
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from "../../assets/pranto-logo.png";

export default function FooterPart() {
  return (
    <Footer container className='shadow border '>
      <div className="w-full px-2 sm:px-[45px] ">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className='flex mb-5 sm:mb-0'>
            <Footer.Brand
              src={logo}
              alt="pranto Logo"
              name="pranto"
            />
            <p className='text-sm font-semibold py-1 sm:p-0 md:text-xl md:font-bold m-1'>প্রান্ত প্রকাশন</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 ">
            <div>
              <Footer.Title title="Explore" className='text-black' />
              <Footer.LinkGroup col>
                <Footer.Link href="/">Pranto Prokashon</Footer.Link>
                <Footer.Link href="#">Sitemap</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Customer Service" className='text-black' />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Help Center</Footer.Link>
                <Footer.Link href="#">Contact Us</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Policy" className='text-black'/>
              <Footer.LinkGroup col>
                <Footer.Link href="#">Refund Policy</Footer.Link>
                <Footer.Link href="#">Terms of Use</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Pranto Prokashon" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
          </div>
        </div>
      </div>
    </Footer>
  )
}
