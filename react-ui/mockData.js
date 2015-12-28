var uuid = require('./uuid');

var oTemplates = {
  1: {
    "id": uuid.generateUUID(),
    "type": "HTML",
    "title": "Argument",
    "data": "",
    "dataLength": "-1",
    "validation": "",
    "contents": []
  },
  2: {
    "id": uuid.generateUUID(),
    "type": "HTML",
    "title": "Fazit",
    "data": "",
    "dataLength": "-1",
    "validation": "",
    "contents": []
  },
  3: {
    "id": uuid.generateUUID(),
    "type": "imageFrame",
    "title": "Bild",
    "data": "",
    "dataLength": "",
    "contents": []
  },
  4: {
    "id": uuid.generateUUID(),
    "type": "imageFrame",
    "title": "Link",
    "imageData": "",
    "contents": []
  },
  5: {
    "id": uuid.generateUUID(),
    "type": "imageFrame",
    "title": "PDF",
    "imageData": "",
    "contents": []
  },
  6: {
    "id": uuid.generateUUID(),
    "type": "textFrame",
    "title": "Salesapproach Infobit",
    "dataLength": "",
    "attributes": {
      "briefing": "Briefing \n dfdsfdsffs sdffsdfd sdsf " +
      "sdf",
      "kernaussage": "",
      "image": ""
    },
    "contents": [
      {
        "id": uuid.generateUUID(),
        "type": "textFrame",
        "title": "Intro",
        "attributes": {},
        "dataLength": "",
        "visibilityState": "expanded",
        "contents": [
          {
            "id": uuid.generateUUID(),
            "type": "textFrame",
            "title": "Titel",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          },
          {
            "id": uuid.generateUUID(),
            "type": "textFrame",
            "title": "Argument",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          },
          {
            "id": uuid.generateUUID(),
            "type": "textFrame",
            "title": "Zusammenfassung",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          }
        ]
      },
      {
        "id": uuid.generateUUID(),
        "type": "textFrame",
        "title": "Details",
        "attributes": {},
        "dataLength": "",
        "visibilityState": "expanded",
        "contents": [
          {
            "id": uuid.generateUUID(),
            "type": "textFrame",
            "title": "Titel",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          },
          {
            "id": uuid.generateUUID(),
            "type": "textFrame",
            "title": "Kurztext",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          },
          {
            "id": uuid.generateUUID(),
            "type": "HTML",
            "title": "Detail",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          },
          {
            "id": uuid.generateUUID(),
            "type": "HTML",
            "title": "Überleitung",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          }
        ]
      },
      {
        "id": uuid.generateUUID(),
        "type": "textFrame",
        "title": "Details",
        "attributes": {},
        "dataLength": "",
        "visibilityState": "expanded",
        "contents": [
          {
            "id": uuid.generateUUID(),
            "type": "textFrame",
            "title": "Titel",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          },
          {
            "id": uuid.generateUUID(),
            "type": "HTML",
            "title": "Detail",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          },
          {
            "id": uuid.generateUUID(),
            "type": "imageFrame",
            "title": "Chart",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          }
        ]
      },
      {
        "id": uuid.generateUUID(),
        "type": "textFrame",
        "title": "Spezialisteninfo",
        "attributes": {},
        "dataLength": "",
        "visibilityState": "expanded",
        "contents": [
          {
            "id": uuid.generateUUID(),
            "type": "textFrame",
            "title": "Titel",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          },
          {
            "id": uuid.generateUUID(),
            "type": "HTML",
            "title": "Detail",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          },
          {
            "id": uuid.generateUUID(),
            "type": "imageFrame",
            "title": "Chart",
            "data": "",
            "dataLength": "-1",
            "validation": "",
            "attributes": {},
            "contents": []
          }
        ]
      }
    ]
  }
};


var editorData = [
  {
    "id": "1",
    "type": "textFrame",
    "title": "Motivation",
    "attributes": {},
    "visibilityState": "expanded",
    "data": "",
    "dataLength": "",
    "contents": [
      {
        "id": "1_1",
        "type": "textFrame",
        "title": "Allianz Sicht",
        "data": "",
        "dataLength": "",
        "attributes": {},
        "visibilityState": "expanded",
        "contents": [
          {
            "id": "1_1_1",
            "type": "HTML",
            "title": "Der Erfolg gibt uns Recht",
            "data": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            "dataLength": "",
            "attributes": {},
            "visibilityState": "expanded",
            "contents": [
              {
                "id": "1_1_1_1",
                "type": "HTML",
                "title": "Uberblick",
                "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                "dataLength": "",
                "attributes": {},
                "visibilityState": "expanded",
                "contents": [
                  {
                    "id": "1_1_1_1_1",
                    "type": "HTML",
                    "title": "Titel",
                    "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "dataLength": "",
                    "attributes": {},
                    "visibilityState": "expanded",
                    "contents": [],
                    "parentId": "1_1_1_1"
                  },
                  {
                    "id": "1_1_1_1_2",
                    "type": "HTML",
                    "title": "Argument",
                    "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                    "dataLength": "",
                    "attributes": {},
                    "visibilityState": "expanded",
                    "contents": [],
                    "parentId": "1_1_1_1"
                  }
                ],
                "parentId": "1_1_1"
              },
              {
                "id": "1_1_1_2",
                "type": "HTML",
                "title": "Detaillierung",
                "data": "",
                "dataLength": "",
                "attributes": {},
                "visibilityState": "expanded",
                "contents": [],
                "parentId": "1"
              },
              {
                "id": "1_1_1_3",
                "type": "HTML",
                "title": "Beratungsaufbereitung",
                "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                "dataLength": "",
                "attributes": {},
                "visibilityState": "expanded",
                "contents": [],
                "parentId": "1"
              },
              {
                "id": "1_1_1_4",
                "type": "HTML",
                "title": "Spezialistenwissen",
                "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "dataLength": "",
                "attributes": {},
                "visibilityState": "expanded",
                "contents": [],
                "parentId": "1"
              }
            ],
            "parentId": "1"
          }
        ],
        "parentId": "1"
      },
      {
        "id": "1_2",
        "type": "textFrame",
        "title": "Markt Sicht",
        "data": "",
        "dataLength": "",
        "attributes": {},
        "visibilityState": "expanded",
        "contents": [
          {
            "id": "1_2_1",
            "type": "HTML",
            "title": "Marktpotential fur Kapitalmarktnahe Konzepte",
            "data": "",
            "dataLength": "",
            "attributes": {},
            "visibilityState": "expanded",
            "contents": [],
            "parentId": "1"
          }
        ],
        "parentId": "1"
      }
    ],
    "parentId": undefined
  },
  {
    "id": "2",
    "type": "textFrame",
    "title": "Bedarf & Beratung",
    "attributes": {},
    "visibilityState": "expanded",
    "data": "",
    "dataLength": "",
    "contents": [
      {
        "id": "2_1",
        "type": "textFrame",
        "title": "Zielgruppen",
        "data": "",
        "dataLength": "",
        "attributes": {},
        "visibilityState": "expanded",
        "contents": [],
        "parentId": "1"
      },
      {
        "id": "2_2",
        "type": "textFrame",
        "title": "Kundenherausforderung",
        "data": "",
        "dataLength": "",
        "attributes": {},
        "visibilityState": "expanded",
        "contents": [
          {
            "id": "2_2_1",
            "type": "HTML",
            "title": "Umdenken in der Alterscorsorge",
            "data": "",
            "dataLength": "",
            "attributes": {},
            "visibilityState": "expanded",
            "contents": [],
            "parentId": "1"
          }
        ],
        "parentId": "1"
      },
      {
        "id": "2_3",
        "type": "textFrame",
        "title": "Aktueller Anlass",
        "data": "",
        "dataLength": "",
        "attributes": {},
        "visibilityState": "expanded",
        "contents": [],
        "parentId": "1"
      },
      {
        "id": "2_4",
        "type": "textFrame",
        "title": "Bedarfsweckung / Gesprachseinstieg",
        "data": "",
        "dataLength": "",
        "attributes": {},
        "visibilityState": "expanded",
        "contents": [
          {
            "id": "2_4_1",
            "type": "HTML",
            "title": "EZB sezt auf Niedrigzins",
            "data": "",
            "dataLength": "",
            "attributes": {},
            "visibilityState": "expanded",
            "contents": [],
            "parentId": "1"
          }
        ],
        "parentId": "1"
      },
      {
        "id": "2_5",
        "type": "textFrame",
        "title": "Risikodarstellung & Priorisierung",
        "data": "",
        "dataLength": "",
        "attributes": {},
        "visibilityState": "expanded",
        "contents": [],
        "parentId": "1"
      }

    ],
    "parentId": undefined
  },
  {
    "id": "3",
    "type": "textFrame",
    "title": "Produkt",
    "attributes": {},
    "visibilityState": "expanded",
    "data": "",
    "dataLength": "",
    "contents": [
      {
        "id": "3_1",
        "type": "textFrame",
        "title": "Lösungsansatz/Fokusprodukte",
        "data": "",
        "dataLength": "",
        "attributes": {},
        "visibilityState": "expanded",
        "contents": [],
        "parentId": "1"
      },
      {
        "id": "3_2",
        "type": "textFrame",
        "title": "USPs/Differenzierung zum Wettberwerb",
        "data": "",
        "dataLength": "",
        "attributes": {},
        "visibilityState": "expanded",
        "contents": [],
        "parentId": "1"
      },
      {
        "id": "3_3",
        "type": "textFrame",
        "title": "Staatliche Förderung/Zuschüsse",
        "attributes": {},
        "visibilityState": "expanded",
        "data": "",
        "dataLength": "",
        "contents": [],
        "parentId": "1"
      },
      {
        "id": "3_4",
        "type": "textFrame",
        "title": "Stärken Allianz",
        "attributes": {},
        "visibilityState": "expanded",
        "data": "",
        "dataLength": "",
        "contents": [],
        "parentId": "1"
      },
      {
        "id": "3_5",
        "type": "textFrame",
        "title": "Produktneuerungen",
        "attributes": {},
        "visibilityState": "expanded",
        "data": "",
        "dataLength": "",
        "contents": [],
        "parentId": "1"
      }
    ],
    "parentId": undefined
  },
  {
    "id": "4",
    "type": "textFrame",
    "title": "Verkaufsunterstützung",
    "attributes": {},
    "visibilityState": "expanded",
    "data": "",
    "dataLength": "",
    "contents": [
      {
        "id": "4_1",
        "type": "textFrame",
        "title": "Kundenauswahl- und Ansprache",
        "data": "",
        "dataLength": "",
        "attributes": {},
        "visibilityState": "expanded",
        "contents": [],
        "parentId": "1"
      },
      {
        "id": "4_2",
        "type": "textFrame",
        "title": "Kundenberatung",
        "data": "",
        "dataLength": "",
        "attributes": {},
        "visibilityState": "expanded",
        "contents": [],
        "parentId": "4"
      }
    ],
    "parentId": undefined
  }

];


module.exports = {
  templates: oTemplates,
  editorData: editorData
};