'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { ModeToggle } from './DarkMode';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Admin', href: '/admin' },
  { name: 'User', href: "/user" },
  { name : "Posts" , href : "/posts"},
  { name : "Chat" , href : "/chat"},
  { name : "Docs" , href : "/docs"},
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/', icon: <Github className="w-5 h-5" /> },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/manideep1428', icon: <Linkedin className="w-5 h-5" /> },
  { name: 'X', href: 'https://twitter.com/manideep1428', icon: <Twitter className="w-5 h-5" /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <Card className="flex flex-col h-screen w-60 p-4 justify-between">
      <div>
        <h1 className="text-xl font-bold mb-6">Memo Tag</h1>
        <Separator className="mb-4" />
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Button
                asChild
                variant={pathname === link.href ? 'default' : 'ghost'}
                className="w-full justify-start"
              >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <Separator className='my-4'/>
      <div>
        <Separator className="my-4" />
        <div className="flex gap-4 justify-center items-stretch">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.icon}
            </a>
          ))}
        </div>
        <ModeToggle/>
      </div>
    </Card>
  );
}
