var uuid = require('./uuid');

var oTemplates = {
  1: {
    "id": uuid.generateUUID(),
    "type": "EZB Niedrigzins",
    "title": "EZB Niedrigzins",
    "data": "",
    "contents": []
  },
  2: {
    "id": uuid.generateUUID(),
    "type": "Vertrauen in DRV",
    "title": "Vertrauen in DRV",
    "data": "",
    "contents": []
  },
  3: {
    "id": uuid.generateUUID(),
    "type": "Versorgungslücke Immobilienbesitzer",
    "title": "Versorgungslücke Immobilienbesitzer",
    "data": "",
    "contents": []
  },
  4: {
    "id": uuid.generateUUID(),
    "type": "Renteninfo",
    "title": "Renteninfo",
    "data": "",
    "contents": []
  },
  5: {
    "id": uuid.generateUUID(),
    "type": "Lücke schliessen",
    "title": "Lücke schliessen",
    "data": "",
    "contents": []
  }
};

var editorData = [
  {
    "id": "1",
    "type": "textFrame",
    "title": "Motivation",
    "attributes": {
    },
    "visibilityState": "expanded",
    "data": "",
    "contents": [
      {
        "id": "1_1",
        "type": "textFrame",
        "title": "Allianz Sicht",
        "attributes": {
          "briefing": ""
        },
        "visibilityState": "expanded",
        "data": "",
        "contents": [
          {
            "id": "1_1_1",
            "type": "textFrame",
            "title": "Erfolg gibt uns recht",
            "attributes": {
              "briefing": "",
              "kernaussage": "",
              //"keyVisual": ""
              "image": ""
            },
            "visibilityState": "expanded",
            "data": "",
            "contents": [
              {
                "id": "1_1_1_1",
                "type": "textFrame",
                "title": "Intro",
                "icon": "About Filled-32.png",
                "attributes": {
                  "briefing": ""
                },
                "visibilityState": "expanded",
                "data": "",
                "contents": [
                  {
                    "id": "1_1_1_1_1",
                    "type": "textFrame",
                    "title": "Titel",
                    "attributes": {
                      "briefing": ""
                    },
                    "visibilityState": "expanded",
                    "data": "",
                    "contents": [

                    ],
                    "parentId": "1_1_1_1"
                  },
                  {
                    "id": "1_1_1_1_2",
                    "type": "HTML",
                    "title": "Argument",
                    "attributes": {
                      "briefing": ""
                    },
                    "visibilityState": "expanded",
                    "data": "",
                    "contents": [

                    ],
                    "parentId": "1_1_1_1"
                  },{
                    "id": "1_1_1_1_3",
                    "type": "HTML",
                    "title": "Zusammenfassung",
                    "attributes": {
                      "briefing": ""
                    },
                    "visibilityState": "expanded",
                    "data": "",
                    "contents": [

                    ],
                    "parentId": "1_1_1_1"
                  }
                ],
                "parentId": "1_1_1"
              },
              {
                "id": "1_1_1_2",
                "type": "textFrame",
                "title": "Details",
                "icon": "Opera Glasses Filled-32.png",
                "attributes": {
                  "briefing": ""
                },
                "visibilityState": "expanded",
                "data": "",
                "contents": [
                  {
                    "id": "1_1_1_2_1",
                    "type": "textFrame",
                    "title": "Titel",
                    "attributes": {
                      "briefing": ""
                    },
                    "visibilityState": "expanded",
                    "data": "",
                    "contents": [

                    ],
                    "parentId": "1_1_1_2"
                  },
                  {
                    "id": "1_1_1_2_2",
                    "type": "textFrame",
                    "title": "Kurztext",
                    "attributes": {
                      "briefing": ""
                    },
                    "visibilityState": "expanded",
                    "data": "",
                    "contents": [

                    ],
                    "parentId": "1_1_1_2"
                  },{
                    "id": "1_1_1_2_3",
                    "type": "HTML",
                    "title": "Detail",
                    "attributes": {
                      "briefing": ""
                    },
                    "visibilityState": "expanded",
                    "data": "",
                    "contents": [

                    ],
                    "parentId": "1_1_1_2"
                  },
                  {
                    "id": "1_1_1_2_4",
                    "type": "HTML",
                    "title": "Überleitung",
                    "attributes": {
                      "briefing": ""
                    },
                    "visibilityState": "expanded",
                    "data": "",
                    "contents": [

                    ],
                    "parentId": "1_1_1_2"
                  }
                ],
                "parentId": "1_1_1"
              },
              {
                "id": "1_1_1_4",
                "type": "textFrame",
                "title": "Verkaufschart",
                "icon": "Pie Chart-32.png",
                "attributes": {
                  "briefing": ""
                },
                "visibilityState": "expanded",
                "data": "",
                "contents": [
                  {
                    "id": "1_1_1_4_1",
                    "type": "textFrame",
                    "title": "Titel",
                    "attributes": {
                      "briefing": ""
                    },
                    "visibilityState": "expanded",
                    "data": "",
                    "contents": [

                    ],
                    "parentId": "1_1_1_4"
                  },
                  {
                    "id": "1_1_1_4_2",
                    "type": "HTML",
                    "title": "Detail",
                    "attributes": {
                      "briefing": ""
                    },
                    "visibilityState": "expanded",
                    "data": "",
                    "contents": [],
                    "parentId": "1_1_1_4"
                  },
                  {
                    "id": "1_1_1_4_3",
                    "type": "imageFrame",
                    "title": "Chart",
                    "attributes": {
                      "briefing": ""
                    },
                    "visibilityState": "expanded",
                    "data": "",
                    "contents": [],
                    "parentId": "1_1_1_4"
                  }
                ],
                "parentId": "1_1_1_4"
              },
              {
                "id": "1_1_1_5",
                "type": "textFrame",
                "title": "Spezialisteninfo",
                "icon": "For Experienced Filled-32.png",
                "attributes": {
                  "briefing": ""
                },
                "visibilityState": "expanded",
                "data": "",
                "contents": [
                  {
                    "id": "1_1_1_5_1",
                    "type": "textFrame",
                    "title": "Titel",
                    "attributes": {
                      "briefing": ""
                    },
                    "visibilityState": "expanded",
                    "data": "",
                    "contents": [

                    ],
                    "parentId": "1_1_1_5"
                  },
                  {
                    "id": "1_1_1_5_2",
                    "type": "HTML",
                    "title": "Detail",
                    "attributes": {
                      "briefing": ""
                    },
                    "visibilityState": "expanded",
                    "data": "",
                    "contents": [

                    ],
                    "parentId": "1_1_1_5"
                  }
                ],
                "parentId": "1_1_1"
              }
            ],
            "parentId": "1_1"
          }
        ],
        "parentId": "1"
      },
      {
        "id": "1_2",
        "type": "textFrame",
        "title": "Markt Sicht",
        "attributes": {
          "briefing": ""
        },
        "visibilityState": "expanded",
        "data": "",
        "contents": [
          {
            "id": "1_2_1",
            "type": "textFrame",
            "title": "Kapitalmarkt mit Garantie",
            "attributes": {
              "briefing": "",
              "kernaussage": "",
              "keyVisual": ""
            },
            "visibilityState": "expanded",
            "data": "",
            "contents": [
              {
                "id": "1_2_1_1",
                "type": "textFrame",
                "title": "Section",
                "attributes": {
                  "briefing": ""
                },
                "visibilityState": "expanded",
                "data": "",
                "contents": [

                ],
                "parentId": "1_2_1"
              }
            ],
            "parentId": "1_2"
          }
        ],
        "parentId": "1"
      },
      {
        "id": "1_3",
        "type": "textFrame",
        "title": "Ausschreibung /Icentivierung",
        "attributes": {
          "briefing": ""
        },
        "visibilityState": "expanded",
        "data": "",
        "contents": [

        ],
        "parentId": "1"
      },
      {
        "id": "1_4",
        "type": "textFrame",
        "title": "Beratung",
        "attributes": {
          "briefing": ""
        },
        "visibilityState": "expanded",
        "data": "",
        "contents": [
          {
            "id": "1_4_1",
            "type": "textFrame",
            "title": "Bedarfsweckung / Gesprächseinstieg",
            "attributes": {
              "briefing": "",
              "kernaussage": "",
              "keyVisual": ""
            },
            "visibilityState": "expanded",
            "data": "",
            "contents": [

            ],
            "parentId": "1_4"
          }
        ],
        "parentId": "1"
      }
    ],
    "parentId": undefined
  }
];


module.exports = {
  templates: oTemplates,
  editorData: editorData
};