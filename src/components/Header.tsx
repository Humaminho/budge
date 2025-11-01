'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';
import { BadgeDollarSign } from 'lucide-react';

import Container from './Container';
import { siteDetails } from '@/data/siteDetails';
import { menuItems } from '@/data/menuItems';

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const scrollToSection = (href: string) => {
		if (href.startsWith('#')) {
			const element = document.querySelector(href);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};

	return (
		<header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full backdrop-blur-sm">
			<Container className="!px-0">
				<nav className="shadow-md md:shadow-none bg-white/95 md:bg-transparent mx-auto flex justify-between items-center py-3 px-5 md:py-5 transition-all duration-300">
					{/* Logo */}
					<Link
						href="/"
						className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-1"
					>
						<BadgeDollarSign className="text-foreground min-w-fit w-7 h-7 transition-colors group-hover:text-primary" />
						<span className="mt-1 text-xl font-semibold text-foreground cursor-pointer transition-colors group-hover:text-foreground-accent">
							{siteDetails.siteName}
						</span>
					</Link>

					{/* Desktop Menu */}
					<ul className="hidden md:flex items-center space-x-8">
						{menuItems.map((item) => (
							<li key={item.text}>
								<Link
									href={item.url}
									className="relative text-foreground hover:text-foreground-accent transition-all duration-200 px-2 py-1 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
									onClick={(e) => {
										e.preventDefault();
										scrollToSection(item.url);
									}}
								>
									{item.text}
								</Link>
							</li>
						))}
						<li>
							<Link
								href="#contact"
								className="text-black bg-primary hover:bg-primary-accent px-6 py-2.5 rounded-md transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
								onClick={(e) => {
									e.preventDefault();
									scrollToSection('#contact');
								}}
							>
								Reach out
							</Link>
						</li>
					</ul>

					{/* Mobile Menu Button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={toggleMenu}
							type="button"
							className="bg-primary text-black focus:outline-none rounded-full w-11 h-11 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2"
							aria-controls="mobile-menu"
							aria-expanded={isOpen}
						>
							{isOpen ? (
								<HiOutlineXMark
									className="h-6 w-6 transition-transform duration-200 rotate-90"
									aria-hidden="true"
								/>
							) : (
								<HiBars3
									className="h-6 w-6 transition-transform duration-200"
									aria-hidden="true"
								/>
							)}
							<span className="sr-only">Toggle navigation</span>
						</button>
					</div>
				</nav>
			</Container>

			{/* Mobile Menu with Transition */}
			<Transition
				show={isOpen}
				enter="transition ease-out duration-300 transform"
				enterFrom="opacity-0 scale-95 -translate-y-2"
				enterTo="opacity-100 scale-100 translate-y-0"
				leave="transition ease-in duration-200 transform"
				leaveFrom="opacity-100 scale-100 translate-y-0"
				leaveTo="opacity-0 scale-95 -translate-y-2"
			>
				<div
					id="mobile-menu"
					className="md:hidden bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100"
				>
					<ul className="flex flex-col space-y-2 pt-4 pb-6 px-6">
						{menuItems.map((item, index) => (
							<li key={item.text}>
								<Link
									href={item.url}
									className="block py-3 px-4 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-200 font-medium"
									onClick={(e) => {
										e.preventDefault();
										scrollToSection(item.url);
										toggleMenu();
									}}
									style={{
										animationDelay: `${index * 50}ms`,
									}}
								>
									{item.text}
								</Link>
							</li>
						))}
						<li className="pt-2 border-t border-gray-100 mt-4">
							<Link
								href="#contact"
								className="text-black bg-primary hover:bg-primary-accent px-6 py-3 rounded-full block w-full text-center font-medium shadow-lg hover:shadow-xl transition-all duration-200"
								onClick={(e) => {
									e.preventDefault();
									scrollToSection('#contact');
									toggleMenu();
								}}
							>
								Reach out
							</Link>
						</li>
					</ul>
				</div>
			</Transition>
		</header>
	);
};

export default Header;
