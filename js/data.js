"use strict";

const venueData = {
  // =========================
  // 10/03
  // =========================
  first: {
    name: "10/03",

    floors: {
      1: {
        name: "H 2F",

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
          },

          {
            id: "room-7",
            name: "Room 7",

            organisations: [
              // 10/03 organisations here
            ]
          },

          {
            id: "room-6",
            name: "Room 6",

            organisations: [
              // 10/03 organisations here
            ]
          },

          {
            id: "room-5",
            name: "Room 5",

            organisations: [
              // 10/03 organisations here
            ]
          }
        ]
      },


      4: {
        name: "B Hall",

        booths: [
          {
           id: "a-1",
           label: "A-1",
           
           organisation: {
            id: "first-a-1",
            name: "a",
            category: "culture",
            website: "#",
            stampToken: "first-a-1",
            stampImage: "images/stamps/a.png"
           }
          },

          {
           id: "centralPart",
           label: "Central Part",
           
           organisation: {
            id: "first-centralPart",
            name: "Central Part",
            category: "central",
            website: "https://www.ritsumei.club/about/",
            stampToken: "first-centralPart",
            stampImage: "images/stamps/centralPart.png"
           }
          }
        ]
      }
    }
  },


  // =========================
  // 10/05
  // =========================
  second: {
    name: "10/05",

    floors: {
      1: {
        name: "H 2F",

        rooms: [
          {
            id: "room-8",
            name: "Room 8",

            organisations: [
              {
                id: "room-8-some-other-organisation",
                name: "Different Organisation",
                category: "culture",
                website: "https://example.com",
                stampToken: "room-8-some-other-organisation"
              }
            ]
          },

          {
            id: "room-7",
            name: "Room 7",

            organisations: [
              // 10/05 organisations here
            ]
          },

          {
            id: "room-6",
            name: "Room 6",

            organisations: [
              // 10/05 organisations here
            ]
          },

          {
            id: "room-5",
            name: "Room 5",

            organisations: [
              // 10/05 organisations here
            ]
          }
        ]
      },


      4: {
        name: "B Hall",

        booths: [
          {
           id: "a-1",
           label: "A-1",
           
           organisation: {
            id: "first-a-1",
            name: "a",
            category: "culture",
            website: "#",
            stampToken: "first-a-1",
            stampImage: "images/stamps/a.png"
           }
          },
        
          {
           id: "centralPart",
           label: "Central Part",
           
           organisation: {
            id: "second-centralPart",
            name: "Central Part",
            category: "central",
            website: "https://www.ritsumei.club/about/",
            stampToken: "second-centralPart",
            stampImage: "images/stamps/centralPart.png"
           }
          }
        ]
      }
    }
  }
};