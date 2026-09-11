type OfficeContact = {
  country: string;
  address: string;
  phones: string[];
  fax?: string;
};

const EMAIL = "enquiry@simpnify.com";

const OFFICES: OfficeContact[] = [
  {
    country: "Malaysia",
    address:
      "No 2, Jalan Laman Setia 7/6, Setia Business Park 81550 Gelang Patah, Johor, Malaysia",
    phones: ["+607 5950 387"],
    fax: "+607 5950 397",
  },
  {
    country: "Singapore",
    address:
      "55 Toh Guan Road East, #06-01 Uni-Tech Centre, 608601 Singapore",
    phones: ["+65 6022 1861", "+65 6680 9321"],
    fax: "+65 6698 7326",
  },
  {
    country: "UAE",
    address:
      "CPM-01B4-MF-M015, Cubes Park B4, Musaffah M25, Abu Dhabi, United Arab Emirates",
    phones: ["+971 566112980"],
  },
  {
    country: "Vietnam",
    address:
      "8bis Hoang Hoa Tham Street, Ward 7, Binh Thanh District, Ho Chi Minh City, Vietnam",
    phones: ["+84 98 383 13 68"],
  },
];

function toTelHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

function OfficeCard({ office }: { office: OfficeContact }) {
  return (
    <article className="platform-hub-card h-full">
      <div>
        <h2 className="text-lg font-semibold text-secondary">{office.country}</h2>
        <p className="mt-1 text-sm text-platform-muted">{office.phones[0]}</p>
      </div>

      <div className="mt-5 flex-1 space-y-2.5 border-t border-white/10 pt-5 text-sm leading-relaxed text-platform-muted">
        <p>{office.address}</p>
        <p>
          <a
            href={`mailto:${EMAIL}`}
            className="text-secondary underline decoration-secondary/40 underline-offset-4 transition hover:decoration-secondary"
          >
            {EMAIL}
          </a>
        </p>
        {office.phones.map((phone) => (
          <p key={phone}>
            Tel.{" "}
            <a
              href={toTelHref(phone)}
              className="text-white transition hover:text-secondary"
            >
              {phone}
            </a>
          </p>
        ))}
        {office.fax ? (
          <p className="text-platform-subtle">Fax {office.fax}</p>
        ) : null}
      </div>
    </article>
  );
}

export function ContactOffices() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
      {OFFICES.map((office) => (
        <OfficeCard key={office.country} office={office} />
      ))}
    </div>
  );
}
