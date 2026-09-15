/* =============================================================
   QUINTOOLS — PROJECTS
   -------------------------------------------------------------
   This is the ONLY file you need to edit to add a new tool.
   Copy one block below, paste it at the top of the list, and
   fill in your details. The site rebuilds the cards + filters
   automatically. Save, commit, push — done.

   Each project supports these fields:
     title       (required)  Name shown on the card.
     description (required)  One or two sentences.
     category    (required)  Groups the card + creates a filter
                             chip. Reuse the same spelling to
                             group tools together (e.g. "GTA V",
                             "Security"). See CATEGORIES below to
                             give a category its own accent color.
     status      "live" | "wip" | "planned"   (default: "live")
     url         (optional)  Link the "Open" button points to.
                             Omit it for tools that aren't public
                             yet — the button becomes disabled.
     repo        (optional)  Link to the source code (GitHub).
     icon        (optional)  An emoji shown in the card badge.
     tags        (optional)  Array of small labels, e.g.
                             ["Python", "CLI"].
     featured    (optional)  true = card spans wider + glows.
   ============================================================= */

const PROJECTS = [
  {
    title: "GTA V Money Helper",
    description:
      "A companion that maps out the most efficient money-making routes in GTA Online — heists, cargo cycles, and daily payouts ranked by $/hour so you never grind blind.",
    category: "GTA V",
    status: "wip",
    url: "",
    repo: "",
    icon: "💰",
    tags: ["Web", "Optimizer", "Guide"],
    featured: true,
  },
  {
    title: "Recon Toolkit",
    description:
      "A collection of scripts for authorized reconnaissance and enumeration — turning noisy manual steps into one clean, repeatable workflow.",
    category: "Security",
    status: "planned",
    url: "",
    repo: "",
    icon: "🛡️",
    tags: ["Python", "CLI", "Pentest"],
  },
  {
    title: "Payload Playground",
    description:
      "A sandbox for testing and understanding common web vulnerabilities in a safe, self-hosted lab. For learning and defensive research.",
    category: "Security",
    status: "planned",
    url: "",
    repo: "",
    icon: "🧪",
    tags: ["Lab", "Web", "Research"],
  },
];

/* -------------------------------------------------------------
   CATEGORIES (optional)
   Give a category its own accent color + emoji. Any category not
   listed here still works — it just uses the default accent.
   ------------------------------------------------------------- */
const CATEGORIES = {
  "GTA V":     { color: "#f5a623", icon: "🎮" },
  "Security":  { color: "#3ddc97", icon: "🔒" },
  // "Web Apps": { color: "#7aa2ff", icon: "🌐" },
};
