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

var editorData = {

};


module.exports = {
  templates: oTemplates
};