import { redirect } from "next/navigation";

export const metadata = {
  title: {
    absolute: "Branding Portfolio | Mayank Chauhan"
  },
  alternates: {
    canonical: "https://mayankchauhan.co.in/work/branding"
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function LegacyLogoDesignPage() {
  redirect("/work/branding");
}
