import { Header } from "@/components/header";
import { ResponsiveContainer } from "@/components/layout/responsive-container";
import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to about page as the main landing page
  redirect("/about");
}
