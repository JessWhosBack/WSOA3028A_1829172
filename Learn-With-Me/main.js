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
    resetResults();
    // Grab the file and asynchronously convert to base64.
    var file = $('#fileform [name=fileField]')[0].files[0];
    var reader = new FileReader();
    reader.onloadend = processFile;
    reader.readAsDataURL(file);
    document.getElementById("imageTitle").innerHTML = "<h2>Your image:</h2>";
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
    let count = 0;
    let resultHTML = "";

    switch (type) {
        //LANDMARK CODE ------------------------------------------------------------
        case "LANDMARK_DETECTION":
            let landmark = data.responses[0].landmarkAnnotations;
            count = 0;
            resultHTML = "";
            for (let key in landmark) {
                resultHTML += landmark[key].description + " (certainty of " + (landmark[key].score * 100).toFixed(2) + "%)<br>";
                count++;
            }
            break;

        //FACE CODE ------------------------------------------------------------
        case "FACE_DETECTION":
            let face = data.responses[0].faceAnnotations;
            for (let key in face) {
                resultHTML += "Possibility of joy: " + determineLikliness(face[key].joyLikelihood) + "<br>";
                resultHTML += "Possibility of sorrow: " + determineLikliness(face[key].sorrowLikelihood) + "<br>";
                resultHTML += "Possibility of anger: " + determineLikliness(face[key].angerLikelihood) + "<br>";
                resultHTML += "Possibility of surprise: " + determineLikliness(face[key].surpriseLikelihood) + "<br>";
                resultHTML += "Possibility of headwear: " + determineLikliness(face[key].headwearLikelihood) + "<br>";
                count++;
            }
            break;

        //LOGO CODE ------------------------------------------------------------
        case "LOGO_DETECTION":
            let logo = data.responses[0].logoAnnotations;
            for (let key in logo) {
                resultHTML += logo[key].description + " (" + (logo[key].score * 100).toFixed(2) + "% certainty)<br>";
                count++;
            }
            break;
        //LABEL CODE ------------------------------------------------------------
        case "LABEL_DETECTION":
            let label = data.responses[0].labelAnnotations;
            for (let key in label) {
                resultHTML += label[key].description + " (" + (label[key].score * 100).toFixed(2) + "% certainty)<br>";
                count++;
            }
            break;
        //TEXT CODE ------------------------------------------------------------
        case "TEXT_DETECTION":
            let text = data.responses[0].textAnnotations;
            for (let key in text) {
                resultHTML += "Detected text: " + text[key].description + "<br>";
                count++;
            }
            let textLang = data.responses[0].fullTextAnnotation.pages[0].property.detectedLanguages;
            for (let key in textLang) {
                resultHTML += "Detected language code: " + textLang[key].languageCode + " (" + (textLang[key].confidence * 100).toFixed(2) + "% certainty)<br>";
            }
            break;
        //SAFE SEARCH CODE ------------------------------------------------------------
        case "SAFE_SEARCH_DETECTION":
            let safe = data.responses[0].safeSearchAnnotation;
            resultHTML += "Possibility of adult content: " + determineLikliness(safe.adult) + "<br>";
            resultHTML += "Possibility of spoof content: " + determineLikliness(safe.spoof) + "<br>";
            resultHTML += "Possibility of medical content: " + determineLikliness(safe.medical) + "<br>";
            resultHTML += "Possibility of violent content: " + determineLikliness(safe.violence) + "<br>";
            resultHTML += "Possibility of racy content: " + determineLikliness(safe.racy) + "<br>";
            count++;
            break;
        case "IMAGE_PROPERTIES":
            resultHTML += "See the original JSON results below"
            count = 1;
            break;
    }
    if (count == 0) {
        document.getElementsByClassName("formattedResults")[0].innerHTML = "There are no results :(";
        $('#results').text("");
    } else {
        $('#formattedResultHeading').text("Possible Results:");
        document.getElementsByClassName("formattedResults")[0].innerHTML = resultHTML;
        $('#results').text("");
    }

    $('#resultsHeading_JSON').text("The original JSON result:");
    var contents = JSON.stringify(data, null, 4);
    $('#results_JSON').text(contents);
}


function resetResults() {
    document.getElementsByClassName("formattedResults")[0].innerHTML = "";
    $('#results').text("");
    $('#results_JSON').text("");
    $('#formattedResultHeading').text("");
    $('#resultsHeading_JSON').text("");
}

function determineLikliness(v) {
    var like = "";
    switch (v) {
        case "LIKELIHOOD_UNSPECIFIED":
            like = "unspecified";
            break;
        case "VERY_UNLIKELY":
            like = "very unlikely";
            break;
        case "UNLIKELY":
            like = "unlikely";
            break;
        case "POSSIBLE":
            like = "possible";
            break;
        case "LIKELY":
            like = "likely";
            break;
        case "VERY_LIKELY":
            like = "very likely";
            break;
    }
    return like;
}