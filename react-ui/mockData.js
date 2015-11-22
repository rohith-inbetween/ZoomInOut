var uuid = require('./uuid');

var oTemplates = {
  1: {
    "id": uuid.generateUUID(),
    "type": "Motivation",
    "title": "Motivation",
    "data": "",
    "contents": []
  },
  2: {
    "id": uuid.generateUUID(),
    "type": "Proposal",
    "title": "Proposal",
    "data": "",
    "contents": []
  },
  3: {
    "id": uuid.generateUUID(),
    "type": "Allianz View",
    "title": "Allianz View",
    "data": "",
    "contents": []
  },
  4: {
    "id": uuid.generateUUID(),
    "type": "Market View",
    "title": "Market View",
    "data": "",
    "contents": []
  },
  5: {
    "id": uuid.generateUUID(),
    "type": "POS",
    "title": "POS",
    "data": "",
    "contents": []
  },
  6: {
    "id": uuid.generateUUID(),
    "type": "PBS",
    "title": "PBS",
    "data": "",
    "contents": []
  },
  7: {
    "id": uuid.generateUUID(),
    "type": "IB1",
    "title": "IB1",
    "data": "",
    "contents": []
  },
  8: {
    "id": uuid.generateUUID(),
    "type": "IB2",
    "title": "IB2",
    "data": "",
    "contents": []
  },
  9: {
    "id": uuid.generateUUID(),
    "type": "IB3",
    "title": "IB3",
    "data": "",
    "contents": []
  },
  10: {
    "id": uuid.generateUUID(),
    "type": "IB4",
    "title": "IB4",
    "data": "",
    "contents": []
  },
  11: {
    "id": uuid.generateUUID(),
    "type": "Headline",
    "title": "Headline",
    "data": "",
    "contents": []
  },
  12: {
    "id": uuid.generateUUID(),
    "type": "Argument",
    "title": "Argument",
    "data": "",
    "contents": []
  },
  13: {
    "id": uuid.generateUUID(),
    "type": "Summary",
    "title": "Summary",
    "data": "",
    "contents": []
  },
  14: {
    "id": uuid.generateUUID(),
    "type": "Conclusion",
    "title": "Conclusion",
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
              "keyVisual": ""
            },
            "visibilityState": "expanded",
            "data": "",
            "contents": [
              {
                "id": "1_1_1_1",
                "type": "textFrame",
                "title": "Intro",
                "attributes": {
                  "briefing": ""
                },
                "visibilityState": "expanded",
                "data": "",
                "contents": [

                ],
                "parentId": "1_1_1"
              },
              {
                "id": "1_1_1_2",
                "type": "textFrame",
                "title": "Details",
                "attributes": {
                  "briefing": ""
                },
                "visibilityState": "expanded",
                "data": "",
                "contents": [

                ],
                "parentId": "1_1_1"
              },
              {
                "id": "1_1_1_3",
                "type": "textFrame",
                "title": "Zusatzinfo",
                "attributes": {
                  "briefing": ""
                },
                "visibilityState": "expanded",
                "data": "",
                "contents": [

                ],
                "parentId": "1_1_1"
              },
              {
                "id": "1_1_1_4",
                "type": "textFrame",
                "title": "Verkaufschart",
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
                "id": "1_1_1_5",
                "type": "textFrame",
                "title": "Spezialisteninfo",
                "attributes": {
                  "briefing": ""
                },
                "visibilityState": "expanded",
                "data": "",
                "contents": [

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