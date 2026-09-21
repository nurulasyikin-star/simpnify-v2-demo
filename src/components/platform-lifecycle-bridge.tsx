import { HELP_MARKETING_LIFECYCLE } from "@/lib/platform/client-story";

import { PlatformSectionHeader } from "./platform-section-header";

export function PlatformLifecycleBridge() {
  return (
    <section
      id="lifecycle-bridge"
      className="border-t border-white/10 bg-[#0a0a0c] px-6 py-12 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="ONE VOCABULARY"
          title="Marketing story ↔ product console"
          description="What prospects read on the website is what operators run in the console — aligned with the Help Center incident model."
        />

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-platform-subtle">
                <th className="pb-3 pr-4 font-semibold uppercase tracking-wider">
                  Website lifecycle
                </th>
                <th className="pb-3 pr-4 font-semibold uppercase tracking-wider">
                  Help / console
                </th>
                <th className="pb-3 font-semibold uppercase tracking-wider">
                  Meaning
                </th>
              </tr>
            </thead>
            <tbody>
              {HELP_MARKETING_LIFECYCLE.map(
                ({ marketing, help, note }) => (
                  <tr
                    key={marketing}
                    className="border-b border-white/5 text-platform-muted"
                  >
                    <td className="py-3 pr-4 font-medium text-secondary">
                      {marketing}
                    </td>
                    <td className="py-3 pr-4 font-medium text-white/90">
                      {help}
                    </td>
                    <td className="py-3 leading-6">{note}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
