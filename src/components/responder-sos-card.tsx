import { SosSignalField } from "@/components/sos-signal-field";
import { publicAsset } from "@/lib/site-path";

/** Responder SOS card: signal field behind the recording, title at the top left. */
export function ResponderSosCard({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-black">
      <div className="relative isolate flex min-h-[calc(100svh-14rem)] items-center justify-center">
        <SosSignalField />
        <div className="absolute left-6 top-5 z-20">
          <p className="text-sm font-semibold text-secondary">{number}</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">{title}</h3>
        </div>
        <video
          src={publicAsset("/platform/scenarios/final-SOS.mp4")}
          className="relative z-10 mx-auto block h-auto max-h-[calc(100svh-18rem)] w-auto max-w-[88%] object-contain shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="auto"
          aria-label="Responder SOS. A field officer is hurt. Help starts with SOS."
        />
      </div>
    </article>
  );
}
