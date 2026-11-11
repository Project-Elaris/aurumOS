(() => {
  const list = document.getElementById("release-list");
  if (!list) return;

  const status = document.getElementById("release-status");
  const channel = document.getElementById("release-channel");
  const search = document.getElementById("release-search");
  const retry = document.getElementById("release-retry");
  const endpoint = "https://api.github.com/repos/Project-Elaris/aurumOS/releases";
  const cacheKey = "aurumos-github-releases-v1";
  const cacheLifetime = 15 * 60 * 1000;
  let releases = [];
  let statusNote = "";

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const formatSize = (bytes) => {
    if (!Number.isFinite(bytes) || bytes <= 0) return "";
    const mib = bytes / (1024 * 1024);
    return `${mib.toFixed(mib >= 100 ? 0 : 1)} MiB`;
  };

  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Date unavailable";
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const safeGitHubUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && ["github.com", "objects.githubusercontent.com"].includes(url.hostname)
        ? url.href
        : "https://github.com/Project-Elaris/aurumOS/releases";
    } catch {
      return "https://github.com/Project-Elaris/aurumOS/releases";
    }
  };

  const makeLink = (url, label, className = "") => {
    const link = element("a", className, label);
    link.href = safeGitHubUrl(url);
    link.rel = "noopener noreferrer";
    return link;
  };

  const readCache = (allowExpired = false) => {
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey));
      if (!Array.isArray(cached?.releases)) return null;
      if (!allowExpired && Date.now() - cached.savedAt > cacheLifetime) return null;
      return cached.releases;
    } catch {
      return null;
    }
  };

  const writeCache = (items) => {
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), releases: items }));
    } catch {
      // Storage can be disabled or full; release browsing still works without it.
    }
  };

  const renderRelease = (release) => {
    const card = element("article", "release-card");
    const header = element("header", "release-card-header");
    const title = element("h2");
    title.append(makeLink(release.html_url, release.name || release.tag_name));
    header.append(title);
    header.append(element("span", "release-tag", release.tag_name));
    header.append(element("span", "release-channel", release.prerelease ? "Prerelease" : "Stable"));
    header.append(element("time", "release-date", formatDate(release.published_at || release.created_at)));
    card.append(header);

    const assets = Array.isArray(release.assets) ? release.assets : [];
    const isoAssets = assets.filter((asset) => asset.name.toLowerCase().endsWith(".iso"));
    const downloads = element("div", "release-downloads");
    if (isoAssets.length) {
      for (const asset of isoAssets) {
        downloads.append(makeLink(asset.browser_download_url, `Download ISO${isoAssets.length > 1 ? `: ${asset.name}` : ""}`, "action-link action-primary release-download"));
      }
    } else {
      downloads.append(makeLink(release.html_url, "View release files on GitHub", "action-link action-secondary release-download"));
    }
    card.append(downloads);

    const otherAssets = assets.filter((asset) => !asset.name.toLowerCase().endsWith(".iso"));
    if (otherAssets.length) {
      const details = element("details", "release-assets");
      details.append(element("summary", "", `Other files (${otherAssets.length})`));
      const assetList = element("ul", "release-asset-list");
      for (const asset of otherAssets) {
        const item = element("li");
        const size = formatSize(asset.size);
        item.append(makeLink(asset.browser_download_url, asset.name));
        if (size) item.append(document.createTextNode(` - ${size}`));
        assetList.append(item);
      }
      details.append(assetList);
      card.append(details);
    }

    if (release.body) {
      const notes = element("details", "release-notes");
      notes.append(element("summary", "", "Release notes"));
      notes.append(element("pre", "", release.body));
      card.append(notes);
    }
    return card;
  };

  const render = () => {
    const query = search.value.trim().toLowerCase();
    const selectedChannel = channel.value;
    const visible = releases.filter((release) => {
      if (selectedChannel === "stable" && release.prerelease) return false;
      if (selectedChannel === "prerelease" && !release.prerelease) return false;
      const searchable = `${release.name || ""} ${release.tag_name || ""} ${release.body || ""}`.toLowerCase();
      return !query || searchable.includes(query);
    });

    list.replaceChildren();
    if (!visible.length) {
      list.append(element("p", "release-empty", "No releases match these filters."));
    } else {
      const fragment = document.createDocumentFragment();
      for (const release of visible) fragment.append(renderRelease(release));
      list.append(fragment);
    }
    status.textContent = `${visible.length} of ${releases.length} release${releases.length === 1 ? "" : "s"}${statusNote ? ` - ${statusNote}` : ""}`;
  };

  const load = async (force = false) => {
    retry.disabled = true;
    status.textContent = "Loading releases from GitHub...";
    list.replaceChildren();
    if (!force) {
      const cached = readCache();
      if (cached) {
        releases = cached;
        statusNote = "recently cached";
        render();
        retry.disabled = false;
        return;
      }
    }

    try {
      const loaded = [];
      for (let page = 1; ; page += 1) {
        const response = await fetch(`${endpoint}?per_page=100&page=${page}`, {
          headers: {
            Accept: "application/vnd.github+json",
          },
        });
        if (!response.ok) {
          if (response.status === 403 || response.status === 429) {
            throw new Error("GitHub is temporarily limiting release requests. Try again shortly.");
          }
          throw new Error(`GitHub returned HTTP ${response.status}.`);
        }
        const batch = await response.json();
        if (!Array.isArray(batch)) throw new Error("GitHub returned an unexpected release response.");
        loaded.push(...batch.filter((release) => !release.draft));
        if (batch.length < 100) break;
      }
      releases = loaded;
      writeCache(releases);
      statusNote = "live from GitHub";
      if (!releases.length) {
        list.append(element("p", "release-empty", "No published releases are available yet."));
        status.textContent = "No published releases yet";
        return;
      }
      render();
    } catch (error) {
      const cached = readCache(true);
      if (cached) {
        releases = cached;
        statusNote = `cached copy; ${error.message || "GitHub is unavailable"}`;
        render();
        return;
      }
      status.textContent = error.message || "Could not load releases.";
      const fallback = element("p", "release-empty");
      fallback.append(document.createTextNode("You can still browse or download releases directly from "));
      fallback.append(makeLink("https://github.com/Project-Elaris/aurumOS/releases", "GitHub"));
      fallback.append(document.createTextNode("."));
      list.append(fallback);
    } finally {
      retry.disabled = false;
    }
  };

  channel.addEventListener("change", render);
  search.addEventListener("input", render);
  retry.addEventListener("click", () => load(true));
  load();
})();