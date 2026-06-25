export function RoleTicker() {
  const heroRoles = [
    "Visual Designer",
    "Creative Brand Designer",
    "Campaign Designer",
    "UI Visual Designer",
    "Motion & Video Creative",
  ];
  const text = heroRoles.join(" / ");
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
