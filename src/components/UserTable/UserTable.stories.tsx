import React from "react";
import { Meta, Story } from "@storybook/react";
import { User, UserTable } from "./UserTable";

export default {
  title: "Components/organisms/UserTable",
  component: UserTable,
} as Meta;

const Template: Story<{ users: User[] }> = (args) => <UserTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  users: [
    {
      id: "1",
      username: "gourab",
      email: "qSdRb@example.com",
      createdOn: "2023-08-15T12:34:56Z",
      updatedOn: "2023-08-16T12:34:56Z",
      status: "Active",
    },
    {
      id: "2",
      username: "ram",
      createdOn: "2023-08-14T12:34:56Z",
      updatedOn: "2023-08-15T12:34:56Z",
      status: "Inactive",
      email: "new@example.com",
    },
    // Add more users as needed
  ],
};
