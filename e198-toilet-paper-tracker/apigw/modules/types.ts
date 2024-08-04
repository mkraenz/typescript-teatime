type IdIndex<T extends { id: string }> = {
  [id: string]: true;
};

export type User = {
  id: `user_${string}`;
  name: string;
  email: string;
  memberships: IdIndex<Household>;
};

export type Household = {
  id: `org_${string}`;
  members: IdIndex<User>;
};

const Me: User = {
  id: "user_123412345678-43675823456-256724367-1324567",
  name: "Mirco",
  email: "typescriptteatime@gmail.com",
  memberships: {
    "org_1234456-1345-32456": true,
    "org_5678-13451345-6245": true,
  },
};
