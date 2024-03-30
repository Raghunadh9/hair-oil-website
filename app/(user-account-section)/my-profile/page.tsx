"use client";
import { UserProfile } from "@clerk/nextjs";
import React from "react";
import { useClerk } from "@clerk/nextjs";

const ManageAccount = () => {
  const { user } = useClerk();

  return (
    <div>
      <div className="flex justify-center my-[50px]">
        <h1 className="text-2xl capitalize">
          Hello, <span className="font-bold">{user?.username} 👋</span>!
        </h1>
      </div>
      <div className="flex justify-center my-[50px]">
        <UserProfile />
      </div>
    </div>
  );
};

export default ManageAccount;
