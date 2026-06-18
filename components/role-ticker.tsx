import { profile } from "@/lib/portfolio-data";

export function RoleTicker() {
  const text = profile.roles.join(" / ");
  const items = Array.from({ length: 8 }, (_, index) => `${text}${index === 7 ? "" : " /"}`);

  return (
    <div className="role-ticker" aria-hidden="true">
      <div className="role-ticker-track">
        {[0, 1].map((group) => (
          <div key={group} className="role-ticker-group">
            {items.map((item, index) => (
              <span key={`${group}-${index}`}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
