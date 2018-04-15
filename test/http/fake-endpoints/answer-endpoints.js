import {REST_API_URL} from "../../../src/Common";

let endpoints = [
  {
    method: 'GET',
    url: `${REST_API_URL}/answers?status=NOT_RESOLVED`,
    response: {
      "Denzel": [{
        "id": 170,
        "question": {
          "id": 6,
          "question": "Зачем Натафка постоянно обижается?",
          "rightAnswer": "true",
          "roundName": "Правда или ложь",
          "roundType": "TRUTH_OR_LIE",
          "timeNeededSec": 10,
          "imageFilePath": "static/image/XCktCLomyvs.jpg",
          "soundFilePath": null,
          "funnyStuffFilePath": null
        },
        "answer": "true",
        "rightAnswer": "true",
        "player": {"id": 282, "name": "Denzel", "score": 5},
        "status": "NOT_RESOLVED"
      }]
    }
  },
  {
    method: 'PUT',
    url: `${REST_API_URL}/answers`,
    response: [
      {}
    ]
  }
];

export {endpoints};
