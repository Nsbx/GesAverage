// ==UserScript==
// @name         GESAverage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add average in myges
// @author       Nicolas Bondoux
// @match        https://www.myges.fr/student/marks
// @grant        none
// ==/UserScript==

$( document ).ready(function() {
    gesTableBody = $('table[role="grid"]').find('tbody')[0];
    gesTableData = $(gesTableBody).find('tr');
    gesNotes = [];
    for(let i = 0; i < gesTableData.length; i++){
        if(gesTableData[i].cells[4].innerText != ""){
            gesNotes.push({
                coef: parseInt(gesTableData[i].cells[2].innerText),
                note: parseInt(gesTableData[i].cells[4].innerText)
            });
        }
        if(gesTableData[i].cells[5].innerText != ""){
            gesNotes.push({
                coef: parseInt(gesTableData[i].cells[3].innerText),
                note: parseInt(gesTableData[i].cells[5].innerText)
            });
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
            $('<td colspan="2" style="text-align: center; font-weight: bold">').append(
                $('<span>').text(gesAverage.toFixed(2))
            )
        )
    )
    ;
    console.log("GESAverage.js initialized");
});

console.log("GESAverage.js loaded");