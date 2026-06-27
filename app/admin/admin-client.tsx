"use client";

import { type ChangeEvent, type DragEvent, type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, Copy, ExternalLink, Eye, EyeOff, FileText, LockKeyhole, PencilLine, Plus, ShieldCheck, Trash2, UploadCloud, X } from "lucide-react";
import JSON5 from "json5";

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

type EditableValue = string | number | boolean | null | EditableValue[] | { [key: string]: EditableValue };

type CollectionConfig = {
  exportName: string;
  label: string;
  description: string;
  itemName: string;
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

const collectionConfigs: CollectionConfig[] = [
  { exportName: "portfolioCategories", label: "Work Categories", description: "Category names, case-study copy, labels, colors, and presentation details.", itemName: "category" },
  { exportName: "portfolioWorks", label: "Featured Work", description: "Selected homepage projects and their image references.", itemName: "project" },
  { exportName: "logoProjects", label: "Brand Projects", description: "Brand-system and identity projects, briefs, tags, and gallery images.", itemName: "project" },
  { exportName: "socialProjects", label: "Campaign Projects", description: "Digital campaign and social-media projects.", itemName: "project" },
  { exportName: "uiUxProjects", label: "UI Visual Projects", description: "UI visual design projects, screens, and supporting details.", itemName: "project" },
  { exportName: "videoProjects", label: "Motion & Video", description: "Video projects, poster paths, original video paths, and details.", itemName: "video" },
  { exportName: "metaAdsProjects", label: "Performance Ads", description: "Performance ad projects and creative galleries.", itemName: "project" },
  { exportName: "aiGeneratedProjects", label: "AI Creative Projects", description: "AI-assisted creative projects and media.", itemName: "project" },
  { exportName: "projects", label: "Experience Cards", description: "Company, period, role summary, responsibilities, and tags.", itemName: "experience" },
  { exportName: "softwareSkills", label: "Software Skills", description: "Design tools and their icon paths.", itemName: "tool" },
  { exportName: "coreExpertise", label: "Core Expertise", description: "The main capability list displayed in Skills.", itemName: "skill" },
  { exportName: "aiTools", label: "AI Tools", description: "AI tools, usage labels, and icon paths.", itemName: "tool" },
  { exportName: "services", label: "Services", description: "Homepage service headings and supporting copy.", itemName: "service" },
  { exportName: "timeline", label: "Experience Timeline", description: "Detailed work timeline, outputs, and skill tags.", itemName: "role" },
  { exportName: "education", label: "Education", description: "Education entries shown on the homepage.", itemName: "entry" },
  { exportName: "hobbies", label: "Interests", description: "Personal interests displayed on the site.", itemName: "interest" }
];

const editorSections = [
  {
    title: "Homepage",
    description: "Edit hero text and role ticker with simple labeled fields.",
    path: "content/site.json"
  },
  {
    title: "About & Contact",
    description: "Edit About copy, expertise, email, phone, Behance, and resume path without code.",
    path: "content/site.json"
  },
  {
    title: "Work Categories",
    description: "Manage category titles, case studies, colors, and presentation details.",
    path: "lib/portfolio-data.ts",
    collection: "portfolioCategories"
  },
  {
    title: "Projects & Galleries",
    description: "Add, edit, duplicate, delete, and reorder portfolio projects and media.",
    path: "lib/portfolio-data.ts",
    collection: "portfolioWorks"
  },
  {
    title: "Experience",
    description: "Manage experience cards, timeline entries, role descriptions, and tags.",
    path: "lib/portfolio-data.ts",
    collection: "projects"
  },
  {
    title: "Skills & Tools",
    description: "Manage software, core expertise, AI tools, and services.",
    path: "lib/portfolio-data.ts",
    collection: "softwareSkills"
  },
  {
    title: "SEO & Advanced",
    description: "Metadata and developer-only layout files. Use carefully.",
    path: "app/layout.tsx"
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

function mediaAccept(folder: string) {
  if (folder.includes("videos")) return "video/*";
  if (folder.includes("resume")) return "application/pdf";
  return "image/*";
}

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

function isApprovedResumePath(path: string) {
  const normalized = normalizeRepoPath(path);
  return (
    normalized === "public/Mayank-Chauhan-Resume.pdf" ||
    (normalized.startsWith("public/resume/") && normalized.toLowerCase().endsWith(".pdf") && !normalized.includes(".."))
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

function findCollectionRange(source: string, exportName: string) {
  const marker = `export const ${exportName} =`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) {
    throw new Error(`Could not find ${exportName} in the portfolio data file.`);
  }

  const start = source.indexOf("[", markerIndex + marker.length);
  if (start < 0) {
    throw new Error(`${exportName} is not an editable list.`);
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = "";
      }
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
    } else if (character === "[") {
      depth += 1;
    } else if (character === "]") {
      depth -= 1;
      if (depth === 0) {
        return { start, end: index + 1 };
      }
    }
  }

  throw new Error(`Could not read the end of ${exportName}.`);
}

function parseExportedCollection(source: string, exportName: string) {
  const range = findCollectionRange(source, exportName);
  const parsed = JSON5.parse(source.slice(range.start, range.end));
  if (!Array.isArray(parsed)) {
    throw new Error(`${exportName} must remain a list.`);
  }
  return parsed as EditableValue[];
}

function replaceExportedCollection(source: string, exportName: string, values: EditableValue[]) {
  const range = findCollectionRange(source, exportName);
  return `${source.slice(0, range.start)}${JSON.stringify(values, null, 2)}${source.slice(range.end)}`;
}

function blankValue(value: EditableValue): EditableValue {
  if (Array.isArray(value)) {
    return [];
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, blankValue(child)]));
  }
  if (typeof value === "boolean") {
    return false;
  }
  if (typeof value === "number") {
    return 0;
  }
  return "";
}

function itemLabel(value: EditableValue, index: number, itemName: string) {
  if (typeof value === "string") {
    return value || `New ${itemName}`;
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const candidate = value.title ?? value.name ?? value.label ?? value.company ?? value.org ?? value.level ?? value.institution ?? value.role ?? value.id;
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }
  return `${itemName} ${index + 1}`;
}

function validateCollection(values: EditableValue[], config: CollectionConfig) {
  if (!values.length) {
    throw new Error(`${config.label} cannot be empty.`);
  }

  const ids = new Set<string>();
  values.forEach((value, index) => {
    if (typeof value === "string") {
      if (!value.trim()) throw new Error(`${config.label} item ${index + 1} cannot be empty.`);
      return;
    }
    if (!value || typeof value !== "object" || Array.isArray(value)) return;

    for (const requiredKey of ["title", "name", "level"]) {
      if (requiredKey in value && typeof value[requiredKey] === "string" && !value[requiredKey].trim()) {
        throw new Error(`${humanize(requiredKey)} is required for ${config.itemName} ${index + 1}.`);
      }
    }

    if ("id" in value && typeof value.id === "string") {
      if (!value.id.trim()) throw new Error(`ID is required for ${config.itemName} ${index + 1}.`);
      if (ids.has(value.id)) throw new Error(`ID "${value.id}" is used more than once.`);
      ids.add(value.id);
    }

    for (const mediaKey of ["images", "previewImages"]) {
      const media = value[mediaKey];
      if (!Array.isArray(media)) continue;
      media.forEach((item, mediaIndex) => {
        if (item && typeof item === "object" && !Array.isArray(item) && "src" in item && typeof item.src === "string" && !item.src.trim()) {
          throw new Error(`${humanize(mediaKey)} item ${mediaIndex + 1} needs a source path.`);
        }
      });
    }
  });
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

async function githubFailureMessage(response: Response, fallback: string) {
  const payload = await response.json().catch(() => null);
  const message = typeof payload?.message === "string" ? payload.message : "";

  if (response.status === 401) {
    return "GitHub rejected this token. Check that it is complete and not expired.";
  }
  if (response.status === 403 || message.includes("Resource not accessible by personal access token")) {
    return "This token cannot publish to the portfolio repo. In GitHub, select the portfolio repository and set Repository permissions > Contents to Read and write.";
  }
  if (response.status === 404) {
    return "The token cannot see this repository. Set Resource owner to mayankchauhan0208 and include the portfolio repository.";
  }
  return message || fallback;
}

async function verifyGithubAccess(token: string) {
  const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
    headers: githubHeaders(token)
  });
  if (!response.ok) {
    throw new Error(await githubFailureMessage(response, `Could not access the portfolio repo. GitHub returned ${response.status}.`));
  }
  const repository = await response.json();
  if (repository.permissions && repository.permissions.push === false) {
    throw new Error("This token can read the repo but cannot publish. Enable Contents: Read and write for this repository.");
  }
}

async function fetchGithubFile(path: string, token: string): Promise<GitHubFile> {
  const response = await fetch(`${contentUrl(path)}?ref=${defaultBranch}`, {
    headers: githubHeaders(token)
  });

  if (!response.ok) {
    throw new Error(await githubFailureMessage(response, `Could not load ${path}. GitHub returned ${response.status}.`));
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
    throw new Error(await githubFailureMessage(response, `Could not check ${path}. GitHub returned ${response.status}.`));
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
    throw new Error(await githubFailureMessage(response, `GitHub returned ${response.status}.`));
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
    throw new Error(await githubFailureMessage(response, `GitHub returned ${response.status}.`));
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
  const [selectedCollection, setSelectedCollection] = useState("portfolioCategories");
  const [loadedFile, setLoadedFile] = useState<GitHubFile | null>(null);
  const [draft, setDraft] = useState("");
  const [commitMessage, setCommitMessage] = useState("content: update portfolio from admin");
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [mediaFolder, setMediaFolder] = useState(mediaFolders[0].value);
  const [mediaPath, setMediaPath] = useState("public/images/");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const mediaMessage = "media: upload portfolio asset";
  const activeFile = useMemo(() => editableFiles.find((file) => file.path === selectedPath), [selectedPath]);
  const activeCollection = useMemo(
    () => collectionConfigs.find((collection) => collection.exportName === selectedCollection) ?? collectionConfigs[0],
    [selectedCollection]
  );
  const hasUnsavedChanges = Boolean(loadedFile && draft !== loadedFile.content);

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

    try {
      setStatus({ type: "info", message: "Checking secure GitHub access..." });
      await verifyGithubAccess(token);
      sessionStorage.setItem(tokenStorageKey, token);
      if (rememberToken && tokenEncryptionKey) {
        await encryptRememberedToken(token, tokenEncryptionKey);
      }
      setTokenStepComplete(true);
      setStatus({ type: "success", message: "GitHub connected. Choose a section to edit." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Could not verify GitHub access." });
    }
  }

  function selectAdminFile(path: string, collection?: string) {
    if (hasUnsavedChanges && !window.confirm("Discard your unsaved changes and open another section?")) {
      return;
    }
    setSelectedPath(path);
    if (collection) {
      setSelectedCollection(collection);
    }
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

    if (hasUnsavedChanges && !window.confirm("Reload from GitHub and discard your unsaved changes?")) {
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

    if (loadedFile.path === "lib/portfolio-data.ts") {
      try {
        const values = parseExportedCollection(draft, selectedCollection);
        validateCollection(values, activeCollection);
      } catch (error) {
        setStatus({ type: "error", message: error instanceof Error ? error.message : "Check the collection fields before publishing." });
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

    if (mediaFile.size > 90 * 1024 * 1024) {
      setStatus({ type: "error", message: "This file is larger than 90 MB. Compress it before uploading through GitHub." });
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
              Choose what you want to update, load the live content, edit simple fields, and publish. No coding is required for normal portfolio updates.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:border-signal hover:text-signal">
              View Site <ExternalLink size={15} />
            </a>
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
        </div>

        <StatusMessage status={status} />

        <div className="mt-6 grid gap-5 lg:grid-cols-[0.76fr_1.24fr]">
          <aside className="order-2 space-y-5 lg:order-1">
            <Panel title="Quick Start">
              <ol className="space-y-3 text-sm leading-6 text-mercury">
                <li><strong className="text-white">1.</strong> Pick a section card.</li>
                <li><strong className="text-white">2.</strong> Load the latest live content.</li>
                <li><strong className="text-white">3.</strong> Edit the labeled fields.</li>
                <li><strong className="text-white">4.</strong> Save & Publish.</li>
              </ol>
              <p className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-3 text-xs leading-5 text-white/55">
                Use Media Upload first when adding a new image, video, poster, or resume. Then paste its generated path into the relevant item.
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

          <div className="order-1 space-y-5 lg:order-2">
            <Panel title="Edit By Section">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {editorSections.map((section) => (
                  <article key={section.title} className="border-l border-white/10 pl-4">
                    <h3 className="font-display text-xl text-white">{section.title}</h3>
                    <p className="mt-2 min-h-16 text-sm leading-6 text-mercury">{section.description}</p>
                    <button
                      type="button"
                      onClick={() => selectAdminFile(section.path, "collection" in section ? section.collection : undefined)}
                      className={`mt-4 min-h-11 w-full rounded-xl border px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.14em] transition ${
                        selectedPath === section.path && (!("collection" in section) || selectedCollection === section.collection)
                          ? "border-signal bg-signal/10 text-signal"
                          : "border-white/10 bg-white/[0.04] text-white/64 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      Open editor
                    </button>
                  </article>
                ))}
              </div>
            </Panel>

            <Panel title="Content Editor">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {selectedPath === "lib/portfolio-data.ts" ? activeCollection.label : activeFile?.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-mercury">
                    {selectedPath === "lib/portfolio-data.ts" ? activeCollection.description : activeFile?.help}
                  </p>
                  {loadedFile && (
                    <span className={`mt-2 inline-flex rounded-full border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] ${hasUnsavedChanges ? "border-amber-200/25 bg-amber-200/10 text-amber-100" : "border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-100"}`}>
                      {hasUnsavedChanges ? "Unsaved changes" : "Up to date"}
                    </span>
                  )}
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
                <SiteContentEditor draft={draft} onChange={setDraft} token={token} onStatus={setStatus} />
              ) : selectedPath === "lib/portfolio-data.ts" ? (
                <CollectionEditor
                  draft={draft}
                  config={activeCollection}
                  onChange={setDraft}
                  onConfigChange={setSelectedCollection}
                />
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

              <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 md:flex-row md:items-end md:justify-between">
                <details className="text-xs text-white/50">
                  <summary className="cursor-pointer py-2 transition hover:text-white">Advanced publish note</summary>
                  <input
                    value={commitMessage}
                    onChange={(event) => setCommitMessage(event.target.value)}
                    className="mt-2 min-h-11 w-full min-w-72 rounded-xl border border-white/10 bg-black/35 px-3 text-sm text-white outline-none transition focus:border-signal"
                    placeholder="Commit message"
                  />
                </details>
                <button type="button" onClick={handleCommitFile} disabled={!loadedFile || !hasUnsavedChanges} className="min-h-12 rounded-full bg-signal px-6 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">
                  Save & Publish
                </button>
              </div>
            </Panel>

            <Panel title="Media Upload">
              <p className="text-sm leading-6 text-mercury">
                Choose what you are uploading, select the file, then publish it to the correct protected media folder.
              </p>
              <div className="mt-4 grid gap-3">
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
              </div>
              <p className="mt-3 break-all rounded-xl bg-black/25 px-3 py-2 text-xs text-white/45">
                Upload path: {mediaPath}
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
                <input
                  type="file"
                  accept={mediaAccept(mediaFolder)}
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

function CollectionEditor({
  draft,
  config,
  onChange,
  onConfigChange
}: {
  draft: string;
  config: CollectionConfig;
  onChange: (value: string) => void;
  onConfigChange: (value: string) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSelectedIndex(0);
    setSearchQuery("");
  }, [config.exportName]);

  let values: EditableValue[];
  try {
    values = parseExportedCollection(draft, config.exportName);
  } catch (error) {
    return (
      <div className="mt-5 rounded-2xl border border-red-300/25 bg-red-300/10 p-4 text-sm leading-6 text-red-100">
        {error instanceof Error ? error.message : "This collection could not be loaded."}
      </div>
    );
  }

  const safeIndex = values.length ? Math.min(selectedIndex, values.length - 1) : -1;
  const selectedValue = safeIndex >= 0 ? values[safeIndex] : null;
  const visibleItems = values
    .map((value, index) => ({ value, index, label: itemLabel(value, index, config.itemName) }))
    .filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()));

  function updateValues(nextValues: EditableValue[]) {
    onChange(replaceExportedCollection(draft, config.exportName, nextValues));
  }

  function updateSelected(value: EditableValue) {
    if (safeIndex < 0) return;
    const nextValues = [...values];
    nextValues[safeIndex] = value;
    updateValues(nextValues);
  }

  function addItem() {
    const template = values[safeIndex] ?? values[0] ?? "";
    const nextValues = [...values, blankValue(template)];
    updateValues(nextValues);
    setSelectedIndex(nextValues.length - 1);
  }

  function duplicateItem() {
    if (safeIndex < 0) return;
    const nextValues = [...values];
    nextValues.splice(safeIndex + 1, 0, JSON.parse(JSON.stringify(values[safeIndex])) as EditableValue);
    updateValues(nextValues);
    setSelectedIndex(safeIndex + 1);
  }

  function deleteItem() {
    if (safeIndex < 0 || !window.confirm(`Delete ${itemLabel(values[safeIndex], safeIndex, config.itemName)}?`)) return;
    const nextValues = values.filter((_, index) => index !== safeIndex);
    updateValues(nextValues);
    setSelectedIndex(Math.max(0, safeIndex - 1));
  }

  function moveItem(direction: -1 | 1) {
    const targetIndex = safeIndex + direction;
    if (safeIndex < 0 || targetIndex < 0 || targetIndex >= values.length) return;
    const nextValues = [...values];
    [nextValues[safeIndex], nextValues[targetIndex]] = [nextValues[targetIndex], nextValues[safeIndex]];
    updateValues(nextValues);
    setSelectedIndex(targetIndex);
  }

  return (
    <div className="mt-6">
      <label className="grid gap-2 text-sm text-white/80">
        What do you want to manage?
        <select
          value={config.exportName}
          onChange={(event) => onConfigChange(event.target.value)}
          className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-signal"
        >
          {collectionConfigs.map((option) => <option key={option.exportName} value={option.exportName}>{option.label}</option>)}
        </select>
      </label>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="min-w-0 border-b border-white/10 pb-6 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-white">{config.label}</p>
              <p className="mt-1 text-xs text-white/45">{values.length} items</p>
            </div>
            <button type="button" onClick={addItem} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-black transition hover:bg-signal" aria-label={`Add ${config.itemName}`} title={`Add ${config.itemName}`}>
              <Plus size={18} />
            </button>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="mt-4 min-h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-signal"
            placeholder={`Search ${config.label.toLowerCase()}`}
          />
          <div className="mt-4 grid max-h-[34rem] gap-2 overflow-y-auto pr-1">
            {visibleItems.map(({ value, index, label }) => (
              <button
                key={`${config.exportName}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`min-h-11 rounded-xl border px-3 py-2 text-left text-sm transition ${
                  index === safeIndex ? "border-signal bg-signal/10 text-white" : "border-white/10 bg-black/20 text-white/65 hover:border-white/25 hover:text-white"
                }`}
              >
                <span className="mr-2 text-xs text-white/35">{String(index + 1).padStart(2, "0")}</span>
                {label}
              </button>
            ))}
            {!visibleItems.length && <p className="py-6 text-center text-sm text-white/45">No matching items.</p>}
          </div>
        </div>

        <div className="min-w-0">
          {selectedValue === null ? (
            <div className="grid min-h-52 place-items-center rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm text-mercury">
              Add your first {config.itemName} to begin.
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-signal">Editing</p>
                  <h3 className="mt-1 font-display text-2xl text-white">{itemLabel(selectedValue, safeIndex, config.itemName)}</h3>
                </div>
                <div className="flex gap-2">
                  <IconButton label="Move up" onClick={() => moveItem(-1)} disabled={safeIndex <= 0}><ArrowUp size={17} /></IconButton>
                  <IconButton label="Move down" onClick={() => moveItem(1)} disabled={safeIndex >= values.length - 1}><ArrowDown size={17} /></IconButton>
                  <IconButton label="Duplicate" onClick={duplicateItem}><Copy size={17} /></IconButton>
                  <IconButton label="Delete" onClick={deleteItem} danger><Trash2 size={17} /></IconButton>
                </div>
              </div>
              <div className="mt-5">
                <ValueEditor value={selectedValue} onChange={updateSelected} fieldName={config.itemName} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ValueEditor({ value, onChange, fieldName }: { value: EditableValue; onChange: (value: EditableValue) => void; fieldName: string }) {
  if (typeof value === "string") {
    const useTextarea = value.length > 80 || ["summary", "details", "body", "brief", "subtitle", "description", "overview", "challenge", "direction", "outcome", "role"].includes(fieldName);
    const help = fieldHelp(fieldName);
    return (
      <label className="grid gap-2 text-sm text-white/80">
        <span>{humanize(fieldName)}</span>
        {useTextarea ? (
          <textarea value={value} onChange={(event) => onChange(event.target.value)} className="min-h-28 w-full resize-y rounded-2xl border border-white/10 bg-black/35 p-4 leading-6 text-white outline-none transition focus:border-signal" />
        ) : (
          <input value={value} onChange={(event) => onChange(event.target.value)} className="min-h-12 min-w-0 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-signal" />
        )}
        {help && <span className="text-xs leading-5 text-white/42">{help}</span>}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="grid gap-2 text-sm text-white/80">
        <span>{humanize(fieldName)}</span>
        <input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} className="min-h-12 rounded-2xl border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-signal" />
      </label>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white/80">
        <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-signal" />
        {humanize(fieldName)}
      </label>
    );
  }

  if (value === null) {
    return <p className="text-sm text-white/45">{humanize(fieldName)} is empty.</p>;
  }

  if (Array.isArray(value)) {
    const objectList = value.some((item) => item !== null && typeof item === "object") || ["images", "previewImages"].includes(fieldName);
    if (objectList) {
      return <NestedObjectList fieldName={fieldName} values={value} onChange={onChange} />;
    }
    return (
      <label className="grid gap-2 text-sm text-white/80">
        <span>{humanize(fieldName)}</span>
        <textarea
          value={value.map(String).join("\n")}
          onChange={(event) => onChange(event.target.value.split("\n"))}
          onBlur={(event) => onChange(event.target.value.split("\n").map((item) => item.trim()).filter(Boolean))}
          className="min-h-32 w-full resize-y rounded-2xl border border-white/10 bg-black/35 p-4 leading-6 text-white outline-none transition focus:border-signal"
        />
        <span className="text-xs text-white/42">One item per line</span>
      </label>
    );
  }

  return (
    <div className="grid gap-4">
      {Object.entries(value).map(([key, child]) => (
        <div key={key} className={child && typeof child === "object" && !Array.isArray(child) ? "border-l border-white/10 pl-4" : ""}>
          <ValueEditor value={child} onChange={(nextChild) => onChange({ ...value, [key]: nextChild })} fieldName={key} />
        </div>
      ))}
    </div>
  );
}

function NestedObjectList({ fieldName, values, onChange }: { fieldName: string; values: EditableValue[]; onChange: (value: EditableValue) => void }) {
  function addNestedItem() {
    const fallback = { src: "", title: "", width: 1080, height: 1350 } as EditableValue;
    onChange([...values, values.length ? blankValue(values[0]) : fallback]);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-white/80">{humanize(fieldName)}</p>
          <p className="mt-1 text-xs text-white/42">{values.length} media items</p>
        </div>
        <button type="button" onClick={addNestedItem} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-signal hover:text-signal">
          <Plus size={15} /> Add
        </button>
      </div>
      <div className="mt-3 divide-y divide-white/10 border-y border-white/10">
        {values.map((item, index) => (
          <details key={`${fieldName}-${index}`} className="py-3" open={index === 0}>
            <summary className="cursor-pointer text-sm font-semibold text-white">{itemLabel(item, index, "media")}</summary>
            <div className="mt-4 grid gap-4 pl-3">
              <ValueEditor
                value={item}
                onChange={(nextItem) => onChange(values.map((current, currentIndex) => currentIndex === index ? nextItem : current))}
                fieldName="media"
              />
              <div className="flex flex-wrap gap-2">
                <IconButton label="Move media up" onClick={() => onChange(moveArrayValue(values, index, -1))} disabled={index === 0}><ArrowUp size={16} /></IconButton>
                <IconButton label="Move media down" onClick={() => onChange(moveArrayValue(values, index, 1))} disabled={index === values.length - 1}><ArrowDown size={16} /></IconButton>
                <IconButton label="Delete media" onClick={() => window.confirm("Delete this media item?") && onChange(values.filter((_, currentIndex) => currentIndex !== index))} danger><Trash2 size={16} /></IconButton>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function moveArrayValue(values: EditableValue[], index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= values.length) return values;
  const nextValues = [...values];
  [nextValues[index], nextValues[target]] = [nextValues[target], nextValues[index]];
  return nextValues;
}

function humanize(value: string) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/^./, (character) => character.toUpperCase());
}

function fieldHelp(fieldName: string) {
  if (fieldName === "id") return "Use lowercase words with hyphens. Do not change an existing ID unless its route should change.";
  if (["src", "thumbnail", "poster", "logo"].includes(fieldName)) return "Use the path created by Media Upload, starting with /.";
  if (fieldName === "href") return "Internal links should start with / and section links with /#.";
  if (["width", "height"].includes(fieldName)) return "Original media dimension in pixels.";
  return "";
}

function IconButton({ label, onClick, disabled = false, danger = false, children }: { label: string; onClick: () => void; disabled?: boolean; danger?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`grid h-10 w-10 place-items-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-30 ${danger ? "border-red-300/20 text-red-100/70 hover:border-red-300/50 hover:text-red-100" : "border-white/10 text-white/65 hover:border-signal hover:text-signal"}`}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function SiteContentEditor({ draft, onChange, token, onStatus }: { draft: string; onChange: (value: string) => void; token: string; onStatus: (status: Status) => void }) {
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
        <ResumeManager resumePath={content.profile.resume} token={token} onStatus={onStatus} />
      </FormSection>
    </div>
  );
}

function ResumeManager({ resumePath, token, onStatus }: { resumePath: string; token: string; onStatus: (status: Status) => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [inputVersion, setInputVersion] = useState(0);
  const repoPath = normalizeRepoPath(`public/${resumePath.replace(/^\/+/, "")}`);

  function chooseResume(file: File | null) {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      onStatus({ type: "error", message: "Choose a PDF file for the resume." });
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      onStatus({ type: "error", message: "Resume PDF must be smaller than 20 MB." });
      return;
    }
    setSelectedFile(file);
    onStatus({ type: "info", message: `${file.name} is ready. Review it, then replace the current resume.` });
  }

  function handleResumeDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragActive(false);
    chooseResume(event.dataTransfer.files?.[0] ?? null);
  }

  async function replaceResume() {
    if (!selectedFile) {
      onStatus({ type: "error", message: "Choose a new resume PDF first." });
      return;
    }
    if (!isApprovedResumePath(repoPath)) {
      onStatus({ type: "error", message: "The current resume path is not approved for replacement." });
      return;
    }
    if (!window.confirm(`Replace the current resume with ${selectedFile.name}? The website link will continue using ${resumePath}.`)) {
      return;
    }

    try {
      setUploading(true);
      onStatus({ type: "info", message: "Uploading and replacing the current resume..." });
      const existingSha = await fetchGithubSha(repoPath, token);
      const encoded = await fileToBase64(selectedFile);
      await commitGithubBase64(repoPath, token, encoded, existingSha, "content: replace portfolio resume");
      setSelectedFile(null);
      setInputVersion((version) => version + 1);
      onStatus({ type: "success", message: "Resume replaced on GitHub. The existing deployment will publish the new PDF shortly." });
    } catch (error) {
      onStatus({ type: "error", message: error instanceof Error ? error.message : "Could not replace the resume." });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-white/80">Resume PDF</p>
      <div className="mt-2 flex flex-col gap-3 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-signal"><FileText size={20} /></span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{resumePath.split("/").pop() || "Current resume"}</p>
            <p className="mt-1 text-xs text-white/42">Current live file</p>
          </div>
        </div>
        <a href={resumePath} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/10 px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-signal hover:text-signal">
          Open current <ExternalLink size={14} />
        </a>
      </div>

      <label
        htmlFor="resume-pdf-upload"
        onDragEnter={(event) => { event.preventDefault(); setDragActive(true); }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleResumeDrop}
        className={`mt-4 grid min-h-44 cursor-pointer place-items-center rounded-2xl border border-dashed p-6 text-center transition ${dragActive ? "border-signal bg-signal/10" : "border-white/15 bg-black/20 hover:border-white/30"}`}
      >
        <input key={inputVersion} id="resume-pdf-upload" type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(event) => chooseResume(event.target.files?.[0] ?? null)} />
        <span>
          <UploadCloud className="mx-auto text-signal" size={30} />
          <span className="mt-3 block font-semibold text-white">Drop a new resume PDF here</span>
          <span className="mt-1 block text-sm leading-6 text-mercury">or tap to choose a file, up to 20 MB</span>
        </span>
      </label>

      {selectedFile && (
        <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-signal/25 bg-signal/[0.08] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{selectedFile.name}</p>
            <p className="mt-1 text-xs text-white/45">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB selected</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => { setSelectedFile(null); setInputVersion((version) => version + 1); }} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/65 transition hover:border-red-300/40 hover:text-red-100" aria-label="Remove selected resume" title="Remove selected file"><X size={17} /></button>
            <button type="button" onClick={replaceResume} disabled={uploading} className="min-h-11 rounded-full bg-white px-5 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-signal disabled:cursor-wait disabled:opacity-50">
              {uploading ? "Replacing..." : "Replace previous PDF"}
            </button>
          </div>
        </div>
      )}
      <p className="mt-3 text-xs leading-5 text-white/42">Replacing uploads the new PDF to the same safe path, removes the previous live version, and keeps every Resume button working.</p>
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
