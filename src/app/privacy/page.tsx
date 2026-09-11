import type { Metadata } from "next";

import { PlatformAccentBar } from "@/components/platform-accent-bar";
import { PlatformSectionHeader } from "@/components/platform-section-header";

export const metadata: Metadata = {
  title: "Privacy Policy — Simpnify",
  description:
    "Privacy Policy for Mobile Simple Unified Platform (MSUP) — how Simpnify collects, uses and retains information.",
};

const bodyClass = "mt-3 text-base leading-7 text-platform-muted";
const listClass = "mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-platform-muted";
const headingClass = "mt-10 text-xl font-semibold text-white";

export default function PrivacyPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[var(--platform-surface)] pt-16"
    >
      <section className="border-b border-white/10 px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-7">
            <PlatformAccentBar />
            <PlatformSectionHeader
              eyebrow="LEGAL"
              title="Privacy Policy for Mobile Simple Unified Platform"
              description="Effective Date: 2025-05-05"
              titleAs="h1"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-16 md:py-16">
        <article className="mx-auto max-w-3xl pb-8">
          <p className="text-base leading-7 text-platform-muted">
            Simpnify (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is
            committed to protecting your privacy. This Privacy Policy describes
            how your information is collected, used, and retained when using the
            Mobile Simple Unified Platform (the “App”), available on the Google
            Play Store.
          </p>

          <h2 className={headingClass}>1. Information We Collect</h2>
          <p className={bodyClass}>
            The App collects only limited technical and operational data
            necessary to perform its intended functions. Specifically:
          </p>
          <ul className={listClass}>
            <li>
              <span className="font-semibold text-white">
                Location Information:
              </span>{" "}
              Collected only when a user handles an alarm. This location is
              logged to associate the event with the user&apos;s physical
              position for operational traceability.
            </li>
            <li>
              <span className="font-semibold text-white">
                Device and Network Information:
              </span>{" "}
              Such as IP address, device model, OS, and network type, to enable
              secure connectivity with the Simple Unified Platform core server.
            </li>
          </ul>
          <p className={`${bodyClass} border-l-2 border-secondary/40 pl-4`}>
            Note: No personal information (e.g., names, email addresses,
            contacts) is collected or stored by the App itself. All user
            identities and permissions are managed by your organization&apos;s
            Simple Unified Platform core server.
          </p>

          <h2 className={headingClass}>2. How We Use Your Information</h2>
          <ul className={listClass}>
            <li>
              Facilitating secure communication between the App and the core
              server within the same network or over VPN.
            </li>
            <li>
              Logging alarm handling events (with associated location) for
              system auditing and operational accuracy.
            </li>
            <li>
              Diagnosing technical issues and improving system performance.
            </li>
          </ul>

          <h2 className={headingClass}>3. Data Retention Policy</h2>
          <ul className={listClass}>
            <li>
              <span className="font-semibold text-white">Location Data:</span>{" "}
              Retained only when a user handles an alarm. Stored as part of the
              event log on the core server, controlled by your organization.
            </li>
            <li>
              <span className="font-semibold text-white">
                Device/Network Data:
              </span>{" "}
              Used transiently during app sessions; not stored persistently on
              the device or transmitted beyond the intended secure connection.
            </li>
            <li>
              <span className="font-semibold text-white">User Accounts:</span>{" "}
              The App does not manage or retain user account data.
              Authentication and identity management are performed entirely on
              the core server.
            </li>
          </ul>

          <h2 className={headingClass}>4. Data Sharing and Disclosure</h2>
          <p className={bodyClass}>
            We do not sell, rent, or share your data with third parties. All
            data remains within your organization’s secure infrastructure and is
            only exchanged between the App and the Simple Unified Platform core
            server.
          </p>

          <h2 className={headingClass}>5. Data Security</h2>
          <p className={bodyClass}>
            We employ industry-standard encryption and secure communication
            protocols. Any data logged or transmitted is secured and kept within
            your organization&apos;s private network or VPN.
          </p>

          <h2 className={headingClass}>6. Your Choices</h2>
          <p className={bodyClass}>
            <span className="font-semibold text-white">Location Access:</span>{" "}
            You may disable location services via device settings. However, this
            will limit the App&apos;s ability to log alarm event locations,
            which may affect functionality or compliance depending on
            organizational policy.
          </p>

          <h2 className={headingClass}>7. Children’s Privacy</h2>
          <p className={bodyClass}>
            This App is not designed for or intended to be used by individuals
            under the age of 13. We do not knowingly collect any data from
            children.
          </p>

          <h2 className={headingClass}>8. Changes to This Policy</h2>
          <p className={bodyClass}>
            We may update this Privacy Policy from time to time. All changes
            will be posted at{" "}
            <a
              href="https://www.simpnify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline-offset-4 transition hover:underline"
            >
              https://www.simpnify.com
            </a>
            , and continued use of the App constitutes acceptance of the updated
            policy.
          </p>

          <h2 className={headingClass}>9. Camera and Microphone Access</h2>
          <p className={bodyClass}>
            The App may request access to your device’s camera and microphone
            for operational purposes, including:
          </p>
          <ul className={listClass}>
            <li>
              Conducting video calls between users within the organization
            </li>
            <li>
              Capturing photos or videos for event documentation during alarm
              handling or reporting
            </li>
          </ul>
          <p className={bodyClass}>
            Audio and video data is transmitted securely to your
            organization&apos;s core server and is not accessible by Simpnify or
            shared with any third party. All captured content remains within
            your organization’s secure infrastructure.
          </p>
          <p className={bodyClass}>
            Camera and microphone access can be managed via your device’s
            permission settings. Disabling access may prevent use of certain
            features like video calls or documentation capture.
          </p>
        </article>
      </section>
    </main>
  );
}
