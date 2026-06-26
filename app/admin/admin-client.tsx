"use client";

import { type ChangeEvent, type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";

type GitHubFile = {
  path: string;
  content: string;
  sha: string | null;
};

type Status = {
  type: "idle" | "success" | "error" | "info";
  message: string;
};

const repoOwner = "mayankchauhan0208";
const repoName = "portfolio";
const defaultBranch = "main";
const defaultPassword = "admin123";
const passwordStorageKey = "portfolio-admin-password-hash";
const authStorageKey = "portfolio-admin-authenticated";
const tokenStorageKey = "portfolio-admin-github-token";

const editableFiles = [
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

const approvedWritePaths = [
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

function encodeBase64(value: string) {
  return btoa(unescape(encodeURIComponent(value)));
}

function decodeBase64(value: string) {
  return decodeURIComponent(escape(atob(value.replace(/\n/g, ""))));
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
  const [selectedPath, setSelectedPath] = useState(editableFiles[0].path);
  const [loadedFile, setLoadedFile] = useState<GitHubFile | null>(null);
  const [draft, setDraft] = useState("");
  const [commitMessage, setCommitMessage] = useState("content: update portfolio from admin");
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [mediaPath, setMediaPath] = useState("public/images/");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaMessage, setMediaMessage] = useState("media: upload portfolio asset");
  const activeFile = useMemo(() => editableFiles.find((file) => file.path === selectedPath), [selectedPath]);

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem(authStorageKey) === "true");
    setToken(sessionStorage.getItem(tokenStorageKey) ?? "");
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

    sessionStorage.setItem(authStorageKey, "true");
    setAuthenticated(true);
    setPassword("");
    setStatus({ type: "success", message: "Admin unlocked for this browser session." });
  }

  async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword.trim().length < 6) {
      setStatus({ type: "error", message: "Use at least 6 characters for the local admin password." });
      return;
    }

    localStorage.setItem(passwordStorageKey, await sha256(newPassword.trim()));
    setNewPassword("");
    setStatus({ type: "success", message: "Local admin password changed on this browser." });
  }

  function handleSaveToken(value: string) {
    setToken(value.trim());

    if (value.trim()) {
      sessionStorage.setItem(tokenStorageKey, value.trim());
      setStatus({ type: "success", message: "GitHub token saved in session storage for this tab." });
    } else {
      sessionStorage.removeItem(tokenStorageKey);
      setStatus({ type: "info", message: "GitHub token cleared." });
    }
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

    if (file && mediaPath.endsWith("/")) {
      setMediaPath(`${mediaPath}${file.name}`);
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal">Portfolio Admin</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-white">Admin access</h1>
            <p className="mt-4 text-sm leading-6 text-mercury">
              This is a basic static-site password gate. It is useful for convenience, but GitHub token permissions are the real security.
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
                Unlock Admin
              </button>
            </form>
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal">Static GitHub Admin</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-white md:text-6xl">Portfolio Admin</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-mercury">
              Edit approved repository files, upload media to approved public folders, and commit changes to GitHub. The existing deployment flow updates the live site.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem(authStorageKey);
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
            <Panel title="GitHub Access">
              <p className="text-sm leading-6 text-mercury">
                Paste a fine-grained GitHub token scoped only to this repo with Contents read/write access. It is stored in `sessionStorage` for this tab.
              </p>
              <label className="mt-4 grid gap-2 text-sm text-white/80">
                GitHub token
                <input
                  type="password"
                  value={token}
                  onChange={(event) => handleSaveToken(event.target.value)}
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-signal"
                  placeholder="github_pat_..."
                />
              </label>
            </Panel>

            <Panel title="Password">
              <p className="text-sm leading-6 text-mercury">
                Change the basic local password for this browser. This does not protect the public JavaScript bundle.
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

            <Panel title="Approved Files">
              <div className="grid gap-2">
                {editableFiles.map((file) => (
                  <button
                    key={file.path}
                    type="button"
                    onClick={() => {
                      setSelectedPath(file.path);
                      setLoadedFile(null);
                      setDraft("");
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedPath === file.path
                        ? "border-signal bg-signal/10 text-white"
                        : "border-white/10 bg-black/20 text-white/72 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{file.label}</span>
                    <span className="mt-1 block break-all text-xs text-white/45">{file.path}</span>
                  </button>
                ))}
              </div>
            </Panel>
          </aside>

          <div className="space-y-5">
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

              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="mt-5 min-h-[34rem] w-full resize-y rounded-2xl border border-white/10 bg-black/55 p-4 font-mono text-xs leading-6 text-white outline-none transition focus:border-signal"
                placeholder="Load a file from GitHub to edit it here."
                spellCheck={false}
              />

              <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
                <input
                  value={commitMessage}
                  onChange={(event) => setCommitMessage(event.target.value)}
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-signal"
                  placeholder="Commit message"
                />
                <button type="button" onClick={handleCommitFile} className="min-h-12 rounded-full bg-signal px-6 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-white">
                  Publish Commit
                </button>
              </div>
            </Panel>

            <Panel title="Media Upload">
              <p className="text-sm leading-6 text-mercury">
                Upload only to approved public folders. After upload, copy the path into `lib/portfolio-data.ts` as a thumbnail, original image, poster, video, or resume path.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-white/80">
                  Repository path
                  <input
                    value={mediaPath}
                    onChange={(event) => setMediaPath(event.target.value)}
                    className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-signal"
                    placeholder="public/images/example.webp"
                  />
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
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-xs leading-6 text-white/55">
                Approved media paths: `public/images/`, `public/optimized-images/`, `public/optimized/`, `public/videos/`, `public/video-thumbnails/`, `public/work/`, `public/resume/`.
              </div>
            </Panel>
          </div>
        </div>
      </section>
    </main>
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
