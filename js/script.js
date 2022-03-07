$(init);
//current day display
function init() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
// interval to change color after hour as passed
    colorTimeBlocks();
    setInterval(colorTimeBlocks, 10000);

    $(".time-block").each(function () {
        var blockId = $(this).attr("id");
// saved data from local storage
        $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
    });
    $(".saveBtn").on("click", handleSave);
}

function colorTimeBlocks() {

    $(".time-block").each(function () {
        var blockHour = parseInt($(this).attr("id").replace("hour-", ""));
        var currentHour = parseInt(moment().format("H"));
        
        $(this).removeClass("past present future");
        //color changed based on past, present and future. 
        if (blockHour < currentHour) {
            $(this).addClass("past");
        } else if (blockHour > currentHour) {
            $(this).addClass("future");
        } else {
            $(this).addClass("present");
        }
    });
}
//gets id of parent and saves data in text area in local storage. 
function handleSave() {
    var hourId = $(this).parent().attr("id");
    localStorage.setItem(moment().format("DDDYYYY") + hourId, $("#" + hourId + " textarea").val());
}