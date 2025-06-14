import {
  UpdateAvatarCard,
  UpdateNameCard,
  UpdateUsernameCard,
  ChangeEmailCard,
  ChangePasswordCard,
  SessionsCard,
  DeleteAccountCard,
} from "@daveyplate/better-auth-ui";

export default function CustomSettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto py-12 px-4">
      <UpdateAvatarCard />
      <UpdateNameCard />
      <UpdateUsernameCard />
      <ChangeEmailCard />
      <ChangePasswordCard />
      <SessionsCard />
      <DeleteAccountCard />
    </div>
  );
}
