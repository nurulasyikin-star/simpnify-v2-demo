import { DIGITAL_TWIN_FEATURE, USER_CONFIGURABLE_SOP } from "@/lib/platform";

import { PlatformImageFeature } from "./platform-image-feature";

export function PlatformSopDigitalTwin() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl space-y-16 md:space-y-20">
        <PlatformImageFeature feature={USER_CONFIGURABLE_SOP} />
        <PlatformImageFeature feature={DIGITAL_TWIN_FEATURE} reverse />
      </div>
    </section>
  );
}
