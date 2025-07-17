// client/src/app/page.tsx

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import NewArrivals from "../components/NewArrivals";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <NewArrivals />
    </main>
  );
}
