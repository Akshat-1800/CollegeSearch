import { syncUser } from "@/lib/sync-user";

export default async function ProfilePage() {
  const user = await syncUser();

  return (
    <pre>
      {JSON.stringify(user, null, 2)}
    </pre>
  );
}