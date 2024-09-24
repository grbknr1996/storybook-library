import * as React from 'react';
import React__default from 'react';

interface User {
    id: string;
    username: string;
    createdOn: string;
    updatedOn: string;
    email: string;
    status: string;
}
interface UserTableProps {
    users: User[];
}
declare const UserTable: React__default.FC<UserTableProps>;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}
declare const Button: React.FC<ButtonProps>;

export { Button, UserTable };
