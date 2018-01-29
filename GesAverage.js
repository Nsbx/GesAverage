// ==UserScript==
// @name         GESAverage
// @namespace    https://github.com/Nsbx/GesAverage
// @updateURL    https://raw.githubusercontent.com/Nsbx/GesAverage/master/GesAverage.js
// @downloadURL  https://raw.githubusercontent.com/Nsbx/GesAverage/master/GesAverage.js
// @version      0.2
// @description  Add average in myges
// @author       Nicolas Bondoux
// @match        https://www.myges.fr/student/marks
// @grant        none
// ==/UserScript==

$( document ).ready(function() {
    gesTableBody = $('table[role="grid"]').find('tbody')[0];
    gesTableData = $(gesTableBody).find('tr');
    gesNotes = [];
    nbrColumn = parseInt(gesTableData[0].childElementCount);
    for(let i = 0; i < gesTableData.length; i++){
        for(let j = 4; j < nbrColumn; j++)
        {
            if(gesTableData[i].cells[j].innerText != ""){
                gesNotes.push({
                coef: parseFloat(gesTableData[i].cells[2].innerText),
                note: parseFloat(gesTableData[i].cells[j].innerText)
                });
            }
        }
    }
    gesNotesSum = 0;
    gesCoefSum = 0;
    for(let i = 0; i < gesNotes.length; i++){
        gesNotesSum += gesNotes[i].note * gesNotes[i].coef;
        gesCoefSum += gesNotes[i].coef;
    }
    gesAverage = gesNotesSum / gesCoefSum;
    $(gesTableBody)
        .append(
        $('<tr>').append(
            $('<td colspan="4" style="font-weight: bold; font-size: 11px; color: #217BB1">').append(
                $('<span>').text("Moyenne Générale")
            ),
            $('<td colspan="'+ (nbrColumn - 4) +'" style="text-align: center; font-weight: bold">').append(
                $('<span>').text(gesAverage.toFixed(2))
            )
        )
    )
    ;
    console.log("GESAverage.js initialized");
});

console.log("GESAverage.js loaded");
