interface AppContainerProps {
  children: React.ReactNode;
}
export default function AppContainer(prosp: AppContainerProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {prosp.children}
    </div>
  );
}
