"use client";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  enabled: boolean;
};

export default function ArabicToggle({ enabled }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = () => {
    const params = new URLSearchParams(window.location.search);
    if (enabled) {
      params.delete("arabic_diacritics");
    } else {
      params.set("arabic_diacritics", "include");
    }
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <label className="label">
      Show Arabic
      <input
        type="checkbox"
        checked={enabled}
        className="toggle toggle-primary"
        onChange={handleToggle}
      />
    </label>
  );
}
