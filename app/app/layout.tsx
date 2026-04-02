export const metadata = {
  title: "Wedding Officiant Certification",
  description: "Christian wedding officiant certification platform"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
