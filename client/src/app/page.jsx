import HomeHero from "@/components/home/HomeHero";
import HomeNavbar from "@/components/home/HomeNavbar";
import HomeSections from "@/components/home/HomeSections";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <HomeNavbar />
            <HomeHero />
            <HomeSections />
        </div>
    );
}