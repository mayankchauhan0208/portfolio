"use client";

import { type ChangeEvent, type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Eye, EyeOff, LockKeyhole, PencilLine, ShieldCheck } from "lucide-react";

type GitHubFile = {
  path: string;
  content: string;
  sha: string | null;
};

type Status = {
  type: "idle" | "success" | "error" | "info";
  message: string;
};

type SiteProfile = {
  name: string;
  roles: string[];
  location: string;
  phone: string;
  email: string;
  behance: string;
  resume: string;
  intro: string;
  positioning: string;
  aboutHeading: string;
  aboutSnapshot: string;
  aboutSnapshotBody: string;
  aboutParagraphs: string[];
  aboutCoreExpertise: string[];
};

type SiteContent = {
  profile: SiteProfile;
};

const repoOwner = "mayankchauhan0208";
const repoName = "portfolio";
const defaultBranch = "main";
const defaultPassword = "admin123";
const passwordStorageKey = "portfolio-admin-password-hash";
const authStorageKey = "portfolio-admin-authenticated";
const tokenStorageKey = "portfolio-admin-github-token";
const persistentTokenStorageKey = "portfolio-admin-remembered-github-token";
const encryptedTokenStorageKey = "portfolio-admin-encrypted-github-token";
const tokenSaltStorageKey = "portfolio-admin-token-salt";

const editableFiles = [
  {
    label: "Homepage, About & Contact",
    path: "content/site.json",
    help: "No-code fields for hero text, role ticker, About copy, contact details, social link, and resume path."
  },
  {
    label: "Main portfolio content",
    path: "lib/portfolio-data.ts",
    help: "Hero roles, work categories, projects, case-study fields, experience, skills, contact details, resume path, and media references."
  },
  {
    label: "SEO metadata",
    path: "app/layout.tsx",
    help: "Site title, description, Open Graph, Twitter metadata, and social preview image."
  },
  {
    label: "Homepage layout/content wiring",
    path: "app/page.tsx",
    help: "Homepage section wiring, CTA labels, and content rendering."
  },
  {
    label: "Work library page",
    path: "app/work/page.tsx",
    help: "Work category index and selected-work entry flow."
  },
  {
    label: "Work category page",
    path: "app/work/[category]/page.tsx",
    help: "Case-study blocks, gallery rendering, image preview source selection, and video preview wiring."
  },
  {
    label: "Media path helpers",
    path: "lib/site-paths.ts",
    help: "Optimized thumbnail and original media path behavior."
  }
];

const editorSections = [
  {
    title: "Homepage",
    description: "Edit hero text and role ticker with simple labeled fields.",
    paths: ["content/site.json"]
  },
  {
    title: "About & Contact",
    description: "Edit About copy, expertise, email, phone, Behance, and resume path without code.",
    paths: ["content/site.json"]
  },
  {
    title: "Work & Projects",
    description: "Work categories, project lists, descriptions, order, published/draft style fields, and media references.",
    paths: ["lib/portfolio-data.ts", "app/work/page.tsx", "app/work/[category]/page.tsx"]
  },
  {
    title: "Case Studies",
    description: "Case-study overview, challenge, role, direction, deliverables, tools, and outcomes for category pages.",
    paths: ["lib/portfolio-data.ts", "app/work/[category]/page.tsx"]
  },
  {
    title: "Media Paths",
    description: "Optimized thumbnails, original images, video posters, original videos, and path fallback behavior.",
    paths: ["lib/portfolio-data.ts", "lib/site-paths.ts"]
  },
  {
    title: "SEO",
    description: "Browser title, meta description, Open Graph, Twitter card, social preview image, and portfolio keywords.",
    paths: ["app/layout.tsx"]
  },
  {
    title: "Advanced Layout",
    description: "Developer-only source files. Use these only when a normal form cannot make the change.",
    paths: ["app/page.tsx", "app/work/page.tsx", "app/work/[category]/page.tsx"]
  }
];

const approvedWritePaths = [
  "content/site.json",
  "lib/portfolio-data.ts",
  "app/layout.tsx",
  "app/page.tsx",
  "app/work/page.tsx",
  "app/work/[category]/page.tsx",
  "lib/site-paths.ts"
];

const approvedMediaPrefixes = [
  "public/images/",
  "public/optimized-images/",
  "public/optimized/",
  "public/videos/",
  "public/video-thumbnails/",
  "public/work/",
  "public/resume/"
];

const mediaFolders = [
  { label: "Original image", value: "public/images/" },
  { label: "Optimized gallery image", value: "public/optimized-images/" },
  { label: "Original video", value: "public/videos/" },
  { label: "Video poster", value: "public/video-thumbnails/" },
  { label: "Resume PDF", value: "public/resume/" }
];

function isApprovedFile(path: string) {
  return approvedWritePaths.includes(path);
}

function isApprovedMediaPath(path: string) {
  const normalized = normalizeRepoPath(path);
  return (
    !normalized.includes("..") &&
    approvedMediaPrefixes.some((prefix) => normalized.startsWith(prefix)) &&
    !normalized.endsWith("/")
  );
}

function normalizeRepoPath(path: string) {
  return path.replace(/^\/+/, "").replace(/\\/g, "/").trim();
}

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToBytes(value: string) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function getTokenSalt() {
  const savedSalt = localStorage.getItem(tokenSaltStorageKey);
  if (savedSalt) {
    return base64ToBytes(savedSalt);
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  localStorage.setItem(tokenSaltStorageKey, bytesToBase64(salt));
  return salt;
}

async function deriveTokenEncryptionKey(password: string) {
  const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: getTokenSalt(), iterations: 250000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptRememberedToken(token: string, key: CryptoKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(token));
  localStorage.setItem(
    encryptedTokenStorageKey,
    JSON.stringify({ iv: bytesToBase64(iv), value: bytesToBase64(new Uint8Array(encrypted)) })
  );
  localStorage.removeItem(persistentTokenStorageKey);
}

async function decryptRememberedToken(key: CryptoKey) {
  const savedValue = localStorage.getItem(encryptedTokenStorageKey);
  if (!savedValue) {
    return "";
  }

  const payload = JSON.parse(savedValue) as { iv: string; value: string };
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64ToBytes(payload.iv) },
    key,
    base64ToBytes(payload.value)
  );
  return new TextDecoder().decode(decrypted);
}

function encodeBase64(value: string) {
  return btoa(unescape(encodeURIComponent(value)));
}

function decodeBase64(value: string) {
  return decodeURIComponent(escape(atob(value.replace(/\n/g, ""))));
}

function validateSiteContent(value: string) {
  const content = JSON.parse(value) as Partial<SiteContent>;
  const profile = content.profile;

  if (!profile?.name?.trim() || !profile.email?.includes("@") || !profile.roles?.filter(Boolean).length) {
    throw new Error("Name, a valid email, and at least one role are required.");
  }

  if (!profile.resume?.startsWith("/")) {
    throw new Error("Resume path must start with /, for example /Mayank-Chauhan-Resume.pdf.");
  }
}

async function fileToBase64(file: File) {
  const buffer = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);

  for (let index = 0; index < bytes.byteLength; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return btoa(binary);
}

function githubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28"
  };
}

function contentUrl(path: string) {
  return `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`;
}

async function fetchGithubFile(path: string, token: string): Promise<GitHubFile> {
  const response = await fetch(`${contentUrl(path)}?ref=${defaultBranch}`, {
    headers: githubHeaders(token)
  });

  if (!response.ok) {
    throw new Error(`Could not load ${path}. GitHub returned ${response.status}.`);
  }

  const payload = await response.json();

  return {
    path,
    content: decodeBase64(payload.content),
    sha: payload.sha
  };
}

async function fetchGithubSha(path: string, token: string) {
  const response = await fetch(`${contentUrl(path)}?ref=${defaultBranch}`, {
    headers: githubHeaders(token)
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Could not check ${path}. GitHub returned ${response.status}.`);
  }

  const payload = await response.json();
  return payload.sha as string;
}

async function commitGithubFile(path: string, token: string, content: string, sha: string | null, message: string) {
  const response = await fetch(contentUrl(path), {
    method: "PUT",
    headers: {
      ...githubHeaders(token),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      content: encodeBase64(content),
      sha: sha ?? undefined,
      branch: defaultBranch
    })
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message ?? `GitHub returned ${response.status}.`);
  }

  return response.json();
}

async function commitGithubBase64(path: string, token: string, content: string, sha: string | null, message: string) {
  const response = await fetch(contentUrl(path), {
    method: "PUT",
    headers: {
      ...githubHeaders(token),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      content,
      sha: sha ?? undefined,
      branch: defaultBranch
    })
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message ?? `GitHub returned ${response.status}.`);
  }

  return response.json();
}

export function AdminClient() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [rememberToken, setRememberToken] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [tokenEncryptionKey, setTokenEncryptionKey] = useState<CryptoKey | null>(null);
  const [hasCustomPassword, setHasCustomPassword] = useState(false);
  const [tokenStepComplete, setTokenStepComplete] = useState(false);
  const [selectedPath, setSelectedPath] = useState(editableFiles[0].path);
  const [loadedFile, setLoadedFile] = useState<GitHubFile | null>(null);
  const [draft, setDraft] = useState("");
  const [commitMessage, setCommitMessage] = useState("content: update portfolio from admin");
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [mediaFolder, setMediaFolder] = useState(mediaFolders[0].value);
  const [mediaPath, setMediaPath] = useState("public/images/");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaMessage, setMediaMessage] = useState("media: upload portfolio asset");
  const activeFile = useMemo(() => editableFiles.find((file) => file.path === selectedPath), [selectedPath]);

  useEffect(() => {
    sessionStorage.removeItem(authStorageKey);
    sessionStorage.removeItem(tokenStorageKey);
    localStorage.removeItem(persistentTokenStorageKey);
    setAuthenticated(false);
    setToken("");
    setRememberToken(Boolean(localStorage.getItem(encryptedTokenStorageKey)));
    setTokenStepComplete(false);
    setHasCustomPassword(Boolean(localStorage.getItem(passwordStorageKey)));

    setReady(true);
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const savedHash = localStorage.getItem(passwordStorageKey) ?? (await sha256(defaultPassword));
    const inputHash = await sha256(password);

    if (inputHash !== savedHash) {
      setStatus({ type: "error", message: "Incorrect admin password." });
      return;
    }

    const encryptionKey = await deriveTokenEncryptionKey(password);
    let rememberedToken = "";
    let tokenUnlockFailed = false;

    try {
      rememberedToken = await decryptRememberedToken(encryptionKey);
    } catch {
      tokenUnlockFailed = true;
      localStorage.removeItem(encryptedTokenStorageKey);
    }

    sessionStorage.setItem(authStorageKey, "true");
    if (rememberedToken) {
      sessionStorage.setItem(tokenStorageKey, rememberedToken);
    }
    setTokenEncryptionKey(encryptionKey);
    setToken(rememberedToken);
    setRememberToken(Boolean(rememberedToken));
    setTokenStepComplete(Boolean(rememberedToken));
    setAuthenticated(true);
    setPassword("");
    setStatus(
      tokenUnlockFailed
        ? { type: "error", message: "Admin unlocked, but the saved GitHub key could not be decrypted. Connect the key again." }
        : { type: "success", message: rememberedToken ? "Admin unlocked and the saved GitHub key was decrypted." : "Admin unlocked for this browser session." }
    );
  }

  async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword.trim().length < 6) {
      setStatus({ type: "error", message: "Use at least 6 characters for the local admin password." });
      return;
    }

    const nextPassword = newPassword.trim();
    const nextKey = await deriveTokenEncryptionKey(nextPassword);
    if (rememberToken && token) {
      await encryptRememberedToken(token, nextKey);
    }
    localStorage.setItem(passwordStorageKey, await sha256(nextPassword));
    setTokenEncryptionKey(nextKey);
    setHasCustomPassword(true);
    setNewPassword("");
    setStatus({ type: "success", message: "Local admin password changed on this browser." });
  }

  function handleSaveToken(value: string) {
    setToken(value.trim());
  }

  async function handleRememberToken(checked: boolean) {
    if (checked && !hasCustomPassword) {
      setRememberToken(false);
      setStatus({ type: "error", message: "Use the token for this session, then set a private admin password before enabling device memory." });
      return;
    }

    setRememberToken(checked);

    if (checked && token && tokenEncryptionKey) {
      await encryptRememberedToken(token, tokenEncryptionKey);
      setStatus({ type: "success", message: "Token encrypted with your admin password on this device." });
      return;
    }

    localStorage.removeItem(encryptedTokenStorageKey);
    localStorage.removeItem(persistentTokenStorageKey);
    setStatus({ type: "info", message: "Token will only stay for this browser tab session." });
  }

  function clearToken() {
    setToken("");
    setRememberToken(false);
    setTokenStepComplete(false);
    sessionStorage.removeItem(tokenStorageKey);
    localStorage.removeItem(encryptedTokenStorageKey);
    localStorage.removeItem(persistentTokenStorageKey);
    setStatus({ type: "info", message: "GitHub token removed from this browser." });
  }

  async function continueWithToken() {
    if (!token) {
      setStatus({ type: "error", message: "Paste your GitHub token before continuing." });
      return;
    }

    if (rememberToken && !hasCustomPassword) {
      setStatus({ type: "error", message: "Set a private admin password before saving the token on this device." });
      return;
    }

    sessionStorage.setItem(tokenStorageKey, token);
    if (rememberToken && tokenEncryptionKey) {
      await encryptRememberedToken(token, tokenEncryptionKey);
    }
    setTokenStepComplete(true);
    setStatus({ type: "success", message: "GitHub key connected. Choose a section to edit." });
  }

  function selectAdminFile(path: string) {
    setSelectedPath(path);
    setLoadedFile(null);
    setDraft("");
    setCommitMessage(
      path === "content/site.json"
        ? "content: update homepage details"
        : path === "lib/portfolio-data.ts"
          ? "content: update portfolio content"
          : "fix: update portfolio admin content"
    );
  }

  async function handleLoadFile() {
    if (!token) {
      setStatus({ type: "error", message: "Enter a GitHub fine-grained token first." });
      return;
    }

    if (!isApprovedFile(selectedPath)) {
      setStatus({ type: "error", message: "This file is not approved for admin editing." });
      return;
    }

    try {
      setStatus({ type: "info", message: `Loading ${selectedPath} from GitHub...` });
      const file = await fetchGithubFile(selectedPath, token);
      setLoadedFile(file);
      setDraft(file.content);
      setStatus({ type: "success", message: `${selectedPath} loaded from GitHub.` });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Could not load file." });
    }
  }

  async function handleCommitFile() {
    if (!token || !loadedFile) {
      setStatus({ type: "error", message: "Load a file from GitHub before committing." });
      return;
    }

    if (!isApprovedFile(loadedFile.path)) {
      setStatus({ type: "error", message: "This file is not approved for admin editing." });
      return;
    }

    if (!commitMessage.trim()) {
      setStatus({ type: "error", message: "Add a commit message." });
      return;
    }

    if (loadedFile.path === "content/site.json") {
      try {
        validateSiteContent(draft);
      } catch (error) {
        setStatus({ type: "error", message: error instanceof Error ? error.message : "Check the form fields before publishing." });
        return;
      }
    }

    if (!window.confirm(`Commit changes to ${loadedFile.path}? This will trigger the live deployment workflow.`)) {
      return;
    }

    try {
      setStatus({ type: "info", message: `Committing ${loadedFile.path}...` });
      await commitGithubFile(loadedFile.path, token, draft, loadedFile.sha, commitMessage.trim());
      const refreshed = await fetchGithubFile(loadedFile.path, token);
      setLoadedFile(refreshed);
      setDraft(refreshed.content);
      setStatus({ type: "success", message: "Committed to GitHub. The existing Pages deployment should start shortly." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Could not commit file." });
    }
  }

  async function handleUploadMedia() {
    const normalizedPath = normalizeRepoPath(mediaPath);

    if (!token) {
      setStatus({ type: "error", message: "Enter a GitHub fine-grained token first." });
      return;
    }

    if (!mediaFile) {
      setStatus({ type: "error", message: "Choose a media file to upload." });
      return;
    }

    if (!isApprovedMediaPath(normalizedPath)) {
      setStatus({ type: "error", message: "Media path must stay inside an approved public media folder." });
      return;
    }

    if (!window.confirm(`Upload ${mediaFile.name} to ${normalizedPath}? Existing files at that path may be replaced.`)) {
      return;
    }

    try {
      setStatus({ type: "info", message: `Uploading ${normalizedPath}...` });
      const existingSha = await fetchGithubSha(normalizedPath, token);
      const encoded = await fileToBase64(mediaFile);
      await commitGithubBase64(normalizedPath, token, encoded, existingSha, mediaMessage.trim() || "media: upload portfolio asset");
      setStatus({ type: "success", message: "Media committed to GitHub. Update the media path in content where needed." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Could not upload media." });
    }
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setMediaFile(file);

    if (file) {
      setMediaPath(`${mediaFolder}${file.name.replace(/\s+/g, "-")}`);
    }
  }

  if (!ready) {
    return null;
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-obsidian px-4 py-10 text-platinum">
        <section className="mx-auto grid min-h-[80vh] max-w-xl place-items-center">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-luxury backdrop-blur-xl sm:p-8">
            <StepPill current={1} />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-signal">Portfolio Admin</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-white">Enter admin password</h1>
            <p className="mt-4 text-sm leading-6 text-mercury">
              First unlock the admin panel. This password is a basic browser gate; GitHub token permissions are the real security.
            </p>
            <form onSubmit={handleLogin} className="mt-6 grid gap-3">
              <label className="grid gap-2 text-sm text-white/80">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-signal"
                  placeholder="Default: admin123"
                />
              </label>
              <button type="submit" className="min-h-12 rounded-full bg-white px-5 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-signal">
                Next
              </button>
            </form>
            <StatusMessage status={status} />
          </div>
        </section>
      </main>
    );
  }

  if (!tokenStepComplete) {
    return (
      <main className="min-h-screen bg-obsidian px-4 py-10 text-platinum">
        <section className="mx-auto grid min-h-[80vh] max-w-2xl place-items-center">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-luxury backdrop-blur-xl sm:p-8">
            <StepPill current={2} />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-signal">GitHub Key</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-white">Connect GitHub token</h1>
            <p className="mt-4 text-sm leading-6 text-mercury">
              Paste your fine-grained token for this portfolio repo. It lets the admin save edits as GitHub commits and trigger the existing deployment.
            </p>

            <label className="mt-6 grid gap-2 text-sm text-white/80">
              GitHub token
              <span className="relative block">
                <input
                  type={showToken ? "text" : "password"}
                  value={token}
                  onChange={(event) => handleSaveToken(event.target.value)}
                  className="min-h-12 w-full rounded-2xl border border-white/10 bg-black/35 px-4 pr-12 text-white outline-none transition focus:border-signal"
                  placeholder="github_pat_..."
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={() => setShowToken((visible) => !visible)}
                  className="absolute inset-y-0 right-1 grid w-11 place-items-center text-white/55 transition hover:text-white"
                  aria-label={showToken ? "Hide GitHub token" : "Show GitHub token"}
                  title={showToken ? "Hide token" : "Show token"}
                >
                  {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            <label className="mt-4 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 p-3 text-sm leading-6 text-mercury">
              <input
                type="checkbox"
                checked={rememberToken}
                onChange={(event) => void handleRememberToken(event.target.checked)}
                className="mt-1 h-4 w-4 accent-signal"
              />
              <span>Keep me connected on this private device. The token is encrypted with your admin password and never added to website files.</span>
            </label>

            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200/15 bg-amber-200/[0.06] p-3 text-xs leading-5 text-amber-50/70">
              <ShieldCheck className="mt-0.5 shrink-0" size={17} />
              <span>A static website cannot safely hide a token inside its published code. This masked, device-only connection is the safest option without changing hosting.</span>
            </div>

            <button type="button" onClick={continueWithToken} className="mt-6 min-h-12 w-full rounded-full bg-white px-5 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-signal">
              Next
            </button>
            <StatusMessage status={status} />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-obsidian px-4 py-8 text-platinum md:px-8">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-14rem] top-[-14rem] h-[36rem] w-[36rem] rounded-full bg-signal/10 blur-3xl" />
        <div className="ambient-grid absolute inset-0 opacity-60" />
      </div>

      <section className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <StepPill current={3} />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal">Static GitHub Admin</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-white md:text-6xl">Portfolio Admin</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-mercury">
              Choose a section, load the related file from GitHub, edit, and save. Your current hosting stays the same.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem(authStorageKey);
              sessionStorage.removeItem(tokenStorageKey);
              setToken("");
              setTokenEncryptionKey(null);
              setTokenStepComplete(false);
              setAuthenticated(false);
            }}
            className="min-h-11 rounded-full border border-white/10 px-5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:border-signal hover:text-signal"
          >
            Lock
          </button>
        </div>

        <StatusMessage status={status} />

        <div className="mt-6 grid gap-5 lg:grid-cols-[0.76fr_1.24fr]">
          <aside className="space-y-5">
            <Panel title="Quick Start">
              <ol className="space-y-3 text-sm leading-6 text-mercury">
                <li><strong className="text-white">1.</strong> Pick a section card.</li>
                <li><strong className="text-white">2.</strong> Choose the exact file if needed.</li>
                <li><strong className="text-white">3.</strong> Load From GitHub.</li>
                <li><strong className="text-white">4.</strong> Edit, then Save & Publish.</li>
              </ol>
              <p className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-3 text-xs leading-5 text-white/55">
                For most text, projects, categories, experience, skills, contact, resume, and media paths, use Main portfolio content.
              </p>
            </Panel>

            <Panel title="GitHub Access">
              <div className="flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-200" size={20} />
                <div>
                  <p className="font-semibold text-white">GitHub is connected</p>
                  <p className="mt-1 text-sm leading-6 text-emerald-50/65">
                    Your key is masked. {rememberToken ? "This private device will remember it." : "It will be removed when this tab closes."}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => setTokenStepComplete(false)} className="min-h-10 rounded-full border border-white/10 px-4 text-xs font-bold uppercase tracking-[0.16em] text-white/72 transition hover:border-signal hover:text-signal">
                  Change Key
                </button>
                <button type="button" onClick={clearToken} className="min-h-10 rounded-full border border-red-300/15 px-4 text-xs font-bold uppercase tracking-[0.16em] text-red-100/70 transition hover:border-red-300/40 hover:text-red-100">
                  Remove Key
                </button>
              </div>
            </Panel>

            <Panel title="Password">
              <p className="text-sm leading-6 text-mercury">
                Change the unlock password for this browser. GitHub permissions remain the real protection for publishing.
              </p>
              <form onSubmit={handleChangePassword} className="mt-4 grid gap-3">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-signal"
                  placeholder="New local password"
                />
                <button type="submit" className="min-h-11 rounded-full bg-white px-5 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-signal">
                  Change Password
                </button>
              </form>
            </Panel>

          </aside>

          <div className="space-y-5">
            <Panel title="Edit By Section">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {editorSections.map((section) => (
                  <article key={section.title} className="rounded-2xl border border-white/10 bg-black/24 p-4">
                    <h3 className="font-display text-xl text-white">{section.title}</h3>
                    <p className="mt-2 min-h-16 text-sm leading-6 text-mercury">{section.description}</p>
                    <div className="mt-4 grid gap-2">
                      {section.paths.map((path) => {
                        const file = editableFiles.find((item) => item.path === path);
                        return (
                          <button
                            key={`${section.title}-${path}`}
                            type="button"
                            onClick={() => selectAdminFile(path)}
                            className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                              selectedPath === path
                                ? "border-signal bg-signal/10 text-white"
                                : "border-white/10 bg-white/[0.04] text-white/64 hover:border-white/25 hover:text-white"
                            }`}
                          >
                            <span className="block font-semibold">{file?.label ?? path}</span>
                            <span className="mt-1 block break-all text-white/42">{path}</span>
                          </button>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </Panel>

            <Panel title="Content Editor">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="break-all text-sm font-semibold text-white">{activeFile?.path}</p>
                  <p className="mt-1 text-sm leading-6 text-mercury">{activeFile?.help}</p>
                </div>
                <button type="button" onClick={handleLoadFile} className="min-h-11 rounded-full bg-white px-5 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-signal">
                  Load From GitHub
                </button>
              </div>

              {!loadedFile ? (
                <div className="mt-5 grid min-h-52 place-items-center rounded-2xl border border-dashed border-white/15 bg-black/20 p-6 text-center">
                  <div>
                    <PencilLine className="mx-auto text-signal" size={28} />
                    <p className="mt-3 font-semibold text-white">Load this section to start editing</p>
                    <p className="mt-2 text-sm leading-6 text-mercury">Your current live content will appear here as easy form fields where available.</p>
                  </div>
                </div>
              ) : selectedPath === "content/site.json" ? (
                <SiteContentEditor draft={draft} onChange={setDraft} />
              ) : (
                <div className="mt-5">
                  <div className="mb-3 flex items-start gap-3 rounded-2xl border border-amber-200/15 bg-amber-200/[0.06] p-3 text-xs leading-5 text-amber-50/70">
                    <LockKeyhole className="mt-0.5 shrink-0" size={17} />
                    <span>Advanced code editor. Use this only when the no-code forms do not cover the change you need.</span>
                  </div>
                  <textarea
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    className="min-h-[34rem] w-full resize-y rounded-2xl border border-white/10 bg-black/55 p-4 font-mono text-xs leading-6 text-white outline-none transition focus:border-signal"
                    spellCheck={false}
                  />
                </div>
              )}

              <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
                <input
                  value={commitMessage}
                  onChange={(event) => setCommitMessage(event.target.value)}
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-signal"
                  placeholder="Commit message"
                />
                <button type="button" onClick={handleCommitFile} disabled={!loadedFile} className="min-h-12 rounded-full bg-signal px-6 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">
                  Save & Publish
                </button>
              </div>
            </Panel>

            <Panel title="Media Upload">
              <p className="text-sm leading-6 text-mercury">
                Choose what you are uploading, select the file, then publish it to the correct protected media folder.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-white/80">
                  Media type
                  <select
                    value={mediaFolder}
                    onChange={(event) => {
                      setMediaFolder(event.target.value);
                      setMediaPath(event.target.value);
                      setMediaFile(null);
                    }}
                    className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-signal"
                  >
                    {mediaFolders.map((folder) => <option key={folder.value} value={folder.value}>{folder.label}</option>)}
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-white/80">
                  Commit message
                  <input
                    value={mediaMessage}
                    onChange={(event) => setMediaMessage(event.target.value)}
                    className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-signal"
                    placeholder="media: upload portfolio asset"
                  />
                </label>
              </div>
              <p className="mt-3 break-all rounded-xl bg-black/25 px-3 py-2 text-xs text-white/45">
                Upload path: {mediaPath}
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
                <input
                  type="file"
                  onChange={handleFileInput}
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-[0.14em] file:text-black"
                />
                <button type="button" onClick={handleUploadMedia} className="min-h-12 rounded-full bg-white px-6 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-signal">
                  Upload Media
                </button>
              </div>
              <p className="mt-4 text-xs leading-5 text-white/45">After uploading, use the project editor to connect this path to the relevant card or preview.</p>
            </Panel>
          </div>
        </div>
      </section>
    </main>
  );
}

function SiteContentEditor({ draft, onChange }: { draft: string; onChange: (value: string) => void }) {
  let content: SiteContent;

  try {
    content = JSON.parse(draft) as SiteContent;
  } catch {
    return (
      <div className="mt-5 rounded-2xl border border-red-300/25 bg-red-300/10 p-4 text-sm leading-6 text-red-100">
        This content file is not valid JSON. Reload it from GitHub before continuing.
      </div>
    );
  }

  function updateProfile<K extends keyof SiteProfile>(key: K, value: SiteProfile[K]) {
    onChange(
      `${JSON.stringify(
        {
          ...content,
          profile: {
            ...content.profile,
            [key]: value
          }
        },
        null,
        2
      )}\n`
    );
  }

  return (
    <div className="mt-6 space-y-8">
      <FormSection title="Hero & Role Ticker" description="The first text recruiters see on the homepage.">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Your name" value={content.profile.name} onChange={(value) => updateProfile("name", value)} />
          <ListField label="Role ticker" value={content.profile.roles} onChange={(value) => updateProfile("roles", value)} help="One role per line" />
        </div>
        <TextAreaField label="Hero introduction" value={content.profile.intro} onChange={(value) => updateProfile("intro", value)} />
        <TextAreaField label="Positioning statement" value={content.profile.positioning} onChange={(value) => updateProfile("positioning", value)} />
      </FormSection>

      <FormSection title="About" description="Keep this scannable and easy to defend in an interview.">
        <TextField label="About heading" value={content.profile.aboutHeading} onChange={(value) => updateProfile("aboutHeading", value)} />
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Snapshot heading" value={content.profile.aboutSnapshot} onChange={(value) => updateProfile("aboutSnapshot", value)} />
          <TextAreaField label="Snapshot description" value={content.profile.aboutSnapshotBody} onChange={(value) => updateProfile("aboutSnapshotBody", value)} />
        </div>
        <ListField label="About paragraphs" value={content.profile.aboutParagraphs} onChange={(value) => updateProfile("aboutParagraphs", value)} help="One paragraph per line" />
        <ListField label="Core expertise" value={content.profile.aboutCoreExpertise} onChange={(value) => updateProfile("aboutCoreExpertise", value)} help="One skill per line" />
      </FormSection>

      <FormSection title="Contact & Recruiter Links" description="These values power the clickable contact and resume actions.">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Email" type="email" value={content.profile.email} onChange={(value) => updateProfile("email", value)} />
          <TextField label="Phone" type="tel" value={content.profile.phone} onChange={(value) => updateProfile("phone", value)} />
          <TextField label="Location" value={content.profile.location} onChange={(value) => updateProfile("location", value)} />
          <TextField label="Behance URL" type="url" value={content.profile.behance} onChange={(value) => updateProfile("behance", value)} />
        </div>
        <TextField label="Resume file path" value={content.profile.resume} onChange={(value) => updateProfile("resume", value)} help="Example: /Mayank-Chauhan-Resume.pdf" />
      </FormSection>
    </div>
  );
}

function FormSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="border-t border-white/10 pt-6 first:border-0 first:pt-0">
      <h3 className="font-display text-2xl text-white">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-mercury">{description}</p>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

function TextField({ label, value, onChange, help, type = "text" }: { label: string; value: string; onChange: (value: string) => void; help?: string; type?: "text" | "email" | "tel" | "url" }) {
  return (
    <label className="grid gap-2 text-sm text-white/80">
      <span>{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-12 min-w-0 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-signal" />
      {help && <span className="text-xs leading-5 text-white/42">{help}</span>}
    </label>
  );
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm text-white/80">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} className="min-h-28 w-full resize-y rounded-2xl border border-white/10 bg-black/35 p-4 leading-6 text-white outline-none transition focus:border-signal" />
    </label>
  );
}

function ListField({ label, value, onChange, help }: { label: string; value: string[]; onChange: (value: string[]) => void; help: string }) {
  return (
    <label className="grid gap-2 text-sm text-white/80">
      <span>{label}</span>
      <textarea
        value={value.join("\n")}
        onChange={(event) => onChange(event.target.value.split("\n"))}
        onBlur={(event) => onChange(event.target.value.split("\n").map((item) => item.trim()).filter(Boolean))}
        className="min-h-32 w-full resize-y rounded-2xl border border-white/10 bg-black/35 p-4 leading-6 text-white outline-none transition focus:border-signal"
      />
      <span className="text-xs leading-5 text-white/42">{help}</span>
    </label>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 shadow-luxury backdrop-blur-xl">
      <h2 className="font-display text-2xl text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function StepPill({ current }: { current: 1 | 2 | 3 }) {
  const steps = ["Password", "GitHub Key", "Edit Content"];

  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((step, index) => {
        const stepNumber = (index + 1) as 1 | 2 | 3;
        const active = stepNumber === current;
        const complete = stepNumber < current;

        return (
          <span
            key={step}
            className={`inline-flex min-h-9 items-center rounded-full border px-3 text-[0.62rem] font-bold uppercase tracking-[0.16em] ${
              active
                ? "border-signal bg-signal/15 text-signal"
                : complete
                  ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                  : "border-white/10 bg-white/[0.04] text-white/42"
            }`}
          >
            {stepNumber}. {step}
          </span>
        );
      })}
    </div>
  );
}

function StatusMessage({ status }: { status: Status }) {
  if (!status.message) {
    return null;
  }

  const color =
    status.type === "success"
      ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
      : status.type === "error"
        ? "border-red-300/30 bg-red-300/10 text-red-100"
        : "border-signal/30 bg-signal/10 text-white";

  return <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm leading-6 ${color}`}>{status.message}</div>;
}
