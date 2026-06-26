import { AdminClient } from "./admin-client";

export const metadata = {
  title: {
    absolute: "Portfolio Admin | Mayank Chauhan"
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return <AdminClient />;
}
