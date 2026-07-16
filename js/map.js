"use strict";

/*
  ==================================================
  VENUE, FLOOR, ROOM, AND ORGANISATION DATA
  ==================================================

  This prototype currently contains the OIC 3F SVG map.

  Each room ID must exactly match the data-room-id
  value used in index.html.
*/

const venueData = {
  oic: {
    name: "OIC",

    floors: {
      3: {
        name: "3F",

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

/*
  ==================================================
  CURRENT PAGE STATE
  ==================================================
*/

let currentVenue = "oic";
let currentFloor = 3;

let activeCategory = null;
let searchText = "";

/*
  ==================================================
  HTML ELEMENTS
  ==================================================
*/

const floorMap =
  document.querySelector("#floorMap");

const mapViewport =
  document.querySelector("#mapViewport");

const mapTransformLayer =
  document.querySelector("#mapTransformLayer");

const searchInput =
  document.querySelector("#organisationSearch");

const searchMessage =
  document.querySelector("#searchMessage");

const venueTabs =
  document.querySelectorAll(".venue-tab");

const floorButtons =
  document.querySelectorAll(".floor-button");

const categoryButtons =
  document.querySelectorAll(".category-button");

const zoomInButton =
  document.querySelector("#zoomInButton");

const zoomOutButton =
  document.querySelector("#zoomOutButton");

const roomPopup =
  document.querySelector("#roomPopup");

const closePopupButton =
  document.querySelector("#closePopupButton");

const popupRoomName =
  document.querySelector("#popupRoomName");

const popupCondition =
  document.querySelector("#popupCondition");

const popupOrganisationList =
  document.querySelector("#popupOrganisationList");

const roomPageLink =
  document.querySelector("#roomPageLink");

/*
  Stop immediately and show a useful error if the HTML
  and JavaScript file do not match.
*/

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
    "The HTML does not match map.js. " +
    "Make sure you replaced the complete index.html file."
  );
}

/*
  ==================================================
  ROOM DATA HELPERS
  ==================================================
*/

function getCurrentFloorData() {
  return venueData[currentVenue]?.floors?.[currentFloor] ?? null;
}

function getCurrentRooms() {
  return getCurrentFloorData()?.rooms ?? [];
}

function getRoomById(roomId) {
  return getCurrentRooms().find((room) => {
    return room.id === roomId;
  });
}

/*
  ==================================================
  SEARCH AND FILTERING
  ==================================================
*/

function getMatchingOrganisations(room) {
  const normalisedSearch =
    searchText.trim().toLowerCase();

  return room.organisations.filter((organisation) => {
    const matchesSearch =
      normalisedSearch === "" ||
      organisation.name
        .toLowerCase()
        .includes(normalisedSearch);

    const matchesCategory =
      activeCategory === null ||
      organisation.category === activeCategory;

    return matchesSearch && matchesCategory;
  });
}

function renderMap() {
  const roomElements =
    floorMap.querySelectorAll(".map-room");

  const filterIsActive =
    searchText !== "" ||
    activeCategory !== null;

  roomElements.forEach((roomElement) => {
    const roomId =
      roomElement.dataset.roomId;

    const room =
      getRoomById(roomId);

    roomElement.classList.remove(
      "has-match",
      "is-dimmed"
    );

    if (!room) {
      roomElement.classList.add("is-dimmed");
      return;
    }

    if (!filterIsActive) {
      return;
    }

    const matchingOrganisations =
      getMatchingOrganisations(room);

    if (matchingOrganisations.length > 0) {
      roomElement.classList.add("has-match");
    } else {
      roomElement.classList.add("is-dimmed");
    }
  });

  updateSearchMessage();
}

function updateSearchMessage() {
  const filterIsActive =
    searchText !== "" ||
    activeCategory !== null;

  if (!getCurrentFloorData()) {
    searchMessage.textContent =
      "This map has not been added to the prototype yet.";

    return;
  }

  if (!filterIsActive) {
    searchMessage.textContent =
      "Search by organisation name or choose a category.";

    return;
  }

  const matchingRoomCount =
    getCurrentRooms().filter((room) => {
      return getMatchingOrganisations(room).length > 0;
    }).length;

  if (matchingRoomCount === 0) {
    searchMessage.textContent =
      "No matching organisations were found on this floor.";
  } else if (matchingRoomCount === 1) {
    searchMessage.textContent =
      "1 matching room found.";
  } else {
    searchMessage.textContent =
      `${matchingRoomCount} matching rooms found.`;
  }
}

/*
  ==================================================
  SEARCH-TEXT HIGHLIGHTING
  ==================================================
*/

function createHighlightedName(organisationName) {
  const fragment =
    document.createDocumentFragment();

  const cleanSearch =
    searchText.trim();

  if (cleanSearch === "") {
    fragment.append(
      document.createTextNode(organisationName)
    );

    return fragment;
  }

  const lowerName =
    organisationName.toLowerCase();

  const lowerSearch =
    cleanSearch.toLowerCase();

  let currentPosition = 0;

  let matchPosition =
    lowerName.indexOf(
      lowerSearch,
      currentPosition
    );

  while (matchPosition !== -1) {
    const textBeforeMatch =
      organisationName.slice(
        currentPosition,
        matchPosition
      );

    if (textBeforeMatch !== "") {
      fragment.append(
        document.createTextNode(textBeforeMatch)
      );
    }

    const highlightedText =
      document.createElement("mark");

    highlightedText.className =
      "search-highlight";

    highlightedText.textContent =
      organisationName.slice(
        matchPosition,
        matchPosition + cleanSearch.length
      );

    fragment.append(highlightedText);

    currentPosition =
      matchPosition + cleanSearch.length;

    matchPosition =
      lowerName.indexOf(
        lowerSearch,
        currentPosition
      );
  }

  const remainingText =
    organisationName.slice(currentPosition);

  if (remainingText !== "") {
    fragment.append(
      document.createTextNode(remainingText)
    );
  }

  return fragment;
}

/*
  ==================================================
  ROOM POPUP
  ==================================================
*/

function openRoomPopup(room) {
  const filterIsActive =
    searchText !== "" ||
    activeCategory !== null;

  const organisationsToShow =
    filterIsActive
      ? getMatchingOrganisations(room)
      : room.organisations;

  popupRoomName.textContent =
    room.name;

  popupCondition.textContent =
    filterIsActive
      ? "Organisations matching your current search:"
      : "Organisations in this room:";

  popupOrganisationList.replaceChildren();

  if (organisationsToShow.length === 0) {
    const noResult =
      document.createElement("p");

    noResult.className =
      "no-result";

    noResult.textContent =
      "No organisations in this room match the current criteria.";

    popupOrganisationList.append(noResult);
  } else {
    organisationsToShow.forEach((organisation) => {
      const item =
        document.createElement("div");

      item.className =
        "organisation-item";

      const dot =
        document.createElement("span");

      dot.className =
        "organisation-dot";

      const name =
        document.createElement("span");

      name.append(
        createHighlightedName(organisation.name)
      );

      item.append(dot, name);
      popupOrganisationList.append(item);
    });
  }

  const roomUrl =
    new URL(
      "room.html",
      window.location.href
    );

  roomUrl.searchParams.set(
    "venue",
    currentVenue
  );

  roomUrl.searchParams.set(
    "floor",
    String(currentFloor)
  );

  roomUrl.searchParams.set(
    "room",
    room.id
  );

  roomUrl.searchParams.set(
    "name",
    room.name
  );

  roomPageLink.href =
    roomUrl.toString();

  roomPageLink.textContent =
    `Go to ${room.name}`;

  roomPopup.hidden = false;

  document.body.style.overflow =
    "hidden";

  closePopupButton.focus();
}

function closeRoomPopup() {
  roomPopup.hidden = true;

  document.body.style.overflow =
    "";
}

/*
  ==================================================
  ROOM CLICK AND KEYBOARD HANDLING
  ==================================================
*/

let mapWasDragged = false;
let suppressNextRoomClick = false;

const svgRoomElements =
  floorMap.querySelectorAll(".map-room");

svgRoomElements.forEach((roomElement) => {
  function openThisRoom() {
    const roomId =
      roomElement.dataset.roomId;

    const room =
      getRoomById(roomId);

    if (!room) {
      return;
    }

    openRoomPopup(room);
  }

  roomElement.addEventListener("click", () => {
    if (suppressNextRoomClick) {
      suppressNextRoomClick = false;
      return;
    }

    openThisRoom();
  });

  roomElement.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        openThisRoom();
      }
    }
  );
});

/*
  ==================================================
  VENUE TABS
  ==================================================

  Only OIC has a complete SVG map in this prototype.
  Pressing KIC keeps OIC selected and explains why.
*/

venueTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const requestedVenue =
      tab.dataset.venue;

    if (requestedVenue !== "oic") {
      searchMessage.textContent =
        "The KIC map has not been added to this prototype yet.";

      return;
    }

    currentVenue = "oic";

    venueTabs.forEach((otherTab) => {
      const isActive =
        otherTab.dataset.venue === "oic";

      otherTab.classList.toggle(
        "is-active",
        isActive
      );

      otherTab.setAttribute(
        "aria-selected",
        String(isActive)
      );
    });

    resetMapView();
    renderMap();
  });
});

/*
  ==================================================
  FLOOR BUTTONS
  ==================================================

  Only the OIC 3F map exists in the current SVG.
*/

floorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const requestedFloor =
      Number(button.dataset.floor);

    if (requestedFloor !== 3) {
      searchMessage.textContent =
        "The OIC 1F map has not been added to this prototype yet.";

      return;
    }

    currentFloor = 3;

    floorButtons.forEach((otherButton) => {
      const isActive =
        Number(otherButton.dataset.floor) === 3;

      otherButton.classList.toggle(
        "is-active",
        isActive
      );

      otherButton.setAttribute(
        "aria-selected",
        String(isActive)
      );
    });

    resetMapView();
    renderMap();
  });
});

/*
  ==================================================
  SEARCH INPUT
  ==================================================
*/

searchInput.addEventListener("input", () => {
  searchText =
    searchInput.value.trim();

  renderMap();
});

/*
  ==================================================
  CATEGORY BUTTONS
  ==================================================
*/

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory =
      button.dataset.category;

    if (activeCategory === selectedCategory) {
      activeCategory = null;
    } else {
      activeCategory = selectedCategory;
    }

    categoryButtons.forEach((otherButton) => {
      const isActive =
        otherButton.dataset.category ===
        activeCategory;

      otherButton.classList.toggle(
        "is-active",
        isActive
      );

      otherButton.setAttribute(
        "aria-pressed",
        String(isActive)
      );
    });

    renderMap();
  });
});

/*
  ==================================================
  MAP ZOOM AND PAN SETTINGS
  ==================================================
*/

const MAP_WIDTH = 760;
const MAP_HEIGHT = 650;

let mapScale = 1;
let minimumMapScale = 1;
const maximumMapScale = 3.2;

let mapX = 0;
let mapY = 0;

const activePointers =
  new Map();

let previousSinglePointer = null;
let previousPinchDistance = null;
let previousPinchCenter = null;

/*
  Used so tiny finger movements do not count as dragging.
*/

const DRAG_THRESHOLD = 5;
let totalDragDistance = 0;

function applyMapTransform() {
  mapTransformLayer.style.transform =
    `translate(${mapX}px, ${mapY}px) scale(${mapScale})`;
}

function calculateInitialMapPosition() {
  const viewportWidth =
    mapViewport.clientWidth;

  const viewportHeight =
    mapViewport.clientHeight;

  const widthScale =
    viewportWidth / MAP_WIDTH;

  const heightScale =
    viewportHeight / MAP_HEIGHT;

  /*
    Fit the whole map inside the viewport.
  */

  minimumMapScale =
    Math.min(widthScale, heightScale);

  mapScale =
    minimumMapScale;

  mapX =
    (viewportWidth - MAP_WIDTH * mapScale) / 2;

  mapY =
    (viewportHeight - MAP_HEIGHT * mapScale) / 2;

  constrainMapPosition();
  applyMapTransform();
}

function resetMapView() {
  calculateInitialMapPosition();
}

function constrainMapPosition() {
  const viewportWidth =
    mapViewport.clientWidth;

  const viewportHeight =
    mapViewport.clientHeight;

  const scaledWidth =
    MAP_WIDTH * mapScale;

  const scaledHeight =
    MAP_HEIGHT * mapScale;

  if (scaledWidth <= viewportWidth) {
    mapX =
      (viewportWidth - scaledWidth) / 2;
  } else {
    const minimumX =
      viewportWidth - scaledWidth;

    mapX =
      Math.min(
        0,
        Math.max(minimumX, mapX)
      );
  }

  if (scaledHeight <= viewportHeight) {
    mapY =
      (viewportHeight - scaledHeight) / 2;
  } else {
    const minimumY =
      viewportHeight - scaledHeight;

    mapY =
      Math.min(
        0,
        Math.max(minimumY, mapY)
      );
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

function zoomAtPoint(
  newScale,
  viewportX,
  viewportY
) {
  const limitedScale =
    Math.min(
      maximumMapScale,
      Math.max(minimumMapScale, newScale)
    );

  const mapPointX =
    (viewportX - mapX) / mapScale;

  const mapPointY =
    (viewportY - mapY) / mapScale;

  mapScale =
    limitedScale;

  mapX =
    viewportX - mapPointX * mapScale;

  mapY =
    viewportY - mapPointY * mapScale;

  constrainMapPosition();
  applyMapTransform();
}

/*
  ==================================================
  POINTER DOWN
  ==================================================
*/

mapViewport.addEventListener(
  "pointerdown",
  (event) => {
    event.preventDefault();

    if (activePointers.size === 0) {
      mapWasDragged = false;
      totalDragDistance = 0;
    }

    try {
      mapViewport.setPointerCapture(
        event.pointerId
      );
    } catch (error) {
      /*
        Some browsers may reject pointer capture.
        The gesture can still continue without it.
      */
    }

    activePointers.set(
      event.pointerId,
      {
        x: event.clientX,
        y: event.clientY
      }
    );

    mapViewport.classList.add(
      "is-dragging"
    );

    if (activePointers.size === 1) {
      previousSinglePointer = {
        x: event.clientX,
        y: event.clientY
      };
    }

    if (activePointers.size === 2) {
      const points =
        [...activePointers.values()];

      previousPinchDistance =
        getDistance(
          points[0],
          points[1]
        );

      previousPinchCenter =
        getCenter(
          points[0],
          points[1]
        );

      previousSinglePointer = null;
      mapWasDragged = true;
    }
  }
);

/*
  ==================================================
  POINTER MOVE
  ==================================================
*/

mapViewport.addEventListener(
  "pointermove",
  (event) => {
    if (!activePointers.has(event.pointerId)) {
      return;
    }

    event.preventDefault();

    activePointers.set(
      event.pointerId,
      {
        x: event.clientX,
        y: event.clientY
      }
    );

    /*
      One-finger movement
    */

    if (
      activePointers.size === 1 &&
      previousSinglePointer
    ) {
      const currentPointer =
        [...activePointers.values()][0];

      const movementX =
        currentPointer.x -
        previousSinglePointer.x;

      const movementY =
        currentPointer.y -
        previousSinglePointer.y;

      totalDragDistance +=
        Math.hypot(movementX, movementY);

      if (
        totalDragDistance >
        DRAG_THRESHOLD
      ) {
        mapWasDragged = true;
      }

      mapX += movementX;
      mapY += movementY;

      previousSinglePointer =
        currentPointer;

      constrainMapPosition();
      applyMapTransform();
    }

    /*
      Two-finger pinch zoom
    */

    if (activePointers.size === 2) {
      const points =
        [...activePointers.values()];

      const currentDistance =
        getDistance(
          points[0],
          points[1]
        );

      const currentCenter =
        getCenter(
          points[0],
          points[1]
        );

      if (
        previousPinchDistance !== null &&
        previousPinchCenter !== null
      ) {
        const scaleChange =
          currentDistance /
          previousPinchDistance;

        /*
          Move the map when the centre of the
          two fingers moves.
        */

        mapX +=
          currentCenter.x -
          previousPinchCenter.x;

        mapY +=
          currentCenter.y -
          previousPinchCenter.y;

        const viewportRectangle =
          mapViewport.getBoundingClientRect();

        const localCenterX =
          currentCenter.x -
          viewportRectangle.left;

        const localCenterY =
          currentCenter.y -
          viewportRectangle.top;

        zoomAtPoint(
          mapScale * scaleChange,
          localCenterX,
          localCenterY
        );
      }

      previousPinchDistance =
        currentDistance;

      previousPinchCenter =
        currentCenter;

      mapWasDragged = true;
    }
  }
);

/*
  ==================================================
  POINTER END
  ==================================================
*/

function endPointer(event) {
  if (!activePointers.has(event.pointerId)) {
    return;
  }

  activePointers.delete(event.pointerId);

  try {
    mapViewport.releasePointerCapture(
      event.pointerId
    );
  } catch (error) {
    /*
      Ignore browsers that did not capture the pointer.
    */
  }

  if (activePointers.size === 0) {
    previousSinglePointer = null;
    previousPinchDistance = null;
    previousPinchCenter = null;

    mapViewport.classList.remove(
      "is-dragging"
    );

    if (mapWasDragged) {
      suppressNextRoomClick = true;

      /*
        Clear the suppression shortly after the
        browser has generated its click event.
      */

      window.setTimeout(() => {
        suppressNextRoomClick = false;
      }, 250);
    }
  }

  if (activePointers.size === 1) {
    const remainingPointer =
      [...activePointers.values()][0];

    previousSinglePointer =
      remainingPointer;

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

mapViewport.addEventListener(
  "lostpointercapture",
  (event) => {
    activePointers.delete(event.pointerId);
  }
);

/*
  ==================================================
  ZOOM BUTTONS
  ==================================================
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
  ==================================================
  DESKTOP MOUSE WHEEL / TRACKPAD ZOOM
  ==================================================
*/

mapViewport.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();

    const viewportRectangle =
      mapViewport.getBoundingClientRect();

    const localX =
      event.clientX -
      viewportRectangle.left;

    const localY =
      event.clientY -
      viewportRectangle.top;

    const zoomMultiplier =
      event.deltaY < 0
        ? 1.12
        : 0.89;

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
  ==================================================
  POPUP CLOSING
  ==================================================
*/

closePopupButton.addEventListener(
  "click",
  closeRoomPopup
);

roomPopup.addEventListener(
  "click",
  (event) => {
    if (event.target === roomPopup) {
      closeRoomPopup();
    }
  }
);

document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key === "Escape" &&
      !roomPopup.hidden
    ) {
      closeRoomPopup();
    }
  }
);

/*
  ==================================================
  SCREEN RESIZING
  ==================================================
*/

let resizeTimer = null;

window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);

  resizeTimer = window.setTimeout(() => {
    calculateInitialMapPosition();
  }, 100);
});

/*
  ==================================================
  INITIAL PAGE SETUP
  ==================================================
*/

calculateInitialMapPosition();
renderMap();