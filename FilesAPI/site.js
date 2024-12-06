window.onload = function () {
    const reader = new FileReader();

    $("#drag_div").on("dragenter", function (event) {
        document.getElementById("drag_div").style.border = `3px dashed #CCCCCC`;
    });

    $("#drag_div").on("dragleave", function (event) {
        document.getElementById("drag_div").style.border = `3px dashed #777777`;
    });

    $("#drag_div").on("dragover", function (event) {
        event.preventDefault();
        document.getElementById("drag_div").style.border = `3px dashed #CCCCCC`;
    });

    $("#drag_div").on("drop", function (event) {
        event.preventDefault();

        if (event.originalEvent.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...event.originalEvent.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file.name.endsWith(".txt")) {
                        console.log(`… file[${i}].name = ${file.name}`);
                    }
                    else {
                        console.log(`Not a Text File`);
                    }
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...event.originalEvent.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
            });
        }
    });
}