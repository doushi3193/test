"use strict";

/* ===========================
   Project Settings
=========================== */

// ↓最初に表示される日程や階を変えたいときはここを変更↓ //
const START_VENUE = "first";   
const START_FLOOR = 4;      
// ↑最初に表示される日程や階を変えたいときはここを変更↑ //

const DEFAULT_FLOORS = {
    first: 1,
    second: 1
};

let currentVenue = START_VENUE;
let currentFloor = START_FLOOR;

let activeCategory = null;
let searchText = "";

const floorMap = document.querySelector("#floorMap");
const floorLayouts = document.querySelectorAll(".floor-layout");
const mapViewport = document.querySelector("#mapViewport");
const mapTransformLayer = document.querySelector("#mapTransformLayer");
const searchInput = document.querySelector("#organisationSearch");
const searchMessage = document.querySelector("#searchMessage");
const venueTabs = document.querySelectorAll(".venue-tab");
let floorButtons = document.querySelectorAll(".floor-button");
const categoryButtons = document.querySelectorAll(".category-button");
const zoomInButton = document.querySelector("#zoomInButton");
const zoomOutButton = document.querySelector("#zoomOutButton");
const roomPopup = document.querySelector("#roomPopup");
const closePopupButton = document.querySelector("#closePopupButton");
const popupRoomName = document.querySelector("#popupRoomName");
const popupCondition = document.querySelector("#popupCondition");
const popupOrganisationList = document.querySelector("#popupOrganisationList");
const roomPageLink = document.querySelector("#roomPageLink");
const organisationPopup =
  document.querySelector("#organisationPopup");

const closeOrganisationPopupButton =
  document.querySelector("#closeOrganisationPopupButton");

const popupOrganisationName =
  document.querySelector("#popupOrganisationName");

const popupBoothName =
  document.querySelector("#popupBoothName");

const organisationWebsiteLink =
  document.querySelector("#organisationWebsiteLink");

const readNfcButton =
  document.querySelector("#readNfcButton");

const nfcStatus =
  document.querySelector("#nfcStatus");

const popupStampImage =
  document.querySelector("#popupStampImage");

// delete me //
const testStampButton =
  document.querySelector("#testStampButton");
// delete me //

let selectedOrganisation = null;
let selectedBooth = null;
let nfcAbortController = null;

const STAMP_STORAGE_KEY = "welcomeFestivalCollectedStamps";

// delete me //
testStampButton.addEventListener("click", () => {
  collectSelectedStamp();
});
// delete me //

function getCollectedStampIds() {
  const savedValue =
    localStorage.getItem(STAMP_STORAGE_KEY);

  if (!savedValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(savedValue);

    return Array.isArray(parsedValue)
      ? parsedValue
      : [];
  } catch (error) {
    console.error(
      "スタンプ獲得状況の読み込みに失敗しました",
      error
    );

    return [];
  }
}

function hasCollectedStamp(organisationId) {
  return getCollectedStampIds().includes(
    organisationId
  );
}

function saveCollectedStamp(organisationId) {
  const collectedStampIds =
    getCollectedStampIds();

  if (!collectedStampIds.includes(organisationId)) {
    collectedStampIds.push(organisationId);

    localStorage.setItem(
      STAMP_STORAGE_KEY,
      JSON.stringify(collectedStampIds)
    );
  }
}

const requiredElements = [
  floorMap,
  mapViewport,
  mapTransformLayer,
  searchInput,
  searchMessage,
  zoomInButton,
  zoomOutButton,
  roomPopup,
  closePopupButton,
  popupRoomName,
  popupCondition,
  popupOrganisationList,
  roomPageLink
];

if (requiredElements.some((element) => !element)) {
  throw new Error(
    "The HTML does not match map.js. Make sure all three replacement files were uploaded."
  );
}

function openOrganisationPopup(booth) {
  selectedBooth = booth;
  selectedOrganisation = booth.organisation;

  popupOrganisationName.textContent =
    selectedOrganisation.name;

  popupBoothName.textContent =
    `B Hall / ${booth.label}`;

  if (selectedOrganisation.stampImage) {
  popupStampImage.src =
    selectedOrganisation.stampImage;

  popupStampImage.alt =
    `${selectedOrganisation.name}のスタンプ`;

  popupStampImage.hidden = false;
} else {
  popupStampImage.src = "";
  popupStampImage.alt = "";
  popupStampImage.hidden = true;
}

  organisationWebsiteLink.href =
    selectedOrganisation.website;

  nfcStatus.textContent =
    hasCollectedStamp(selectedOrganisation.id)
      ? "このスタンプはすでに獲得済みです"
      : "ボタンを押した後に団体のNFCタグに端末をかざしてください";

  nfcStatus.className = "nfc-status";

  readNfcButton.disabled = false;
  readNfcButton.classList.remove("is-reading");
  readNfcButton.textContent = "NFCタグを読み取る";

  organisationPopup.hidden = false;
  document.body.style.overflow = "hidden";

  closeOrganisationPopupButton.focus();
}

function stopNfcReading() {
  if (nfcAbortController) {
    nfcAbortController.abort();
    nfcAbortController = null;
  }
}

function closeOrganisationPopup() {
  stopNfcReading();

  organisationPopup.hidden = true;
  document.body.style.overflow = "";

  selectedOrganisation = null;
  selectedBooth = null;
}

closeOrganisationPopupButton.addEventListener(
  "click",
  closeOrganisationPopup
);

organisationPopup.addEventListener(
  "click",
  (event) => {
    if (event.target === organisationPopup) {
      closeOrganisationPopup();
    }
  }
);

readNfcButton.addEventListener("click", () => {
  collectSelectedStamp();
});

function getCurrentFloorData() {
  return venueData[currentVenue]?.floors?.[currentFloor] ?? null;
}

function getCurrentRooms() {
  return getCurrentFloorData()?.rooms ?? [];
}

function getRoomById(roomId) {
  return getCurrentRooms().find((room) => room.id === roomId);
}

function getCurrentBooths() {
  return getCurrentFloorData()?.booths ?? [];
}

function getBoothById(boothId) {
  return getCurrentBooths().find(
    (booth) => booth.id === boothId
  );
}

function collectSelectedStamp() {
  if (!selectedOrganisation || !selectedBooth) return;

  const organisation = selectedOrganisation;
  const booth = selectedBooth;

  saveCollectedStamp(organisation.id);

  const boothElement = floorMap.querySelector(
    `[data-booth-id="${CSS.escape(booth.id)}"]`
  );

  closeOrganisationPopup();

  if (!boothElement) return;

  boothElement.classList.add("is-stamped");

  renderBoothStamp(
    boothElement,
    organisation
  );
}

function renderBoothStamp(boothElement, organisation) {
  if (boothElement.querySelector(".booth-stamp")) {
    return;
  }

  const rect =
    boothElement.querySelector(".booth-area");

  if (!rect) return;

  const x = Number(rect.getAttribute("x"));
  const y = Number(rect.getAttribute("y"));
  const width = Number(rect.getAttribute("width"));
  const height = Number(rect.getAttribute("height"));

  const stampSize = Math.min(width, height) * 0.7;

  const stamp = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "image"
  );

  stamp.setAttribute("class", "booth-stamp");

  stamp.setAttribute(
    "href",
    organisation.stampImage
  );

  stamp.setAttribute(
    "x",
    x + (width - stampSize) / 2
  );

  stamp.setAttribute(
    "y",
    y + (height - stampSize) / 2
  );

  stamp.setAttribute("width", stampSize);
  stamp.setAttribute("height", stampSize);

  stamp.setAttribute(
    "preserveAspectRatio",
    "xMidYMid meet"
  );

  stamp.setAttribute(
    "pointer-events",
    "none"
  );

  boothElement.append(stamp);
}

function renderCollectedBoothStamps() {
  getCurrentBooths().forEach((booth) => {
    const organisation = booth.organisation;

    if (!organisation) return;

    const boothElement = floorMap.querySelector(
      `[data-booth-id="${CSS.escape(booth.id)}"]`
    );

    if (!boothElement) return;

    if (hasCollectedStamp(organisation.id)) {
      boothElement.classList.add("is-stamped");

      renderBoothStamp(
        boothElement,
        organisation
      );
    }
  });
}

function getMatchingOrganisations(room) {
  const normalisedSearch = searchText.trim().toLowerCase();

  return room.organisations.filter((organisation) => {
    const matchesSearch =
      normalisedSearch === "" ||
      organisation.name.toLowerCase().includes(normalisedSearch);

    const matchesCategory =
      activeCategory === null ||
      organisation.category === activeCategory;

    return matchesSearch && matchesCategory;
  });
}

function showCurrentFloorLayout() {
  floorLayouts.forEach((layout) => {
    const layoutFloor = Number(layout.dataset.floorLayout);

    const isCurrent = layoutFloor === currentFloor;

    layout.classList.toggle("is-active", isCurrent);
    layout.style.display = isCurrent ? "inline" : "none";
    layout.setAttribute("aria-hidden", String(!isCurrent));
  });

  floorMap.setAttribute(
    "aria-label",
    `${venueData[currentVenue].name} ${currentFloor}F map`
  );
}

function renderMap() {
  showCurrentFloorLayout();

  const currentLayout =
    floorMap.querySelector(
      `[data-floor-layout="${currentFloor}"]`
    );

  if (!currentLayout) {
    updateSearchMessage();
    return;
  }

  const roomElements =
    currentLayout.querySelectorAll(".map-room");

  const boothElements =
  currentLayout.querySelectorAll(".map-booth");

  const filterIsActive =
    searchText !== "" ||
    activeCategory !== null;

  const categoryColours = {
    central: "#A10000",
    sports: "#1E6BC1",
    culture: "#EAAE14",
    "research-volunteering": "#C4A3CB"
  };

  roomElements.forEach((roomElement) => {
    const room =
      getRoomById(roomElement.dataset.roomId);

    roomElement.classList.remove(
      "has-match",
      "is-dimmed"
    );

    roomElement.style.removeProperty(
      "--room-highlight-color"
    );

    if (!room) {
      roomElement.classList.add("is-dimmed");
      return;
    }

    if (!filterIsActive) {
      return;
    }

    const matches =
      getMatchingOrganisations(room).length > 0;

    if (matches) {
      roomElement.classList.add("has-match");

      if (
        activeCategory !== null &&
        categoryColours[activeCategory]
      ) {
        roomElement.style.setProperty(
          "--room-highlight-color",
          categoryColours[activeCategory]
        );
      }
    } else {
      roomElement.classList.add("is-dimmed");
    }
  });

boothElements.forEach((boothElement) => {
  const booth =
    getBoothById(boothElement.dataset.boothId);

  boothElement.classList.remove(
    "has-match",
    "is-dimmed"
  );

  boothElement.style.removeProperty(
    "--booth-highlight-color"
  );

  if (!booth || !booth.organisation) {
    boothElement.classList.add("is-dimmed");
    return;
  }

  if (!filterIsActive) {
    return;
  }

  const organisation = booth.organisation;

  const normalisedSearch =
    searchText.trim().toLowerCase();

  const matchesSearch =
    normalisedSearch === "" ||
    organisation.name
      .toLowerCase()
      .includes(normalisedSearch);

  const matchesCategory =
    activeCategory === null ||
    organisation.category === activeCategory;

  const matches =
    matchesSearch && matchesCategory;

  if (matches) {
    boothElement.classList.add("has-match");

    if (
      activeCategory !== null &&
      categoryColours[activeCategory]
    ) {
      boothElement.style.setProperty(
        "--booth-highlight-color",
        categoryColours[activeCategory]
      );
    }
  } else {
    boothElement.classList.add("is-dimmed");
  }
});

  updateSearchMessage();

if (currentFloor === 4) {
  renderCollectedBoothStamps();
}
}

function updateSearchMessage() {
  const filterIsActive = searchText !== "" || activeCategory !== null;

  if (!getCurrentFloorData()) {
    searchMessage.textContent =
      "This floor has not been added yet.";
    return;
  }

  const visibleLayout = floorMap.querySelector(
    `[data-floor-layout="${currentFloor}"]`
  );

  if (!visibleLayout) {
    searchMessage.textContent =
      `${venueData[currentVenue].name} ${currentFloor}F map has not been added yet.`;
    return;
  }

  if (!filterIsActive) {
    searchMessage.textContent =
      "団体名で検索　またはカテゴリーを選択してください";
    return;
  }

  const matchingRoomCount = getCurrentRooms().filter(
    (room) => getMatchingOrganisations(room).length > 0
  ).length;

  if (matchingRoomCount === 0) {
    searchMessage.textContent =
      "条件に当てはまる団体のこの階への出展はありません";
  } else if (matchingRoomCount === 1) {
    searchMessage.textContent = "検索結果　1件";
  } else {
    searchMessage.textContent =
      `検索結果　${matchingRoomCount}件`;
  }
}

function createHighlightedName(organisationName) {
  const fragment = document.createDocumentFragment();
  const cleanSearch = searchText.trim();

  if (cleanSearch === "") {
    fragment.append(document.createTextNode(organisationName));
    return fragment;
  }

  const lowerName = organisationName.toLowerCase();
  const lowerSearch = cleanSearch.toLowerCase();

  let currentPosition = 0;
  let matchPosition = lowerName.indexOf(lowerSearch, currentPosition);

  while (matchPosition !== -1) {
    const textBeforeMatch = organisationName.slice(
      currentPosition,
      matchPosition
    );

    if (textBeforeMatch !== "") {
      fragment.append(document.createTextNode(textBeforeMatch));
    }

    const highlightedText = document.createElement("mark");
    highlightedText.className = "search-highlight";
    highlightedText.textContent = organisationName.slice(
      matchPosition,
      matchPosition + cleanSearch.length
    );

    fragment.append(highlightedText);

    currentPosition = matchPosition + cleanSearch.length;
    matchPosition = lowerName.indexOf(lowerSearch, currentPosition);
  }

  const remainingText = organisationName.slice(currentPosition);

  if (remainingText !== "") {
    fragment.append(document.createTextNode(remainingText));
  }

  return fragment;
}

function openRoomPopup(room) {
  roomPageLink.hidden = false;
  const filterIsActive = searchText !== "" || activeCategory !== null;

  const organisationsToShow = filterIsActive
    ? getMatchingOrganisations(room)
    : room.organisations;

  popupRoomName.textContent = room.name;
  popupCondition.textContent = filterIsActive
    ? "検索にヒットした団体:"
    : "この部屋に出展している団体:";

  popupOrganisationList.replaceChildren();

  if (organisationsToShow.length === 0) {
    const noResult = document.createElement("p");
    noResult.className = "no-result";
    noResult.textContent =
      filterIsActive
        ? "この部屋には条件に当てはまる団体の出展はありません"
        : "団体情報未登録";
    popupOrganisationList.append(noResult);
  } else {
    organisationsToShow.forEach((organisation) => {
      const item = document.createElement("div");
      item.className = "organisation-item";

      const dot = document.createElement("span");
      dot.className = "organisation-dot";

      const name = document.createElement("span");
      name.append(createHighlightedName(organisation.name));

      item.append(dot, name);
      popupOrganisationList.append(item);
    });
  }

  const roomUrl = new URL("room.html", window.location.href);
  roomUrl.searchParams.set("venue", currentVenue);
  roomUrl.searchParams.set("floor", String(currentFloor));
  roomUrl.searchParams.set("room", room.id);
  roomUrl.searchParams.set("name", room.name);

  roomPageLink.href = roomUrl.toString();
  roomPageLink.textContent = `${room.name} へ`;

  roomPopup.hidden = false;
  document.body.style.overflow = "hidden";
  closePopupButton.focus();
}

function closeRoomPopup() {
  roomPopup.hidden = true;
  document.body.style.overflow = "";
}

let suppressNextRoomClick = false;

floorMap.querySelectorAll(".map-room").forEach((roomElement) => {
  function openThisRoom() {
    const room = getRoomById(roomElement.dataset.roomId);

    if (room) {
      openRoomPopup(room);
    }
  }

  roomElement.addEventListener("click", () => {
    if (suppressNextRoomClick) {
      suppressNextRoomClick = false;
      return;
    }

    openThisRoom();
  });

  roomElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openThisRoom();
    }
  });
});

floorMap.querySelectorAll(".map-booth").forEach((boothElement) => {

  function openThisBooth() {
    const booth = getBoothById(
      boothElement.dataset.boothId
    );

    if (booth) {
      openOrganisationPopup(booth);
    }
  }

  boothElement.addEventListener("click", () => {
    openThisBooth();
  });

  boothElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openThisBooth();
    }
  });

});

function updateVenueTabs() {
  venueTabs.forEach((tab) => {
    const isActive = tab.dataset.venue === currentVenue;

    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

function renderFloorButtons() {
  const floorSwitch = document.querySelector(".floor-switch");
  const floors = Object.keys(venueData[currentVenue].floors).map(Number);

  floorSwitch.replaceChildren();
  floorSwitch.classList.toggle("has-five-floors", floors.length === 5);

  floors.forEach((floor) => {
    const button = document.createElement("button");
    button.className = "floor-button";
    button.type = "button";
    button.dataset.floor = String(floor);
    button.textContent = venueData[currentVenue].floors[floor].name;

    const isActive = floor === currentFloor;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));

    button.addEventListener("click", () => {
      currentFloor = floor;
      renderFloorButtons();
      resetMapView();
      renderMap();
    });

    floorSwitch.append(button);
  });

  floorButtons = document.querySelectorAll(".floor-button");
}

venueTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const requestedVenue = tab.dataset.venue;

    if (!venueData[requestedVenue]) {
      return;
    }

    currentVenue = requestedVenue;
    currentFloor = DEFAULT_FLOORS[currentVenue];

    updateVenueTabs();
    renderFloorButtons();
    resetMapView();
    renderMap();
  });
});

searchInput.addEventListener("input", () => {
  searchText = searchInput.value.trim();
  renderMap();
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.category;

    activeCategory =
      activeCategory === selectedCategory ? null : selectedCategory;

    categoryButtons.forEach((otherButton) => {
      const isActive =
        otherButton.dataset.category === activeCategory;

      otherButton.classList.toggle("is-active", isActive);
      otherButton.setAttribute("aria-pressed", String(isActive));
    });

    renderMap();
  });
});

const MAP_WIDTH = 760;
const MAP_HEIGHT = 650;

let mapScale = 1;
let minimumMapScale = 1;
const maximumMapScale = 4;

let mapX = 0;
let mapY = 0;

const activePointers = new Map();

let previousSinglePointer = null;
let previousPinchDistance = null;
let previousPinchCenter = null;

const DRAG_THRESHOLD = 5;
let totalDragDistance = 0;
let mapWasDragged = false;

function applyMapTransform() {
  mapTransformLayer.style.transform =
    `translate(${mapX}px, ${mapY}px) scale(${mapScale})`;
}

function calculateInitialMapPosition() {
  const viewportWidth = mapViewport.clientWidth;
  const viewportHeight = mapViewport.clientHeight;

  const widthScale = viewportWidth / MAP_WIDTH;
  const heightScale = viewportHeight / MAP_HEIGHT;

  minimumMapScale = Math.min(widthScale, heightScale) * 0.94;
  mapScale = minimumMapScale;

  mapX = (viewportWidth - MAP_WIDTH * mapScale) / 2;
  mapY = (viewportHeight - MAP_HEIGHT * mapScale) / 2;

  constrainMapPosition();
  applyMapTransform();
}

function resetMapView() {
  calculateInitialMapPosition();
}

function constrainMapPosition() {
  const viewportWidth = mapViewport.clientWidth;
  const viewportHeight = mapViewport.clientHeight;

  const scaledWidth = MAP_WIDTH * mapScale;
  const scaledHeight = MAP_HEIGHT * mapScale;

  if (scaledWidth <= viewportWidth) {
    mapX = (viewportWidth - scaledWidth) / 2;
  } else {
    const minimumX = viewportWidth - scaledWidth;
    mapX = Math.min(0, Math.max(minimumX, mapX));
  }

  if (scaledHeight <= viewportHeight) {
    mapY = (viewportHeight - scaledHeight) / 2;
  } else {
    const minimumY = viewportHeight - scaledHeight;
    mapY = Math.min(0, Math.max(minimumY, mapY));
  }
}

function getDistance(firstPoint, secondPoint) {
  return Math.hypot(
    secondPoint.x - firstPoint.x,
    secondPoint.y - firstPoint.y
  );
}

function getCenter(firstPoint, secondPoint) {
  return {
    x: (firstPoint.x + secondPoint.x) / 2,
    y: (firstPoint.y + secondPoint.y) / 2
  };
}

function zoomAtPoint(newScale, viewportX, viewportY) {
  const limitedScale = Math.min(
    maximumMapScale,
    Math.max(minimumMapScale, newScale)
  );

  const mapPointX = (viewportX - mapX) / mapScale;
  const mapPointY = (viewportY - mapY) / mapScale;

  mapScale = limitedScale;

  mapX = viewportX - mapPointX * mapScale;
  mapY = viewportY - mapPointY * mapScale;

  constrainMapPosition();
  applyMapTransform();
}

mapViewport.addEventListener("pointerdown", (event) => {
  event.preventDefault();

  if (activePointers.size === 0) {
    mapWasDragged = false;
    totalDragDistance = 0;
  }

  try {
    mapViewport.setPointerCapture(event.pointerId);
  } catch (error) {
    // Pointer capture is not supported everywhere.
  }

  activePointers.set(event.pointerId, {
    x: event.clientX,
    y: event.clientY
  });

  mapViewport.classList.add("is-dragging");

  if (activePointers.size === 1) {
    previousSinglePointer = {
      x: event.clientX,
      y: event.clientY
    };
  }

  if (activePointers.size === 2) {
    const points = [...activePointers.values()];

    previousPinchDistance = getDistance(points[0], points[1]);
    previousPinchCenter = getCenter(points[0], points[1]);

    previousSinglePointer = null;
    mapWasDragged = true;
  }
});

mapViewport.addEventListener("pointermove", (event) => {
  if (!activePointers.has(event.pointerId)) {
    return;
  }

  event.preventDefault();

  activePointers.set(event.pointerId, {
    x: event.clientX,
    y: event.clientY
  });

  if (activePointers.size === 1 && previousSinglePointer) {
    const currentPointer = [...activePointers.values()][0];

    const movementX =
      currentPointer.x - previousSinglePointer.x;

    const movementY =
      currentPointer.y - previousSinglePointer.y;

    totalDragDistance += Math.hypot(movementX, movementY);

    if (totalDragDistance > DRAG_THRESHOLD) {
      mapWasDragged = true;
    }

    mapX += movementX;
    mapY += movementY;

    previousSinglePointer = currentPointer;

    constrainMapPosition();
    applyMapTransform();
  }

  if (activePointers.size === 2) {
    const points = [...activePointers.values()];

    const currentDistance = getDistance(points[0], points[1]);
    const currentCenter = getCenter(points[0], points[1]);

    if (
      previousPinchDistance !== null &&
      previousPinchCenter !== null
    ) {
      const scaleChange =
        currentDistance / previousPinchDistance;

      mapX += currentCenter.x - previousPinchCenter.x;
      mapY += currentCenter.y - previousPinchCenter.y;

      const viewportRectangle =
        mapViewport.getBoundingClientRect();

      const localCenterX =
        currentCenter.x - viewportRectangle.left;

      const localCenterY =
        currentCenter.y - viewportRectangle.top;

      zoomAtPoint(
        mapScale * scaleChange,
        localCenterX,
        localCenterY
      );
    }

    previousPinchDistance = currentDistance;
    previousPinchCenter = currentCenter;
    mapWasDragged = true;
  }
});

function endPointer(event) {
  if (!activePointers.has(event.pointerId)) {
    return;
  }

  activePointers.delete(event.pointerId);

  try {
    mapViewport.releasePointerCapture(event.pointerId);
  } catch (error) {
    // Ignore browsers that did not capture the pointer.
  }

  if (activePointers.size === 0) {
    previousSinglePointer = null;
    previousPinchDistance = null;
    previousPinchCenter = null;

    mapViewport.classList.remove("is-dragging");

    if (mapWasDragged) {
      suppressNextRoomClick = true;

      window.setTimeout(() => {
        suppressNextRoomClick = false;
      }, 250);
    }
  }

  if (activePointers.size === 1) {
    const remainingPointer = [...activePointers.values()][0];

    previousSinglePointer = remainingPointer;
    previousPinchDistance = null;
    previousPinchCenter = null;
  }
}

mapViewport.addEventListener("pointerup", endPointer);
mapViewport.addEventListener("pointercancel", endPointer);

mapViewport.addEventListener("lostpointercapture", (event) => {
  activePointers.delete(event.pointerId);
});

zoomInButton.addEventListener("click", () => {
  zoomAtPoint(
    mapScale * 1.25,
    mapViewport.clientWidth / 2,
    mapViewport.clientHeight / 2
  );
});

zoomOutButton.addEventListener("click", () => {
  zoomAtPoint(
    mapScale / 1.25,
    mapViewport.clientWidth / 2,
    mapViewport.clientHeight / 2
  );
});

mapViewport.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();

    const viewportRectangle =
      mapViewport.getBoundingClientRect();

    const localX = event.clientX - viewportRectangle.left;
    const localY = event.clientY - viewportRectangle.top;

    const zoomMultiplier = event.deltaY < 0 ? 1.12 : 0.89;

    zoomAtPoint(
      mapScale * zoomMultiplier,
      localX,
      localY
    );
  },
  { passive: false }
);

closePopupButton.addEventListener("click", closeRoomPopup);

roomPopup.addEventListener("click", (event) => {
  if (event.target === roomPopup) {
    closeRoomPopup();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !roomPopup.hidden) {
    closeRoomPopup();
  }
});

let resizeTimer = null;

window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);

  resizeTimer = window.setTimeout(() => {
    calculateInitialMapPosition();
  }, 100);
});

updateVenueTabs();
renderFloorButtons();
calculateInitialMapPosition();
renderMap();