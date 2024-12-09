window.onload = function () {
    const reader = new FileReader();

    $(document).on('dragover drop', function (event) {
        event.preventDefault();
    });

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

                [...event.originalEvent.dataTransfer.items].forEach((item, i) => {


                if (item.kind === "file") {

                    const file = item.getAsFile();


                    if (file.name.endsWith(".txt")) {

                        console.log(`… file[${i}].name = ${file.name}`);


                        file.text().then(data => {

                            data = data.toLowerCase();


                            let result = [...data.matchAll(/[a-z]/g)].reduce((acc, char) => {
                                acc[char[0]] = (acc[char[0]] || 0) + 1;
                                return acc;
                            }, {});


                            let resultSorted = Object.entries(result).sort((a, b) => b[1] - a[1]);

                            $("#result_div").prepend(`<h5>Character Count<br />( ${file.name} )</h5>`);

                            for (const [char, count] of resultSorted) {
                                console.log(`${char}: ${count}`);
                                $("#resultlist").append(`<li>${char} : ${count}</li>`);
                            }

                        });


                    }
                    else {

                        console.log(`Not a Text File`);

                        alert("You can only upload *.txt files");
                    }


                }


            });
        }
        else {

            [...event.originalEvent.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);

                if (file[i].name.endsWith(".txt")) {
                    file.text().then(data => {

                        data = data.toLowerCase();

                        let result = [...data.matchAll(/[a-z]/g)].reduce((acc, char) => {
                            acc[char[0]] = (acc[char[0]] || 0) + 1;
                            return acc;
                        }, {});

                        let resultSorted = Object.fromEntries(Object.entries(result).sort((a, b) => b[1] - a[1]));

                        $("#result_div").prepend(`<h5>Character Count<br />( ${file.name} )</h5>`);

                        for (const [char, count] of resultSorted) {
                            console.log(`${char}: ${count}`);
                            $("#resultlist").append(`<li>${char} : ${count}</li>`);
                        }

                    });
                }
                else {
                    alert("You can only upload *.txt files");
                }

            });
        }
    });
}