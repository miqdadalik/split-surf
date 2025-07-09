const { Menu, MenuItem } = require("@electron/remote");
const container = document.getElementById("container");

function createPane(url = "") {
  let isUserNavigating = true;

  const pane = document.createElement("div");
  pane.className = "pane d-flex flex-column border rounded overflow-hidden";
  pane.style.flex = "1";

  const bar = document.createElement("div");
  bar.className = "url-bar d-flex align-items-start gap-2 p-2 bg-light border-bottom flex-wrap";

  const inputWrapper = document.createElement("div");
  inputWrapper.className = "position-relative flex-grow-1";

  const inputGroup = document.createElement("div");
  inputGroup.className = "input-group";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "form-control";
  input.value = url;

  // ▶️ Go
  const goBtn = document.createElement("button");
  goBtn.className = "btn btn-outline-primary";
  goBtn.title = "Go";
  const goIcon = document.createElement("i");
  goIcon.className = "bi bi-arrow-right-circle";
  goBtn.appendChild(goIcon);

  // 🔄 Refresh
  const refreshBtn = document.createElement("button");
  refreshBtn.className = "btn btn-outline-secondary";
  refreshBtn.title = "Refresh";
  refreshBtn.innerHTML = `<i class="bi bi-arrow-clockwise"></i>`;

  // ⭐ Bookmark
  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.className = "btn btn-outline-warning";
  bookmarkBtn.title = "Bookmark";
  bookmarkBtn.innerHTML = `<i class="bi bi-star"></i>`;

  // 📚 Bookmarks
  const bookmarksBtn = document.createElement("button");
  bookmarksBtn.className = "btn btn-outline-secondary";
  bookmarksBtn.title = "Show Bookmarks";
  bookmarksBtn.innerHTML = `<i class="bi bi-bookmarks"></i>`;

  // Spinner
  const spinnerIcon = document.createElement("div");
  spinnerIcon.className = "spinner-border spinner-border-sm text-primary d-none ms-2";
  spinnerIcon.setAttribute("role", "status");
  spinnerIcon.style.width = "1rem";
  spinnerIcon.style.height = "1rem";
  goBtn.appendChild(spinnerIcon);

  // Button group
  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group ms-2";
  btnGroup.append(goBtn, refreshBtn, bookmarkBtn, bookmarksBtn);

  inputGroup.append(input, btnGroup);
  inputWrapper.appendChild(inputGroup);

  // 📚 Bookmark dropdown
  const bookmarkDropdown = document.createElement("div");
  bookmarkDropdown.className = "position-absolute bg-white border rounded shadow-sm d-none";
  bookmarkDropdown.style.top = "100%";
  bookmarkDropdown.style.left = "0";
  bookmarkDropdown.style.width = "100%";
  bookmarkDropdown.style.zIndex = "10";
  bookmarkDropdown.style.maxHeight = "200px";
  bookmarkDropdown.style.overflowY = "auto";

  const bookmarkList = document.createElement("ul");
  bookmarkList.className = "list-unstyled m-0 small";
  bookmarkDropdown.appendChild(bookmarkList);
  inputWrapper.appendChild(bookmarkDropdown);

  // Split buttons
  const splitGroup = document.createElement("div");
  splitGroup.className = "btn-group";

  const splitH = document.createElement("button");
  splitH.className = "btn btn-outline-secondary";
  splitH.title = "Split Horizontally";
  splitH.innerHTML = `<i class="bi bi-hr"></i>`;

  const splitV = document.createElement("button");
  splitV.className = "btn btn-outline-secondary";
  splitV.title = "Split Vertically";
  splitV.innerHTML = `<i class="bi bi-vr"></i>`;

  splitGroup.append(splitH, splitV);

  const closeGroup = document.createElement("div");
  closeGroup.className = "btn-group";

  const closeBtn = document.createElement("button");
  closeBtn.className = "btn btn-outline-danger";
  closeBtn.title = "Close Pane";
  closeBtn.innerHTML = `<i class="bi bi-x-lg"></i>`;

  closeGroup.appendChild(closeBtn);

  bar.append(inputWrapper, splitGroup, closeGroup);

  // 📶 Progress bar
  const progressBar = document.createElement("div");
  progressBar.className = "progress";
  progressBar.style.height = "3px";
  progressBar.innerHTML = `<div class="progress-bar progress-bar-striped progress-bar-animated bg-primary d-none" role="progressbar" style="width: 0%"></div>`;

  // 🌐 Webview
  const view = document.createElement("webview");
  view.setAttribute("src", url || "https://example.com");
  view.setAttribute("useragent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0");
  view.setAttribute("allowpopups", "");
  view.setAttribute("sandbox", "");
  view.style.flex = "1 1 0%";

  // 🔗 Bookmark logic
  const loadBookmarks = () => {
    bookmarkList.innerHTML = "";
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (bookmarks.length === 0) {
      const empty = document.createElement("li");
      empty.className = "text-muted px-3 py-1";
      empty.textContent = "No bookmarks saved";
      bookmarkList.appendChild(empty);
      return;
    }
    bookmarks.forEach(({ url, title }) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.className = "btn btn-sm w-100 text-start text-truncate";
      btn.style.whiteSpace = "nowrap";
      btn.title = url;
      btn.innerHTML = `<i class="bi bi-bookmark text-warning me-2"></i>${title || url}`;
      btn.onclick = () => {
        view.setAttribute("src", url);
        bookmarkDropdown.classList.add("d-none");
      };
      li.appendChild(btn);
      bookmarkList.appendChild(li);
    });
  };

  bookmarksBtn.onclick = () => {
    const isOpen = !bookmarkDropdown.classList.contains("d-none");
    document.querySelectorAll(".position-absolute.bg-white").forEach(el => el.classList.add("d-none"));
    if (!isOpen) {
      loadBookmarks();
      bookmarkDropdown.classList.remove("d-none");
    }
  };

  document.addEventListener("click", (e) => {
    if (!inputWrapper.contains(e.target) && !bookmarksBtn.contains(e.target)) {
      bookmarkDropdown.classList.add("d-none");
    }
  });

  bookmarkBtn.onclick = () => {
    const currentURL = view.getURL();
    const title = view.getTitle() || currentURL;
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (!bookmarks.some(b => b.url === currentURL)) {
      bookmarks.push({ url: currentURL, title });
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      bookmarkBtn.innerHTML = `<i class="bi bi-star-fill"></i>`;
    }
  };

  goBtn.onclick = () => {
    let u = input.value.trim();
    if (!/^https?:\/\//i.test(u)) u = "https://" + u;
    isUserNavigating = true;
    view.setAttribute("src", u);
  };

  refreshBtn.onclick = () => view.reload();
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") goBtn.click();
  });

  view.addEventListener("did-start-loading", () => {
    goIcon.classList.add("d-none");
    spinnerIcon.classList.remove("d-none");
    progressBar.firstElementChild.classList.remove("d-none");
    progressBar.firstElementChild.style.width = "30%";
  });

  view.addEventListener("did-stop-loading", () => {
    spinnerIcon.classList.add("d-none");
    goIcon.classList.remove("d-none");
    progressBar.firstElementChild.style.width = "100%";
    setTimeout(() => {
      progressBar.firstElementChild.classList.add("d-none");
    }, 500);
    isUserNavigating = false;
  });

  view.addEventListener("did-fail-load", () => {
    spinnerIcon.classList.add("d-none");
    goIcon.classList.remove("d-none");
    progressBar.firstElementChild.style.width = "0%";
    isUserNavigating = false;
  });

  // Split handling
  splitH.onclick = () => splitPane(pane, true);
  splitV.onclick = () => splitPane(pane, false);
  closeBtn.onclick = () => pane.remove();

  pane.append(bar, progressBar, view);

  setTimeout(() => {
    input.focus();
    input.select();
  }, 0);

  return pane;
}

function initResizableSplit(paneA, paneB, direction = "horizontal") {
  const isHorizontal = direction === "horizontal";
  const container = paneA.parentNode;

  container.style.display = "flex";
  container.style.flexDirection = isHorizontal ? "row" : "column";

  // Create draggable gutter
  const gutter = document.createElement("div");
  gutter.className = `gutter ${isHorizontal ? "gutter-horizontal" : "gutter-vertical"}`;
  gutter.style[isHorizontal ? "height" : "width"] = "100%";

  container.insertBefore(gutter, paneB);

  // Initial sizing
  paneA.style.flex = "1";
  paneB.style.flex = "1";

  let dragging = false;

  gutter.addEventListener("mousedown", (e) => {
    e.preventDefault();
    dragging = true;
    document.body.style.cursor = gutter.style.cursor;
  });

  window.addEventListener("mouseup", () => {
    dragging = false;
    document.body.style.cursor = "";
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    const rect = container.getBoundingClientRect();
    const pos = isHorizontal ? e.clientX - rect.left : e.clientY - rect.top;
    const total = isHorizontal ? rect.width : rect.height;

    const percentA = Math.max(5, Math.min(95, (pos / total) * 100));
    const percentB = 100 - percentA;

    paneA.style.flex = `0 0 ${percentA}%`;
    paneB.style.flex = `0 0 ${percentB}%`;
  });
}


function splitPane(target, horizontal = false) {
  const wrapper = document.createElement("div");
  wrapper.className = "split d-flex";
  wrapper.style.flex = "1";
  wrapper.style.flexDirection = horizontal ? "column" : "row";

  const newPane = createPane();

  // Step 1: Insert a temporary placeholder before the target
  const placeholder = document.createElement("div");
  target.parentNode.insertBefore(placeholder, target);

  // Step 2: Remove target and insert wrapper in its place
  target.parentNode.removeChild(target);
  placeholder.replaceWith(wrapper);

  // Step 3: Append both panes without removing webview from DOM
  wrapper.appendChild(target);
  wrapper.appendChild(newPane);

  [target, newPane].forEach(p => {
    p.style.width = "100%";
    p.style.height = "100%";
  });

  Split([target, newPane], {
    direction: horizontal ? "vertical" : "horizontal",
    sizes: [50, 50],
    gutterSize: 6,
    cursor: horizontal ? "row-resize" : "col-resize",
  });
}

container.appendChild(createPane());
