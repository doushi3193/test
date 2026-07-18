"use strict";

function makePrototypeRoom(roomId, roomName) {
  const safeRoomId = roomId || "room";
  const organisations = Array.from({ length: 6 }, (_, index) => {
    const letter = String.fromCharCode(65 + index);
    return {
      id: `${safeRoomId}-org-${letter.toLowerCase()}`,
      name: `Organisation ${letter}`,
      website: "https://example.com",
      stampToken: `${safeRoomId}-org-${letter.toLowerCase()}`
    };
  });

  return {
    name: roomName || safeRoomId.toUpperCase(),
    organisations
  };
}

const pageParameters = new URLSearchParams(window.location.search);

const requestedVenueId =
  pageParameters.get("venue") || "oic";

const requestedFloorNumber =
  Number(pageParameters.get("floor")) || 3;

const requestedRoomId =
  pageParameters.get("room") || "an321";

const requestedRoomName =
  pageParameters.get("name") ||
  requestedRoomId.toUpperCase();

function findRequestedRoom() {
  const requestedFloor =
    venueData[requestedVenueId]
      ?.floors?.[requestedFloorNumber];

  return requestedFloor
    ?.rooms
    ?.find((room) => room.id === requestedRoomId);
}

const currentRoom =
  findRequestedRoom() ||
  makePrototypeRoom(
    requestedRoomId,
    requestedRoomName
  );
  
const roomTitle = document.querySelector("#roomTitle");
const organisationGrid = document.querySelector("#organisationGrid");
const organisationPopup = document.querySelector("#organisationPopup");
const closePopupButton = document.querySelector("#closePopupButton");
const popupOrganisationName = document.querySelector("#popupOrganisationName");
const popupRoomName = document.querySelector("#popupRoomName");
const organisationWebsiteLink = document.querySelector("#organisationWebsiteLink");
const readNfcButton = document.querySelector("#readNfcButton");
const nfcStatus = document.querySelector("#nfcStatus");

let selectedOrganisation = null;
let nfcAbortController = null;

const STAMP_STORAGE_KEY = "welcomeFestivalCollectedStamps";
const STAMP_IMAGE_PATH = "images/stamp.png";

function getCollectedStampIds() {
  const savedValue = localStorage.getItem(STAMP_STORAGE_KEY);
  if (!savedValue) return [];

  try {
    const parsedValue = JSON.parse(savedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.error("The saved stamp data could not be read.", error);
    return [];
  }
}

function hasCollectedStamp(organisationId) {
  return getCollectedStampIds().includes(organisationId);
}

function saveCollectedStamp(organisationId) {
  const collectedStampIds = getCollectedStampIds();

  if (!collectedStampIds.includes(organisationId)) {
    collectedStampIds.push(organisationId);
    localStorage.setItem(STAMP_STORAGE_KEY, JSON.stringify(collectedStampIds));
  }
}

function createOrganisationCard(organisation) {
  const card = document.createElement("article");
  card.className = "organisation-card";
  card.dataset.organisationId = organisation.id;

  const stampButton = document.createElement("button");
  stampButton.className = "stamp-field";
  stampButton.type = "button";
  stampButton.setAttribute("aria-label", `Open ${organisation.name}`);

  const stampImage = document.createElement("img");
  stampImage.className = "stamp-image";
  stampImage.src = STAMP_IMAGE_PATH;
  stampImage.alt = `${organisation.name} stamp`;
  stampImage.addEventListener("error", () => { stampImage.hidden = true; });

  stampButton.append(stampImage);

  const nameButton = document.createElement("button");
  nameButton.className = "organisation-name-button";
  nameButton.type = "button";
  nameButton.textContent = organisation.name;

  const open = () => openOrganisationPopup(organisation);
  stampButton.addEventListener("click", open);
  nameButton.addEventListener("click", open);

  card.append(stampButton, nameButton);

  if (hasCollectedStamp(organisation.id)) {
    card.classList.add("is-stamped");
  }

  return card;
}

function renderRoom() {
  document.title = `${currentRoom.name} | Welcome Festival Map`;
  roomTitle.textContent = currentRoom.name;
  popupRoomName.textContent = currentRoom.name;
  organisationGrid.replaceChildren();

  currentRoom.organisations.forEach((organisation) => {
    organisationGrid.append(createOrganisationCard(organisation));
  });
}

function openOrganisationPopup(organisation) {
  selectedOrganisation = organisation;
  popupOrganisationName.textContent = organisation.name;
  popupRoomName.textContent = currentRoom.name;
  organisationWebsiteLink.href = organisation.website;
  nfcStatus.textContent = hasCollectedStamp(organisation.id)
    ? "You have already collected this stamp."
    : "Press the button, then hold your phone near the organisation's NFC tag.";
  nfcStatus.className = "nfc-status";
  readNfcButton.disabled = false;
  readNfcButton.classList.remove("is-reading");
  readNfcButton.textContent = "Read NFC Tag";
  organisationPopup.hidden = false;
  document.body.style.overflow = "hidden";
  closePopupButton.focus();
}

function closeOrganisationPopup() {
  stopNfcReading();
  organisationPopup.hidden = true;
  document.body.style.overflow = "";
  selectedOrganisation = null;
}

function collectSelectedStamp() {
  if (!selectedOrganisation) return;

  const organisationId = selectedOrganisation.id;
  saveCollectedStamp(organisationId);

  const card = organisationGrid.querySelector(
    `[data-organisation-id="${CSS.escape(organisationId)}"]`
  );

  closeOrganisationPopup();
  if (!card) return;

  card.classList.add("is-stamped");
  card.classList.remove("animate-stamp");
  void card.offsetWidth;
  card.classList.add("animate-stamp");

  window.setTimeout(() => {
    card.classList.remove("animate-stamp");
  }, 750);
}

function decodeNfcRecord(record) {
  if (!record.data) return "";

  try {
    const decoder = new TextDecoder(record.encoding || "utf-8");
    return decoder.decode(record.data).trim();
  } catch (error) {
    console.error("The NFC record could not be decoded.", error);
    return "";
  }
}

function extractNfcValue(message) {
  for (const record of message.records) {
    const decodedValue = decodeNfcRecord(record);
    if (!decodedValue) continue;

    if (record.recordType === "text") return decodedValue;

    if (record.recordType === "url") {
      try {
        const scannedUrl = new URL(decodedValue);
        return scannedUrl.searchParams.get("stamp") || decodedValue;
      } catch (error) {
        return decodedValue;
      }
    }
  }

  return "";
}

function stopNfcReading() {
  if (nfcAbortController) {
    nfcAbortController.abort();
    nfcAbortController = null;
  }

  readNfcButton.classList.remove("is-reading");
  readNfcButton.disabled = false;
  readNfcButton.textContent = "Read NFC Tag";
}

async function startNfcReading() {
  if (!selectedOrganisation) return;

  if (!("NDEFReader" in window)) {
    nfcStatus.className = "nfc-status is-error";
    nfcStatus.textContent =
      "This browser cannot read NFC inside the webpage. On iPhone, scan the NFC tag normally. The tag should contain a room-page URL with the stamp token.";
    return;
  }

  try {
    nfcAbortController = new AbortController();
    const ndef = new NDEFReader();

    await ndef.scan({ signal: nfcAbortController.signal });

    readNfcButton.disabled = true;
    readNfcButton.classList.add("is-reading");
    readNfcButton.textContent = "Waiting for NFC Tag…";
    nfcStatus.className = "nfc-status";
    nfcStatus.textContent =
      "NFC reading mode is active. Hold the phone near this organisation's tag.";

    ndef.addEventListener("readingerror", () => {
      nfcStatus.className = "nfc-status is-error";
      nfcStatus.textContent =
        "The NFC tag could not be read. Move the phone away and try again.";
    });

    ndef.addEventListener("reading", (event) => {
      const scannedValue = extractNfcValue(event.message);

      if (scannedValue !== selectedOrganisation.stampToken) {
        nfcStatus.className = "nfc-status is-error";
        nfcStatus.textContent = "This NFC tag belongs to a different organisation.";
        return;
      }

      stopNfcReading();
      collectSelectedStamp();
    });
  } catch (error) {
    stopNfcReading();
    nfcStatus.className = "nfc-status is-error";

    if (error.name === "NotAllowedError") {
      nfcStatus.textContent = "NFC permission was not granted.";
    } else if (error.name === "AbortError") {
      nfcStatus.textContent = "NFC reading was cancelled.";
    } else {
      nfcStatus.textContent =
        "NFC reading could not start. Make sure the page is open through HTTPS.";
    }

    console.error("Web NFC error:", error);
  }
}

function collectStampFromUrl() {
  const stampToken = pageParameters.get("stamp");
  if (!stampToken) return;

  const matchingOrganisation = currentRoom.organisations.find(
    (organisation) => organisation.stampToken === stampToken
  );

  const cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete("stamp");
  window.history.replaceState({}, "", cleanUrl);

  if (!matchingOrganisation) {
    window.alert("This NFC tag does not belong to an organisation in this room.");
    return;
  }

  selectedOrganisation = matchingOrganisation;
  window.requestAnimationFrame(() => collectSelectedStamp());
}

readNfcButton.addEventListener("click", startNfcReading);
closePopupButton.addEventListener("click", closeOrganisationPopup);
organisationPopup.addEventListener("click", (event) => {
  if (event.target === organisationPopup) closeOrganisationPopup();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !organisationPopup.hidden) {
    closeOrganisationPopup();
  }
});

renderRoom();
collectStampFromUrl();
