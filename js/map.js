"use strict";

/*
  ==================================================
  会場・階・部屋・団体のデータ
  ==================================================

  x, y, width, heightは、600 × 720の地図内での位置です。

  organisationのcategoryは次のいずれかです。

  sports
  culture
  academic
  volunteering
*/

const venueData = {
  oic: {
    name: "OIC",

    floors: {
      3: {
        rooms: [
          {
            id: "as368",
            name: "AS368",
            organisations: [
              {
                name: "OIC Football Club",
                category: "sports"
              }
            ]
          },

          {
            id: "as358",
            name: "AS358",
            organisations: [
              {
                name: "Illustration Society",
                category: "culture"
              }
            ]
          },

          {
            id: "as357",
            name: "AS357",
            organisations: [
              {
                name: "Language Exchange Circle",
                category: "academic"
              }
            ]
          },

          {
            id: "as365",
            name: "AS365",
            organisations: [
              {
                name: "Basketball Club",
                category: "sports"
              }
            ]
          },

          {
            id: "as356",
            name: "AS356",
            organisations: [
              {
                name: "International Volunteers",
                category: "volunteering"
              }
            ]
          },

          {
            id: "as364",
            name: "AS364",
            organisations: [
              {
                name: "Photography Society",
                category: "culture"
              }
            ]
          },

          {
            id: "as363",
            name: "AS363",
            organisations: [
              {
                name: "Economics Study Group",
                category: "academic"
              }
            ]
          },

          {
            id: "as362",
            name: "AS362",
            organisations: [
              {
                name: "Tennis Club",
                category: "sports"
              }
            ]
          },

          {
            id: "as361",
            name: "AS361",
            organisations: [
              {
                name: "Community Support Group",
                category: "volunteering"
              }
            ]
          },

          {
            id: "ps-lounge",
            name: "PS Lounge",
            organisations: [
              {
                name: "Student Support Team",
                category: "volunteering"
              }
            ]
          },

          {
            id: "ac348",
            name: "AC348",
            organisations: [
              {
                name: "Programming Circle",
                category: "academic"
              }
            ]
          },

          {
            id: "ac338",
            name: "AC338",
            organisations: [
              {
                name: "Dance Club",
                category: "culture"
              }
            ]
          },

          {
            id: "ac337",
            name: "AC337",
            organisations: [
              {
                name: "Badminton Club",
                category: "sports"
              }
            ]
          },

          {
            id: "ac345",
            name: "AC345",
            organisations: [
              {
                name: "Debate Society",
                category: "academic"
              }
            ]
          },

          {
            id: "ac336",
            name: "AC336",
            organisations: [
              {
                name: "Film Appreciation Circle",
                category: "culture"
              }
            ]
          },

          {
            id: "ac344",
            name: "AC344",
            organisations: [
              {
                name: "Environmental Volunteers",
                category: "volunteering"
              }
            ]
          },

          {
            id: "ac343",
            name: "AC343",
            organisations: [
              {
                name: "Table Tennis Club",
                category: "sports"
              }
            ]
          },

          {
            id: "ac342",
            name: "AC342",
            organisations: [
              {
                name: "Research Association",
                category: "academic"
              }
            ]
          },

          {
            id: "ac341",
            name: "AC341",
            organisations: [
              {
                name: "Traditional Music Circle",
                category: "culture"
              }
            ]
          },

          {
            id: "ba-house",
            name: "BA House",
            organisations: [
              {
                name: "Business Administration Society",
                category: "academic"
              }
            ]
          },

          {
            id: "an328",
            name: "AN328",
            organisations: [
              {
                name: "Volleyball Club",
                category: "sports"
              }
            ]
          },

          {
            id: "an327",
            name: "AN327",
            organisations: [
              {
                name: "Art Circle",
                category: "culture"
              }
            ]
          },

          {
            id: "an325",
            name: "AN325",
            organisations: [
              {
                name: "Academic Research Society",
                category: "academic"
              }
            ]
          },

          {
            id: "an324",
            name: "AN324",
            organisations: [
              {
                name: "Local Community Volunteers",
                category: "volunteering"
              }
            ]
          },

          {
            id: "an323",
            name: "AN323",
            organisations: [
              {
                name: "Running Club",
                category: "sports"
              }
            ]
          },

          {
            id: "an322",
            name: "AN322",
            organisations: [
              {
                name: "Literature Circle",
                category: "culture"
              }
            ]
          },

          {
            id: "an321",
            name: "AN321",
            organisations: [
              {
                name: "Organisation A",
                category: "academic"
              },
              {
                name: "Organisation B",
                category: "volunteering"
              }
            ]
          },

          {
            id: "an316",
            name: "AN316",
            organisations: [
              {
                name: "Media Production Circle",
                category: "culture"
              }
            ]
          },

          {
            id: "student-lounge",
            name: "Student Lounge",
            organisations: [
              {
                name: "Student Volunteer Network",
                category: "volunteering"
              }
            ]
          },

          {
            id: "ac330",
            name: "AC330",
            organisations: [
              {
                name: "Technology Research Group",
                category: "academic"
              }
            ]
          },

          {
            id: "an310",
            name: "AN310",
            organisations: [
              {
                name: "Sports Association",
                category: "sports"
              }
            ]
          }
        ]
      }
    }
  }
};

const svgRoomElements =
  document.querySelectorAll("#oic3fMap .map-room");

svgRoomElements.forEach((roomElement) => {
  function openThisRoom() {
    const roomId = roomElement.dataset.roomId;
    const room = getRoomById(roomId);

    if (!room) {
      return;
    }

    openRoomPopup(room);
  }

  roomElement.addEventListener("click", () => {
  if (mapWasDragged) {
    mapWasDragged = false;
    return;
  }

  openThisRoom();
});

  roomElement.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      openThisRoom();
    }
  });
});

/*
  ==================================================
  現在の状態
  ==================================================
*/

let currentVenue = "oic";
let currentFloor = 3;
let activeCategory = null;
let searchText = "";

let mapWasDragged = false;

/*
  ==================================================
  HTML要素
  ==================================================
*/

const mapCanvas = document.querySelector("#mapCanvas");
const mapViewport = document.querySelector("#mapViewport");

const searchInput = document.querySelector("#organisationSearch");
const searchMessage = document.querySelector("#searchMessage");

const venueTabs = document.querySelectorAll(".venue-tab");
const floorButtons = document.querySelectorAll(".floor-button");
const categoryButtons = document.querySelectorAll(".category-button");

const zoomInButton = document.querySelector("#zoomInButton");
const zoomOutButton = document.querySelector("#zoomOutButton");

const roomPopup = document.querySelector("#roomPopup");
const closePopupButton = document.querySelector("#closePopupButton");

const popupRoomName = document.querySelector("#popupRoomName");
const popupCondition = document.querySelector("#popupCondition");
const popupOrganisationList =
  document.querySelector("#popupOrganisationList");

const roomPageLink = document.querySelector("#roomPageLink");

/*
  ==================================================
  地図を作る
  ==================================================
*/

function getCurrentRooms() {
  const venue = venueData[currentVenue];
  const floor = venue?.floors?.[currentFloor];

  return floor?.rooms ?? [];
}

function getRoomById(roomId) {
  return getCurrentRooms().find((room) => {
    return room.id === roomId;
  });
}

function renderMap() {
  const roomElements =
    document.querySelectorAll("#oic3fMap .map-room");

  const filterIsActive =
    searchText !== "" || activeCategory !== null;

  roomElements.forEach((roomElement) => {
    const roomId = roomElement.dataset.roomId;
    const room = getRoomById(roomId);

    roomElement.classList.remove(
      "has-match",
      "is-dimmed"
    );

    if (!room) {
      roomElement.classList.add("is-dimmed");
      return;
    }

    const matchingOrganisations =
      getMatchingOrganisations(room);

    if (
      filterIsActive &&
      matchingOrganisations.length > 0
    ) {
      roomElement.classList.add("has-match");
    }

    if (
      filterIsActive &&
      matchingOrganisations.length === 0
    ) {
      roomElement.classList.add("is-dimmed");
    }
  });

  updateSearchMessage();
}

/*
  会場ごとに別の地図の廊下を作ることもできます。
  今回は簡単なプロトタイプとして、共通の形を使います。
*/

function createCorridors() {
  const corridors = [
    {
      className: "corridor-horizontal",
      x: 42,
      y: 190,
      width: 515,
      height: 56
    },
    {
      className: "corridor-horizontal",
      x: 74,
      y: 365,
      width: 465,
      height: 64
    },
    {
      className: "corridor-vertical",
      x: 120,
      y: 40,
      width: 62,
      height: 590
    },
    {
      className: "corridor-vertical",
      x: 268,
      y: 40,
      width: 62,
      height: 590
    },
    {
      className: "corridor-vertical",
      x: 416,
      y: 40,
      width: 62,
      height: 590
    }
  ];

  corridors.forEach((corridorData) => {
    const corridor = document.createElement("div");

    corridor.className =
      `map-corridor ${corridorData.className}`;

    corridor.style.left = `${corridorData.x}px`;
    corridor.style.top = `${corridorData.y}px`;
    corridor.style.width = `${corridorData.width}px`;
    corridor.style.height = `${corridorData.height}px`;

    mapCanvas.appendChild(corridor);
  });
}

/*
  ==================================================
  検索条件
  ==================================================
*/

function getMatchingOrganisations(room) {
  return room.organisations.filter((organisation) => {
    const matchesSearch =
      searchText === "" ||
      organisation.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesCategory =
      activeCategory === null ||
      organisation.category === activeCategory;

    return matchesSearch && matchesCategory;
  });
}

function updateSearchMessage() {
  const filterIsActive =
    searchText !== "" || activeCategory !== null;

  if (!filterIsActive) {
    searchMessage.textContent =
      "Search by organisation name or choose a category.";
    return;
  }

  const rooms =
    venueData[currentVenue]
      .floors[currentFloor]
      .rooms;

  const matchingRoomCount = rooms.filter((room) => {
    return getMatchingOrganisations(room).length > 0;
  }).length;

  if (matchingRoomCount === 0) {
    searchMessage.textContent =
      "No matching organisations were found on this floor.";
  } else {
    searchMessage.textContent =
      `${matchingRoomCount} matching room(s) found.`;
  }
}

/*
  ==================================================
  部屋ポップアップ
  ==================================================
*/

function createHighlightedName(organisationName) {
  const fragment = document.createDocumentFragment();

  /*
    If there is no text search, show the full name normally.
    Category filtering alone does not highlight any letters.
  */
  if (searchText === "") {
    fragment.append(
      document.createTextNode(organisationName)
    );

    return fragment;
  }

  const lowerName = organisationName.toLowerCase();
  const lowerSearch = searchText.toLowerCase();

  let currentPosition = 0;
  let matchPosition = lowerName.indexOf(
    lowerSearch,
    currentPosition
  );

  while (matchPosition !== -1) {
    /*
      Add the normal text before the match.
    */
    const textBeforeMatch = organisationName.slice(
      currentPosition,
      matchPosition
    );

    if (textBeforeMatch) {
      fragment.append(
        document.createTextNode(textBeforeMatch)
      );
    }

    /*
      Add the matching section with a highlight.
    */
    const highlightedText = document.createElement("mark");

    highlightedText.className = "search-highlight";

    highlightedText.textContent = organisationName.slice(
      matchPosition,
      matchPosition + searchText.length
    );

    fragment.append(highlightedText);

    currentPosition =
      matchPosition + searchText.length;

    matchPosition = lowerName.indexOf(
      lowerSearch,
      currentPosition
    );
  }

  /*
    Add any text remaining after the final match.
  */
  const remainingText = organisationName.slice(
    currentPosition
  );

  if (remainingText) {
    fragment.append(
      document.createTextNode(remainingText)
    );
  }

  return fragment;
}

function openRoomPopup(room) {
  const filteredOrganisations =
    getMatchingOrganisations(room);

  const filterIsActive =
    searchText !== "" || activeCategory !== null;

  const organisationsToShow = filterIsActive
    ? filteredOrganisations
    : room.organisations;

  popupRoomName.textContent = room.name;

  if (filterIsActive) {
    popupCondition.textContent =
      "Organisations matching your current search:";
  } else {
    popupCondition.textContent =
      "Organisations in this room:";
  }

  popupOrganisationList.innerHTML = "";

  if (organisationsToShow.length === 0) {
    const noResult = document.createElement("p");

    noResult.className = "no-result";
    noResult.textContent =
      "No organisations in this room match the current criteria.";

    popupOrganisationList.appendChild(noResult);
  } else {
    organisationsToShow.forEach((organisation) => {
  const item = document.createElement("div");
  item.className = "organisation-item";

  const dot = document.createElement("span");
  dot.className = "organisation-dot";

  const name = document.createElement("span");

  name.appendChild(
    createHighlightedName(organisation.name)
  );

  item.append(dot, name);
  popupOrganisationList.appendChild(item);
});
  }

  const roomUrl = new URL(
    "room.html",
    window.location.href
  );

  roomUrl.searchParams.set("venue", currentVenue);
  roomUrl.searchParams.set("floor", currentFloor);
  roomUrl.searchParams.set("room", room.id);
  roomUrl.searchParams.set("name", room.name);

  roomPageLink.href = roomUrl.toString();
  roomPageLink.textContent = `Go to ${room.name}`;

  roomPopup.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeRoomPopup() {
  roomPopup.hidden = true;
  document.body.style.overflow = "";
}

/*
  ==================================================
  会場の切り替え
  ==================================================
*/

venueTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentVenue = tab.dataset.venue;

    venueTabs.forEach((otherTab) => {
      const isActive =
        otherTab.dataset.venue === currentVenue;

      otherTab.classList.toggle(
        "is-active",
        isActive
      );

      otherTab.setAttribute(
        "aria-selected",
        String(isActive)
      );
    });

    resetMapScroll();
    renderMap();
  });
});

/*
  ==================================================
  階数切り替え
  ==================================================
*/

floorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFloor = Number(button.dataset.floor);

    floorButtons.forEach((otherButton) => {
      otherButton.classList.toggle(
        "is-active",
        Number(otherButton.dataset.floor) ===
          currentFloor
      );
    });

    resetMapScroll();
    renderMap();
  });
});

/*
  ==================================================
  検索
  ==================================================
*/

searchInput.addEventListener("input", () => {
  searchText = searchInput.value.trim();
  renderMap();
});

/*
  ==================================================
  カテゴリー
  ==================================================
*/

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory =
      button.dataset.category;

    /*
      同じカテゴリーをもう一度押したら解除します。
    */

    if (activeCategory === selectedCategory) {
      activeCategory = null;
    } else {
      activeCategory = selectedCategory;
    }

    categoryButtons.forEach((otherButton) => {
      otherButton.classList.toggle(
        "is-active",
        otherButton.dataset.category ===
          activeCategory
      );
    });

    renderMap();
  });
});

/*
  ==================================================
  ズーム
  ==================================================
*/

/*
  ==================================================
  Touch zoom and pan
  ==================================================
*/

const mapViewport =
  document.querySelector("#mapViewport");

const mapTransformLayer =
  document.querySelector("#mapTransformLayer");

const zoomInButton =
  document.querySelector("#zoomInButton");

const zoomOutButton =
  document.querySelector("#zoomOutButton");

const MAP_WIDTH = 760;
const MAP_HEIGHT = 650;

let mapScale = 1;
let minimumMapScale = 1;
let maximumMapScale = 3.2;

let mapX = 0;
let mapY = 0;

const activePointers = new Map();

let previousSinglePointer = null;
let previousPinchDistance = null;
let previousPinchCenter = null;

function calculateInitialMapPosition() {
  const viewportWidth = mapViewport.clientWidth;
  const viewportHeight = mapViewport.clientHeight;

  const widthScale = viewportWidth / MAP_WIDTH;
  const heightScale = viewportHeight / MAP_HEIGHT;

  /*
    Fit the complete map inside the initial view.
  */
  minimumMapScale = Math.min(
    widthScale,
    heightScale
  );

  mapScale = minimumMapScale;

  mapX =
    (viewportWidth - MAP_WIDTH * mapScale) / 2;

  mapY =
    (viewportHeight - MAP_HEIGHT * mapScale) / 2;

  constrainMapPosition();
  applyMapTransform();
}

function applyMapTransform() {
  mapTransformLayer.style.transform =
    `translate(${mapX}px, ${mapY}px) scale(${mapScale})`;
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

function zoomAtPoint(newScale, screenX, screenY) {
  const limitedScale = Math.min(
    maximumMapScale,
    Math.max(minimumMapScale, newScale)
  );

  /*
    Convert the finger position into map coordinates
    before changing scale.
  */
  const mapPointX =
    (screenX - mapX) / mapScale;

  const mapPointY =
    (screenY - mapY) / mapScale;

  mapScale = limitedScale;

  /*
    Keep the same map point under the finger.
  */
  mapX =
    screenX - mapPointX * mapScale;

  mapY =
    screenY - mapPointY * mapScale;

  constrainMapPosition();
  applyMapTransform();
}

const movementX =
  currentPointer.x - previousSinglePointer.x;

const movementY =
  currentPointer.y - previousSinglePointer.y;

if (
  Math.abs(movementX) > 3 ||
  Math.abs(movementY) > 3
) {
  mapWasDragged = true;
}

mapX += movementX;
mapY += movementY;

mapViewport.addEventListener(
  "pointerdown",
  (event) => {
    
    mapViewport.setPointerCapture(event.pointerId);

    if (activePointers.size === 0) {
      mapWasDragged = false;
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

      previousPinchDistance =
        getDistance(points[0], points[1]);

      previousPinchCenter =
        getCenter(points[0], points[1]);

      previousSinglePointer = null;
    }
  }
);

mapViewport.addEventListener(
  "pointermove",
  (event) => {
    if (!activePointers.has(event.pointerId)) {
      return;
    }

    activePointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });

    if (
      activePointers.size === 1 &&
      previousSinglePointer
    ) {
      const currentPointer =
        [...activePointers.values()][0];

      mapX +=
        currentPointer.x -
        previousSinglePointer.x;

      mapY +=
        currentPointer.y -
        previousSinglePointer.y;

      previousSinglePointer = currentPointer;

      constrainMapPosition();
      applyMapTransform();
    }

    if (activePointers.size === 2) {
      const points = [...activePointers.values()];

      const currentDistance =
        getDistance(points[0], points[1]);

      const currentCenter =
        getCenter(points[0], points[1]);

      if (
        previousPinchDistance &&
        previousPinchCenter
      ) {
        const scaleChange =
          currentDistance / previousPinchDistance;

        /*
          Move the map along with the centre of
          the two fingers.
        */
        mapX +=
          currentCenter.x -
          previousPinchCenter.x;

        mapY +=
          currentCenter.y -
          previousPinchCenter.y;

        const viewportRect =
          mapViewport.getBoundingClientRect();

        const localCenterX =
          currentCenter.x - viewportRect.left;

        const localCenterY =
          currentCenter.y - viewportRect.top;

        zoomAtPoint(
          mapScale * scaleChange,
          localCenterX,
          localCenterY
        );
      }

      previousPinchDistance = currentDistance;
      previousPinchCenter = currentCenter;
    }
  }
);

function endPointer(event) {
  activePointers.delete(event.pointerId);

  if (activePointers.size === 0) {
    previousSinglePointer = null;
    previousPinchDistance = null;
    previousPinchCenter = null;

    mapViewport.classList.remove("is-dragging");
  }

  if (activePointers.size === 1) {
    const remainingPointer =
      [...activePointers.values()][0];

    previousSinglePointer = remainingPointer;

    previousPinchDistance = null;
    previousPinchCenter = null;
  }
}

mapViewport.addEventListener(
  "pointerup",
  endPointer
);

mapViewport.addEventListener(
  "pointercancel",
  endPointer
);

/*
  Zoom buttons
*/

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

/*
  Optional desktop trackpad/mouse-wheel zoom
*/

mapViewport.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();

    const viewportRect =
      mapViewport.getBoundingClientRect();

    const localX =
      event.clientX - viewportRect.left;

    const localY =
      event.clientY - viewportRect.top;

    const zoomMultiplier =
      event.deltaY < 0 ? 1.12 : 0.89;

    zoomAtPoint(
      mapScale * zoomMultiplier,
      localX,
      localY
    );
  },
  {
    passive: false
  }
);

/*
  Recalculate when the phone rotates.
*/

window.addEventListener("resize", () => {
  calculateInitialMapPosition();
});

calculateInitialMapPosition();

function resetMapScroll() {
  mapViewport.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}

/*
  ==================================================
  ポップアップを閉じる
  ==================================================
*/

closePopupButton.addEventListener(
  "click",
  closeRoomPopup
);

roomPopup.addEventListener("click", (event) => {
  if (event.target === roomPopup) {
    closeRoomPopup();
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    !roomPopup.hidden
  ) {
    closeRoomPopup();
  }
});

/*
  ==================================================
  初期表示
  ==================================================
*/

applyZoom();
renderMap();