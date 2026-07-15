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
      1: {
        rooms: [
          {
            id: "oic-1f-a",
            name: "Room A101",
            x: 80,
            y: 110,
            width: 130,
            height: 95,
            organisations: [
              {
                name: "OIC Football Club",
                category: "sports"
              },
              {
                name: "International Exchange Group",
                category: "volunteering"
              }
            ]
          },

          {
            id: "oic-1f-b",
            name: "Room A102",
            x: 235,
            y: 110,
            width: 130,
            height: 95,
            organisations: [
              {
                name: "Photography Society",
                category: "culture"
              },
              {
                name: "Economics Study Group",
                category: "academic"
              }
            ]
          },

          {
            id: "oic-1f-c",
            name: "Room A103",
            x: 390,
            y: 110,
            width: 130,
            height: 95,
            organisations: [
              {
                name: "Basketball Club",
                category: "sports"
              }
            ]
          },

          {
            id: "oic-1f-d",
            name: "Room A104",
            x: 80,
            y: 330,
            width: 130,
            height: 95,
            organisations: [
              {
                name: "Volunteer Support Network",
                category: "volunteering"
              }
            ]
          },

          {
            id: "oic-1f-e",
            name: "Room A105",
            x: 235,
            y: 330,
            width: 130,
            height: 95,
            organisations: [
              {
                name: "Film Appreciation Society",
                category: "culture"
              }
            ]
          },

          {
            id: "oic-1f-f",
            name: "Room A106",
            x: 390,
            y: 330,
            width: 130,
            height: 95,
            organisations: [
              {
                name: "Programming Circle",
                category: "academic"
              }
            ]
          }
        ]
      },

      3: {
        rooms: [
          {
            id: "oic-3f-a",
            name: "Room C301",
            x: 92,
            y: 85,
            width: 118,
            height: 90,
            organisations: [
              {
                name: "OIC Sports Association",
                category: "sports"
              },
              {
                name: "Table Tennis Club",
                category: "sports"
              }
            ]
          },

          {
            id: "oic-3f-b",
            name: "Room C302",
            x: 240,
            y: 85,
            width: 118,
            height: 90,
            organisations: [
              {
                name: "Organisation A",
                category: "culture"
              },
              {
                name: "Traditional Music Circle",
                category: "culture"
              }
            ]
          },

          {
            id: "oic-3f-c",
            name: "Room C303",
            x: 388,
            y: 85,
            width: 118,
            height: 90,
            organisations: [
              {
                name: "Academic Research Society",
                category: "academic"
              }
            ]
          },

          {
            id: "oic-3f-d",
            name: "Room C304",
            x: 92,
            y: 250,
            width: 118,
            height: 100,
            organisations: [
              {
                name: "Organisation B",
                category: "volunteering"
              }
            ]
          },

          {
            id: "oic-3f-e",
            name: "Room C305",
            x: 240,
            y: 250,
            width: 118,
            height: 100,
            organisations: [
              {
                name: "Debate Society",
                category: "academic"
              },
              {
                name: "Language Learning Circle",
                category: "academic"
              }
            ]
          },

          {
            id: "oic-3f-f",
            name: "Room C306",
            x: 388,
            y: 250,
            width: 118,
            height: 100,
            organisations: [
              {
                name: "Dance Club",
                category: "culture"
              },
              {
                name: "Community Support Group",
                category: "volunteering"
              }
            ]
          },

          {
            id: "oic-3f-g",
            name: "Room C307",
            x: 92,
            y: 430,
            width: 118,
            height: 100,
            organisations: [
              {
                name: "Tennis Club",
                category: "sports"
              }
            ]
          },

          {
            id: "oic-3f-h",
            name: "Room C308",
            x: 240,
            y: 430,
            width: 118,
            height: 100,
            organisations: [
              {
                name: "Art Circle",
                category: "culture"
              }
            ]
          },

          {
            id: "oic-3f-i",
            name: "Room C309",
            x: 388,
            y: 430,
            width: 118,
            height: 100,
            organisations: [
              {
                name: "Environmental Volunteers",
                category: "volunteering"
              }
            ]
          }
        ]
      }
    }
  },

  kic: {
    name: "KIC",

    floors: {
      1: {
        rooms: [
          {
            id: "kic-1f-a",
            name: "Room K101",
            x: 75,
            y: 90,
            width: 145,
            height: 100,
            organisations: [
              {
                name: "KIC Baseball Club",
                category: "sports"
              }
            ]
          },

          {
            id: "kic-1f-b",
            name: "Room K102",
            x: 250,
            y: 90,
            width: 145,
            height: 100,
            organisations: [
              {
                name: "KIC Art Society",
                category: "culture"
              }
            ]
          },

          {
            id: "kic-1f-c",
            name: "Room K103",
            x: 425,
            y: 90,
            width: 100,
            height: 100,
            organisations: [
              {
                name: "Legal Studies Group",
                category: "academic"
              }
            ]
          },

          {
            id: "kic-1f-d",
            name: "Room K104",
            x: 75,
            y: 300,
            width: 145,
            height: 105,
            organisations: [
              {
                name: "Local Community Volunteers",
                category: "volunteering"
              }
            ]
          },

          {
            id: "kic-1f-e",
            name: "Room K105",
            x: 250,
            y: 300,
            width: 145,
            height: 105,
            organisations: [
              {
                name: "KIC Theatre Club",
                category: "culture"
              }
            ]
          }
        ]
      },

      3: {
        rooms: [
          {
            id: "kic-3f-a",
            name: "Room K301",
            x: 75,
            y: 100,
            width: 135,
            height: 105,
            organisations: [
              {
                name: "KIC Volleyball Club",
                category: "sports"
              }
            ]
          },

          {
            id: "kic-3f-b",
            name: "Room K302",
            x: 235,
            y: 100,
            width: 135,
            height: 105,
            organisations: [
              {
                name: "Literature Circle",
                category: "culture"
              }
            ]
          },

          {
            id: "kic-3f-c",
            name: "Room K303",
            x: 395,
            y: 100,
            width: 135,
            height: 105,
            organisations: [
              {
                name: "Political Science Society",
                category: "academic"
              }
            ]
          },

          {
            id: "kic-3f-d",
            name: "Room K304",
            x: 75,
            y: 330,
            width: 135,
            height: 105,
            organisations: [
              {
                name: "Children Support Volunteers",
                category: "volunteering"
              }
            ]
          },

          {
            id: "kic-3f-e",
            name: "Room K305",
            x: 235,
            y: 330,
            width: 135,
            height: 105,
            organisations: [
              {
                name: "KIC Badminton Club",
                category: "sports"
              },
              {
                name: "Media Production Circle",
                category: "culture"
              }
            ]
          },

          {
            id: "kic-3f-f",
            name: "Room K306",
            x: 395,
            y: 330,
            width: 135,
            height: 105,
            organisations: [
              {
                name: "Technology Research Group",
                category: "academic"
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
  現在の状態
  ==================================================
*/

let currentVenue = "oic";
let currentFloor = 3;
let activeCategory = null;
let searchText = "";
let zoomLevel = 0.62;

const minimumZoom = 0.52;
const maximumZoom = 1.15;
const zoomStep = 0.12;

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

function renderMap() {
  mapCanvas.innerHTML = "";

  createCorridors();

  const floorData =
    venueData[currentVenue].floors[currentFloor];

  floorData.rooms.forEach((room) => {
    const roomButton = document.createElement("button");

    roomButton.type = "button";
    roomButton.className = "map-room";
    roomButton.textContent = room.name;

    roomButton.style.left = `${room.x}px`;
    roomButton.style.top = `${room.y}px`;
    roomButton.style.width = `${room.width}px`;
    roomButton.style.height = `${room.height}px`;

    const matchingOrganisations =
      getMatchingOrganisations(room);

    const filterIsActive =
      searchText !== "" || activeCategory !== null;

    if (
      filterIsActive &&
      matchingOrganisations.length > 0
    ) {
      roomButton.classList.add("has-match");
    }

    if (
      filterIsActive &&
      matchingOrganisations.length === 0
    ) {
      roomButton.classList.add("is-dimmed");
    }

    roomButton.addEventListener("click", () => {
      openRoomPopup(room);
    });

    mapCanvas.appendChild(roomButton);
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

function applyZoom() {
  mapCanvas.style.transform =
    `scale(${zoomLevel})`;
}

zoomInButton.addEventListener("click", () => {
  zoomLevel = Math.min(
    maximumZoom,
    zoomLevel + zoomStep
  );

  applyZoom();
});

zoomOutButton.addEventListener("click", () => {
  zoomLevel = Math.max(
    minimumZoom,
    zoomLevel - zoomStep
  );

  applyZoom();
});

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