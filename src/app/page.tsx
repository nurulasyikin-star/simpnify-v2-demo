import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/our-platform?v=2");
}
