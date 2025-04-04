'use client'
import Link from 'next/link';
import React, { ReactNode } from 'react';

type AdminUserProps = {
  children: ReactNode;
};  

const AdminUserindex: React.FC<AdminUserProps> = ({ children }) => {
  return (
    <div className="text-base-content bg-base-100 h-auto min-h-screen">
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
        <div className="p-4">
          {children}
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div className="bg-primary text-base-content p-2 rounded mb-2">CUSAUTH</div>
          <li><Link href="/admin/company">Company</Link></li>
          <li><Link href="/admin/profile-update">Profile Update</Link></li>
          <li><Link href="/admin/roles">Roles</Link></li>
          <li><Link href="/admin/user-roles">User Roles</Link></li>
          <li><Link href="/admin/users">Users</Link></li>
          <div className="bg-primary mb-2 text-base-content p-2 rounded">SHLORD</div>          
        </ul>
      </div>
    </div>
  </div>
  )
}

export default AdminUserindex;