"use client";

import Script from "next/script";

export default function KofiWidget() {
  const options = {
    type: "floating-chat",
    "floating-chat.donateButton.text": "Support me",
    "floating-chat.donateButton.background-color": "#00b9fe",
    "floating-chat.donateButton.text-color": "#fff",
  };

  return (
    <Script
      src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (window.kofiWidgetOverlay) {
          window.kofiWidgetOverlay.draw("ysuleyman", options);
        }
      }}
    />
  );
}
