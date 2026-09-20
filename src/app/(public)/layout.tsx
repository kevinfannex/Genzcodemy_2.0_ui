import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import NeedHelpBanner from "@/components/layout/NeedHelpBanner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 pb-12">
      <Header />
      <main className="flex-1">{children}</main>
      <NeedHelpBanner />
      <Footer />
    </div>
  );
}
