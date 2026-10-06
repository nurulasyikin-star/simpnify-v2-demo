import type { Metadata } from "next";
import Link from "next/link";

import {
  SotiMobileVariant,
  sotiMobileVariants,
  type SotiMobileVariantId,
} from "@/components/soti-mobile-variants";

export const metadata: Metadata = {
  title: "SOTI mobile report",
  description:
    "Report for William on which SOTI ideas fit the Simpnify mobile app, with the badge lock screen and React Native field shell.",
  robots: { index: false, follow: false },
};

const selectedFigures: { id: SotiMobileVariantId; figure: string }[] = [
  { id: "nfc-lock", figure: "Figure 1" },
  { id: "native-shell", figure: "Figure 2" },
];

export default function SotiMobilePhotosPage() {
  return (
    <main
      id="main-content"
      className="flex-1 bg-[var(--platform-surface)] px-4 pb-20 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Report for William Mah
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            SOTI ideas for the mobile app
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-platform-muted">
            Selected images: B, the badge lock screen, and E, the React Native
            field shell. Study of{" "}
            <a
              href="https://soti.net/"
              className="text-secondary hover:underline"
            >
              soti.net
            </a>{" "}
            against the live field app.
          </p>
        </header>

        <article className="mb-12 rounded-2xl border border-white/10 bg-[#0a1218] px-6 py-6 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Report text
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            What from SOTI fits our mobile app
          </h2>
          <p className="mt-2 text-sm text-platform-muted">
            1 October 2026 · Mobile team · For William Mah
          </p>

          <div className="mt-6 space-y-4 text-sm leading-7 text-[#c5d0d6]">
            <p>
              William asked us to look at SOTI because their product controls
              login and content on corporate phones. The behaviour he described
              is real:{" "}
              <a
                className="text-secondary hover:underline"
                href="https://soti.net/mc/help/v2025.1/en/console/reference/dialogs/profiles/androidplus/profile_kioskmode_androidplus.html"
              >
                Lockdown
              </a>{" "}
              replaces the phone’s home screen with a custom one, and{" "}
              <a
                className="text-secondary hover:underline"
                href="https://soti.net/sotiidentity/help/en/users/using_nfc_tags_for_shared_device_authentication_in_soti_mobicontrol.html"
              >
                NFC badge login
              </a>{" "}
              lets an officer tap a card instead of typing a password before
              that screen opens. After that, the person only sees the apps the
              policy allows.{" "}
              <a
                className="text-secondary hover:underline"
                href="https://soti.net/mc/help/v2024.1/en/console/users/con_configuring_lockdown_for_shared_devices.html"
              >
                Shared devices
              </a>{" "}
              use one lock screen, then a different set of apps per person,
              plus a logout.
            </p>
            <p>
              SOTI MobiControl is device management for a fleet. It enrolls
              phones, pushes apps, and can lock the operating system. Our
              mobile app is the field workspace on top of that kind of phone:
              Today, Work, Inbox, Comms, and SOS. It already limits tools by
              role. Administration stays on the web console.
            </p>
            <p>What we saw on the live phone workspace:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Sign-in is username and password. One mobile session at a time.</li>
              <li>
                Today shows shift status, live location, and counts for
                guidance, patrols, briefings, and inbox.
              </li>
              <li>
                Work lists the tools the role is allowed to open: emergency
                accountability, guidance, reports, briefings, patrols,
                lone-worker safety, shift handover, equipment, field assets,
                field assistant, and mobile supervisor.
              </li>
              <li>Comms is messages and calls. SOS sends live position on a hold.</li>
              <li>
                It is still a browser app: desktop widths are blocked, and the
                phone UI offers Install.
              </li>
            </ul>
          </div>

          <h3 className="mt-8 text-lg font-semibold text-white">
            Suitable for the React Native app
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm text-[#c5d0d6]">
              <thead className="text-xs uppercase tracking-wider text-platform-subtle">
                <tr className="border-b border-white/10">
                  <th className="py-2 pr-4 font-semibold">SOTI idea</th>
                  <th className="py-2 pr-4 font-semibold">Where it belongs</th>
                  <th className="py-2 font-semibold">What we take</th>
                </tr>
              </thead>
              <tbody className="[&_td]:border-b [&_td]:border-white/10 [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top">
                <tr>
                  <td>NFC badge at the lock screen</td>
                  <td>Inside our app</td>
                  <td>
                    Start and end the shift with a badge tap. Keep password as
                    the fallback. One session, same as today.
                  </td>
                </tr>
                <tr>
                  <td>Only the intended apps after unlock</td>
                  <td>Inside our app</td>
                  <td>
                    The home screen is the role’s tools: Today, guidance,
                    patrols, comms, SOS. The web console never appears on the
                    phone.
                  </td>
                </tr>
                <tr>
                  <td>Shared device, then logout</td>
                  <td>Inside our app</td>
                  <td>
                    End shift clears inbox, live location, and SOS, then returns
                    to the badge screen. Shift Handover still carries the
                    operational note to the next officer.
                  </td>
                </tr>
                <tr>
                  <td>Full phone lockdown</td>
                  <td>MDM around the app</td>
                  <td>
                    Enroll corporate handphones and pin the native app as the
                    kiosk. Android will not let our app hide Settings by itself.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-8 text-lg font-semibold text-white">
            Leave these on the device-management side
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[#c5d0d6]">
            <li>
              Fleet enrollment, OS and firmware updates, printer management,
              and remote screen viewing (SOTI XSight). Those are IT console
              jobs.
            </li>
            <li>
              SOTI Snap and SOTI Stella. Guidance, reports, and Field Assistant
              already cover forms and questions inside our app.
            </li>
            <li>
              Geofences that install or remove apps. Live location stays a
              safety signal for SOS and the Today status, not a way to push
              software.
            </li>
          </ul>

          <h3 className="mt-8 text-lg font-semibold text-white">
            Recommendation
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#c5d0d6]">
            Move the field workspace from the PWA to React Native, and design
            it as the only thing on a corporate handphone. The app owns badge
            login, the role home, and end-of-shift wipe. A device-management
            product such as SOTI owns locking the rest of the phone. Figure 1
            is the lock screen before the badge tap. Figure 2 is the screen we
            would ship after that tap: today’s Today workspace, in a native
            shell, with the badge session shown.
          </p>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {selectedFigures.map(({ id, figure }) => {
              const variant = sotiMobileVariants.find((item) => item.id === id);
              if (!variant) return null;
              return (
                <figure key={id} id={id} className="scroll-mt-24">
                  <figcaption className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                      {figure} · {variant.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-platform-muted">
                      {variant.caption}
                    </p>
                  </figcaption>
                  <div className="flex justify-center rounded-2xl bg-[#050b10] px-4 py-8">
                    <SotiMobileVariant id={id} />
                  </div>
                </figure>
              );
            })}
          </div>
        </article>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/soti-mobile
          </code>
          . These two figures are the ones for William.{" "}
          <Link href="/photos" className="text-secondary hover:underline">
            Other reviews
          </Link>
        </p>
      </div>
    </main>
  );
}
