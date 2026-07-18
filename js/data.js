"use strict";

const venueData = {
  oic: {
    name: "OIC",

    floors: {
      1: {
        name: "1F",

        rooms: [
          {
            id: "room-8",
            name: "Room 8",

            organisations: [
              {
                id: "room-8-information-centre",
                name: "Welcome Festival Information Centre",
                category: "central",
                website: "https://example.com",
                stampToken: "room-8-information-centre"
              }
            ]
          }
        ]
      },

      3: {
        name: "3F",

        rooms: [
          {
            id: "student-lounge",
            name: "Student Lounge",

            organisations: [
              {
                id: "student-lounge-gpo",
                name: "Globalisation Promotion Office",
                category: "central",
                website: "https://ritsumeikan-circle.net/globalization-promotion-office/",
                stampToken: "student-lounge-gpo"
              }
            ]
          },

          {
            id: "an321",
            name: "AN321",

            organisations: [
              {
                id: "an321-international-exchange",
                name: "International Exchange Circle",
                category: "research-volunteering",
                website: "https://example.com/international-exchange",
                stampToken: "an321-international-exchange"
              }
            ]
          }
        ]
      }
    }
  }
};