import { Banner } from "announcement-banner/banner";
import { BannerConfig } from "announcement-banner/banner-config";
import React from "react";

export function BannerSnippet({
  config,
  inline,
}: {
  config: BannerConfig;
  inline: boolean;
}) {
  return inline ? (
    <Banner config={config} />
  ) : (
    <BannerSnippetHead config={config} />
  );
}

function BannerSnippetHead({ config }: { config: BannerConfig }) {
  return (
    <>
      <template id="tally-banner-template">
        <Banner config={config} />
      </template>
      <script
        dangerouslySetInnerHTML={{
          __html: loadScript,
        }}
      ></script>
    </>
  );
}

const loadScript = `window.addEventListener('load',()=>{var d=document;d.body.prepend(d.importNode(d.getElementById('tally-banner-template').content,true))})`;
