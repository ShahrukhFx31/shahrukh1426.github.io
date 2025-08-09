import type { PropsWithChildren } from "react";

export function ResponsiveContainer({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full px-4 sm:px-6 md:px-8 overflow-x-hidden">
      <div className="mx-auto w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        {children}
      </div>
    </div>
  );
}


