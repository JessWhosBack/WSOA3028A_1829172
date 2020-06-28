// Copyright 2015, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License")
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + window.apiKey;

$(function () {
    $('#fileform').on('submit', uploadFiles);
});

/**
 * 'submit' event handler - reads the image bytes and sends it to the Cloud
 * Vision API.
 */
function uploadFiles(event) {
    event.preventDefault(); // Prevent the default form post

    // Grab the file and asynchronously convert to base64.
    var file = $('#fileform [name=fileField]')[0].files[0];
    var reader = new FileReader();
    reader.onloadend = processFile;
    reader.readAsDataURL(file);
    document.getElementById("imageTitle").innerHTML = "Your image:";
    document.getElementById("image").src = URL.createObjectURL(file);
}

/**
* Event handler for a file's data url - extract the image data and pass it off.
*/
function processFile(event) {
    var content = event.target.result;
    sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
}

/**
 * Sends the given file contents to the Cloud Vision API and outputs the
 * results.
 */
function sendFileToCloudVision(content) {
    var type = $('#fileform [name=type]').val();

    // Strip out the file prefix when you convert to json.
    var request = {
        requests: [{
            image: {
                content: content
            },
            features: [{
                type: type,
                maxResults: 200
            }]
        }]
    };
    $('#results').text('Loading...');
    $.post({
        url: CV_URL,
        data: JSON.stringify(request),
        contentType: 'application/json'
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
    }).done(displayJSON);
}

/**
 * Displays the results.
 *
/* ORIGINAL FUNCTION:
function displayJSON(data) {
    var contents = JSON.stringify(data, null, 4);
    $('#results').text(contents);
    var evt = new Event('results-displayed');
    evt.results = contents;
    document.dispatchEvent(evt);
*/


//My adapted display function
function displayJSON(data) {

    var type = $('#fileform [name=type]').val();
    switch (type) {
        case "LANDMARK_DETECTION":
            let landmark = data.responses[0].landmarkAnnotations;
            let count = 0;
            let result = "";
            let resultHTML = "";
            for (let key in landmark) {
                console.log(landmark[key].description);
                result += landmark[key].description;
                resultHTML += "<br>" + landmark[key].description;

                count++;

                //let value = landmark[key];
                //for (let i = 0; i <= value.length; i++) {
                //    console.log(value);
                //}
            }
            if (count == 0) {
                $('#formattedResultsText').text("There are no results :(");
            } else {
                $('#formattedResultsText').text(result);
                document.querySelector("p").querySelector("formattedResults").innerHTML = resultHTML;


                $('#formattedResultHeading').text("Results:");
            }
            break;
    }

    //$('#formattedResults').text("This is the " + data.responses[0].landmarkAnnotations[0].description + " which is located in " + data.responses[0].landmarkAnnotations[1].description);
    //var contents = JSON.stringify(data, null, 4);
    //$('#results').text(contents);
}

var myJSON =
{
    "responses": [
        {
            "landmarkAnnotations": [
                {
                    "mid": "/m/02j81",
                    "description": "Eiffel Tower",
                    "score": 0.6345246,
                    "boundingPoly": {
                        "vertices": [
                            {
                                "x": 205,
                                "y": 150
                            },
                            {
                                "x": 265,
                                "y": 150
                            },
                            {
                                "x": 265,
                                "y": 231
                            },
                            {
                                "x": 205,
                                "y": 231
                            }
                        ]
                    },
                    "locations": [
                        {
                            "latLng": {
                                "latitude": 48.858461,
                                "longitude": 2.294351
                            }
                        }
                    ]
                },
                {
                    "mid": "/g/120xtw6z",
                    "description": "Trocadéro Gardens",
                    "score": 0.47110596,
                    "boundingPoly": {
                        "vertices": [
                            {
                                "x": 197,
                                "y": 155
                            },
                            {
                                "x": 300,
                                "y": 155
                            },
                            {
                                "x": 300,
                                "y": 230
                            },
                            {
                                "x": 197,
                                "y": 230
                            }
                        ]
                    },
                    "locations": [
                        {
                            "latLng": {
                                "latitude": 48.861596299999995,
                                "longitude": 2.2892823
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

function testJSON() {

    var type = "LANDMARK_DETECTION";

    switch (type) {
        case "LANDMARK_DETECTION":
            let landmark = myJSON.responses[0].landmarkAnnotations;
            for (let key in landmark) {
                console.log(landmark[key].description);
                let value = landmark[key];
                for (let i = 0; i <= value.length; i++) {
                    console.log(value);
                }
            }
            break;
    }

}


